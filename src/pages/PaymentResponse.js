import React, { useEffect, useContext } from 'react'
import { PesapalContext } from '../context/PesapalContext'
import { CheckoutContext } from '../context/CheckoutContext';
import { Button } from '../components/ui/button';
import { NavLink } from 'react-router-dom';

export default function PaymentResponse() {

  const { order_tracking_id, getTransactionStatus, payment_method, amount, payment_status_description, description, message, currency, addToAiosell, } = useContext(PesapalContext);

  const { addCheckout } = useContext(CheckoutContext);

  // Retrieve from localStorage if not available in context
  const localOrderTrackingId = localStorage.getItem('order_tracking_id');
  const orderTrackingId = order_tracking_id || localOrderTrackingId;

  const localPaymentStatusDescription = localStorage.getItem('payment_status_description');
  const paymentStatusDescription = payment_status_description || localPaymentStatusDescription;

  useEffect(() => {
    if (orderTrackingId) {
      getTransactionStatus(orderTrackingId);
    }
  }, [orderTrackingId, getTransactionStatus]);

  useEffect(() => {
    if (paymentStatusDescription === 'Completed') {
      try {
        const orderData = JSON.parse(localStorage.getItem('orderData'));
        (async () => {
          try {
            await addToAiosell(orderData);
            await addCheckout(orderData);
            console.log("Payment confirmed and added to Aiosell successfully");
          } catch (error) {
            console.error("Error confirming payment:", error);
          }
        })();
      } finally {
        localStorage.removeItem('order_tracking_id');
        localStorage.removeItem('orderData');
        localStorage.removeItem('payment_status_description');
      }
    }
  }, [paymentStatusDescription, addToAiosell, addCheckout]);

  const isSuccess = paymentStatusDescription === 'Completed';

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50 font-outfit p-6'>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-3xl overflow-hidden">
        {/* Header Ribbon */}
        <div className={`h-3 w-full ${isSuccess ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-blue-gradient'}`}></div>

        <div className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-blue/10 text-blue'}`}>
              {isSuccess ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              )}
            </div>
            <h1 className='text-3xl font-sentientmedium tracking-tight text-gray-900'>
              {isSuccess ? 'Payment Successful' : 'Payment Status'}
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              {paymentStatusDescription || "Processing your transaction..."}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <span className="text-gray-500 text-sm">Amount Paid</span>
              <span className="font-semibold text-lg">{currency} {amount || "0.00"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Method</span>
              <span className="font-medium text-gray-900">{payment_method || "-"}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500 text-sm">Description</span>
              <span className="font-medium text-gray-900 text-right max-w-[150px] truncate">{description || "-"}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500 text-sm text-left">Message</span>
              <span className="font-medium text-gray-900 text-right text-xs max-w-[180px] leading-tight">{message || "-"}</span>
            </div>
          </div>

          <div className="mt-8">
            <NavLink to={isSuccess ? "/dashboard" : "/portfolio"}>
              <Button className="w-full rounded-full bg-blue-gradient py-6 font-semibold shadow-glow-blue hover:-translate-y-1 transition-transform">
                {isSuccess ? 'Go to Dashboard' : 'Return to Portfolio'}
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
