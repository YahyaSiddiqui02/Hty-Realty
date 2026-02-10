from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext
import razorpay

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
JWT_SECRET = os.environ.get('JWT_SECRET', 'hty-realty-secret-key-change-in-production')
JWT_ALGORITHM = "HS256"

# Razorpay
razorpay_key_id = os.environ.get('RAZORPAY_KEY_ID', '')
razorpay_key_secret = os.environ.get('RAZORPAY_KEY_SECRET', '')
razorpay_client = razorpay.Client(auth=(razorpay_key_id, razorpay_key_secret)) if razorpay_key_id else None

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class UserBase(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str = "customer"  # customer or admin

class User(UserBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: str = "customer"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    favorites: List[str] = Field(default_factory=list)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    tagline: str
    description: str
    location: str
    status: str  # upcoming, ongoing, completed
    images: List[str] = Field(default_factory=list)
    hero_image: str
    amenities: List[str] = Field(default_factory=list)
    floor_plans: List[Dict[str, str]] = Field(default_factory=list)
    coordinates: Optional[Dict[str, float]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectCreate(BaseModel):
    title: str
    slug: str
    tagline: str
    description: str
    location: str
    status: str
    images: List[str] = Field(default_factory=list)
    hero_image: str
    amenities: List[str] = Field(default_factory=list)
    floor_plans: List[Dict[str, str]] = Field(default_factory=list)
    coordinates: Optional[Dict[str, float]] = None

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    category: str  # news, blog, media, events
    image: str
    author: str = "HTY REALTY"
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    image: str
    published: bool = True

class ContactInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: EmailStr
    message: str
    inquiry_type: str  # callback or question
    preferred_time: Optional[str] = None
    status: str = "new"  # new, contacted, closed
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactInquiryCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    message: str
    inquiry_type: str
    preferred_time: Optional[str] = None

class Resource(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    file_url: str
    category: str  # brochure, ebook, faq, legal, research
    requires_auth: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ResourceCreate(BaseModel):
    title: str
    description: str
    file_url: str
    category: str
    requires_auth: bool = False

class PaymentOrder(BaseModel):
    amount: int  # in paise
    currency: str = "INR"
    receipt: Optional[str] = None
    notes: Optional[Dict[str, str]] = None

class PaymentVerification(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class Transaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    order_id: str
    payment_id: Optional[str] = None
    amount: int
    currency: str = "INR"
    status: str  # created, paid, failed
    notes: Optional[Dict[str, str]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_admin_user(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# Auth endpoints
@api_router.post("/auth/register", response_model=Token)
async def register(user_input: UserCreate):
    existing = await db.users.find_one({"email": user_input.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user_input.model_dump(exclude={"password"})
    user_obj = User(**user_dict)
    doc = user_obj.model_dump()
    doc["password"] = hash_password(user_input.password)
    doc["created_at"] = doc["created_at"].isoformat()
    
    await db.users.insert_one(doc)
    
    access_token = create_access_token(data={"sub": user_obj.id})
    user_response = {k: v for k, v in doc.items() if k != "password"}
    return {"access_token": access_token, "token_type": "bearer", "user": user_response}

@api_router.post("/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user["id"]})
    user_response = {k: v for k, v in user.items() if k != "password"}
    return {"access_token": access_token, "token_type": "bearer", "user": user_response}

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {k: v for k, v in current_user.items() if k != "password"}

# Projects endpoints
@api_router.post("/projects", response_model=Project)
async def create_project(project_input: ProjectCreate, current_user: dict = Depends(get_admin_user)):
    project_obj = Project(**project_input.model_dump())
    doc = project_obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["updated_at"] = doc["updated_at"].isoformat()
    
    await db.projects.insert_one(doc)
    return project_obj

@api_router.get("/projects", response_model=List[Project])
async def get_projects(status: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    projects = await db.projects.find(query, {"_id": 0}).to_list(1000)
    for project in projects:
        if isinstance(project.get("created_at"), str):
            project["created_at"] = datetime.fromisoformat(project["created_at"])
        if isinstance(project.get("updated_at"), str):
            project["updated_at"] = datetime.fromisoformat(project["updated_at"])
    return projects

@api_router.get("/projects/{slug}", response_model=Project)
async def get_project(slug: str):
    project = await db.projects.find_one({"slug": slug}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if isinstance(project.get("created_at"), str):
        project["created_at"] = datetime.fromisoformat(project["created_at"])
    if isinstance(project.get("updated_at"), str):
        project["updated_at"] = datetime.fromisoformat(project["updated_at"])
    return project

@api_router.put("/projects/{project_id}")
async def update_project(project_id: str, project_input: ProjectCreate, current_user: dict = Depends(get_admin_user)):
    doc = project_input.model_dump()
    doc["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.projects.update_one({"id": project_id}, {"$set": doc})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project updated"}

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str, current_user: dict = Depends(get_admin_user)):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}

# Blog endpoints
@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(post_input: BlogPostCreate, current_user: dict = Depends(get_admin_user)):
    post_obj = BlogPost(**post_input.model_dump())
    doc = post_obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["updated_at"] = doc["updated_at"].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return post_obj

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(category: Optional[str] = None, limit: int = 100):
    query = {"published": True}
    if category:
        query["category"] = category
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    for post in posts:
        if isinstance(post.get("created_at"), str):
            post["created_at"] = datetime.fromisoformat(post["created_at"])
        if isinstance(post.get("updated_at"), str):
            post["updated_at"] = datetime.fromisoformat(post["updated_at"])
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if isinstance(post.get("created_at"), str):
        post["created_at"] = datetime.fromisoformat(post["created_at"])
    if isinstance(post.get("updated_at"), str):
        post["updated_at"] = datetime.fromisoformat(post["updated_at"])
    return post

# Contact endpoints
@api_router.post("/contact")
async def create_contact_inquiry(inquiry_input: ContactInquiryCreate):
    inquiry_obj = ContactInquiry(**inquiry_input.model_dump())
    doc = inquiry_obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    
    await db.inquiries.insert_one(doc)
    return {"message": "Inquiry submitted successfully", "id": inquiry_obj.id}

@api_router.get("/contact")
async def get_inquiries(current_user: dict = Depends(get_admin_user), status: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    inquiries = await db.inquiries.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for inquiry in inquiries:
        if isinstance(inquiry.get("created_at"), str):
            inquiry["created_at"] = datetime.fromisoformat(inquiry["created_at"])
    return inquiries

@api_router.put("/contact/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: str, status: str, current_user: dict = Depends(get_admin_user)):
    result = await db.inquiries.update_one({"id": inquiry_id}, {"$set": {"status": status}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"message": "Status updated"}

# Resources endpoints
@api_router.post("/resources", response_model=Resource)
async def create_resource(resource_input: ResourceCreate, current_user: dict = Depends(get_admin_user)):
    resource_obj = Resource(**resource_input.model_dump())
    doc = resource_obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    
    await db.resources.insert_one(doc)
    return resource_obj

@api_router.get("/resources", response_model=List[Resource])
async def get_resources(category: Optional[str] = None, current_user: Optional[dict] = None):
    query = {}
    if category:
        query["category"] = category
    if not current_user:
        query["requires_auth"] = False
    
    resources = await db.resources.find(query, {"_id": 0}).to_list(1000)
    for resource in resources:
        if isinstance(resource.get("created_at"), str):
            resource["created_at"] = datetime.fromisoformat(resource["created_at"])
    return resources

# Payment endpoints
@api_router.post("/payments/create-order")
async def create_payment_order(order_input: PaymentOrder):
    if not razorpay_client:
        raise HTTPException(status_code=503, detail="Payment gateway not configured")
    
    try:
        razor_order = razorpay_client.order.create({
            "amount": order_input.amount,
            "currency": order_input.currency,
            "receipt": order_input.receipt or str(uuid.uuid4()),
            "notes": order_input.notes or {}
        })
        
        transaction = Transaction(
            order_id=razor_order["id"],
            amount=order_input.amount,
            currency=order_input.currency,
            status="created",
            notes=order_input.notes
        )
        doc = transaction.model_dump()
        doc["created_at"] = doc["created_at"].isoformat()
        await db.transactions.insert_one(doc)
        
        return razor_order
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/payments/verify")
async def verify_payment(verification: PaymentVerification):
    if not razorpay_client:
        raise HTTPException(status_code=503, detail="Payment gateway not configured")
    
    try:
        razorpay_client.utility.verify_payment_signature(verification.model_dump())
        
        await db.transactions.update_one(
            {"order_id": verification.razorpay_order_id},
            {"$set": {"payment_id": verification.razorpay_payment_id, "status": "paid"}}
        )
        
        return {"message": "Payment verified successfully"}
    except Exception as e:
        await db.transactions.update_one(
            {"order_id": verification.razorpay_order_id},
            {"$set": {"status": "failed"}}
        )
        raise HTTPException(status_code=400, detail="Payment verification failed")

# User favorites
@api_router.post("/users/favorites/{project_id}")
async def add_favorite(project_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.users.update_one(
        {"id": current_user["id"]},
        {"$addToSet": {"favorites": project_id}}
    )
    return {"message": "Added to favorites"}

@api_router.delete("/users/favorites/{project_id}")
async def remove_favorite(project_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.users.update_one(
        {"id": current_user["id"]},
        {"$pull": {"favorites": project_id}}
    )
    return {"message": "Removed from favorites"}

@api_router.get("/users/favorites")
async def get_favorites(current_user: dict = Depends(get_current_user)):
    favorites = current_user.get("favorites", [])
    if not favorites:
        return []
    projects = await db.projects.find({"id": {"$in": favorites}}, {"_id": 0}).to_list(1000)
    for project in projects:
        if isinstance(project.get("created_at"), str):
            project["created_at"] = datetime.fromisoformat(project["created_at"])
        if isinstance(project.get("updated_at"), str):
            project["updated_at"] = datetime.fromisoformat(project["updated_at"])
    return projects

# Admin analytics
@api_router.get("/admin/analytics")
async def get_analytics(current_user: dict = Depends(get_admin_user)):
    total_projects = await db.projects.count_documents({})
    total_inquiries = await db.inquiries.count_documents({})
    new_inquiries = await db.inquiries.count_documents({"status": "new"})
    total_users = await db.users.count_documents({"role": "customer"})
    total_transactions = await db.transactions.count_documents({})
    successful_payments = await db.transactions.count_documents({"status": "paid"})
    
    return {
        "projects": total_projects,
        "inquiries": total_inquiries,
        "new_inquiries": new_inquiries,
        "users": total_users,
        "transactions": total_transactions,
        "successful_payments": successful_payments
    }

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
