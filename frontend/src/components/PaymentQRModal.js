import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { X } from 'lucide-react';

const PaymentQRModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent data-testid="payment-qr-modal" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">Quick Pay</DialogTitle>
          <button
            onClick={onClose}
            data-testid="close-modal-button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-6">
          {/* QR Code Placeholder */}
          <div className="w-64 h-64 bg-stone-100 border-2 border-stone-200 flex items-center justify-center">
            <div className="text-center text-stone-500">
              <p className="text-sm font-manrope mb-2">UPI QR Code</p>
              <p className="text-xs">Scan to pay via any UPI app</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="text-center space-y-2">
            <p className="text-sm font-manrope text-stone-700">
              Accepted Payment Methods
            </p>
            <p className="text-xs text-stone-500">
              Google Pay • PhonePe • Paytm • Any UPI App
            </p>
          </div>

          {/* Payment Note Form */}
          <div className="w-full space-y-4 border-t border-stone-200 pt-6">
            <p className="text-xs text-stone-600 font-medium uppercase tracking-wider">
              Payment Details (Optional)
            </p>
            <input
              type="text"
              placeholder="Your Name"
              data-testid="payment-name-input"
              className="w-full px-4 py-2 border border-stone-200 focus:border-slate-900 focus:outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Transaction ID / Reference Number"
              data-testid="payment-ref-input"
              className="w-full px-4 py-2 border border-stone-200 focus:border-slate-900 focus:outline-none transition-colors"
            />
            <button
              data-testid="submit-payment-details-button"
              className="w-full bg-slate-900 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Submit Payment Details
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentQRModal;
