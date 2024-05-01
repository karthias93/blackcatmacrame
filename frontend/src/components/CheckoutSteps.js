import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-4">
      <div className="w-full max-w-screen-lg flex justify-between">
        <div className={`w-1/4 ${step1 ? 'text-blue-600' : 'text-gray-400'}`}>
          {step1 ? (
            <Link to="/login" className="block px-4 py-2">
              Sign In
            </Link>
          ) : (
            <span className="block px-4 py-2 cursor-not-allowed">Sign In</span>
          )}
        </div>

        <div className={`w-1/4 ${step2 ? 'text-blue-600' : 'text-gray-400'}`}>
          {step2 ? (
            <Link to="/shipping" className="block px-4 py-2">
              Shipping
            </Link>
          ) : (
            <span className="block px-4 py-2 cursor-not-allowed">Shipping</span>
          )}
        </div>

        <div className={`w-1/4 ${step3 ? 'text-blue-600' : 'text-gray-400'}`}>
          {step3 ? (
            <Link to="/payment" className="block px-4 py-2">
              Payment
            </Link>
          ) : (
            <span className="block px-4 py-2 cursor-not-allowed">Payment</span>
          )}
        </div>

        <div className={`w-1/4 ${step4 ? 'text-blue-600' : 'text-gray-400'}`}>
          {step4 ? (
            <Link to="/placeorder" className="block px-4 py-2">
              Place Order
            </Link>
          ) : (
            <span className="block px-4 py-2 cursor-not-allowed">Place Order</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CheckoutSteps;


