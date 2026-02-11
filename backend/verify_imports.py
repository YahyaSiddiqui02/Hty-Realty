
try:
    import fastapi
    import uvicorn
    import dotenv
    import motor
    import pydantic
    import email_validator
    import jwt
    import passlib
    import razorpay
    
    print("All imports successful!")
except ImportError as e:
    print(f"Import failed: {e}")
    exit(1)
