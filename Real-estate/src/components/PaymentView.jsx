import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const PaymentView = () => {
  const { isLoggedIn, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.plan || { name: 'Growth', price: '₹4,999/mo' };

  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      alert(`Payment of ${selectedPlan.price} for ${selectedPlan.name} Plan successful via ${paymentMethod}!`);
      navigate('/profile');
    }, 2000);
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI (PhonePe, GPay, Paytm)', icon: '📱' },
    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Digital Wallets', icon: '👛' },
  ];

  return (
    <div className="section-full reveal" style={{ background: 'var(--cream2)', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="section-inner" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="eyebrow" style={{ textAlign: 'center' }}>Secure Checkout</div>
          <h2 className="sec-title" style={{ textAlign: 'center' }}>Complete Your <span>Subscription</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '30px' }}>
          {/* Left: Payment Methods */}
          <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--cream3)' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 800 }}>Select Payment Mode</h3>
            
            <form onSubmit={handlePayment}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {paymentMethods.map((method) => (
                  <label key={method.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '20px', 
                    borderRadius: '16px', 
                    border: paymentMethod === method.id ? '2px solid var(--gold)' : '1px solid var(--cream3)',
                    background: paymentMethod === method.id ? 'rgba(197, 168, 124, 0.05)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method.id} 
                      onChange={() => setPaymentMethod(method.id)}
                      style={{ marginRight: '15px', accentColor: 'var(--gold)' }}
                      required
                    />
                    <span style={{ fontSize: '24px', marginRight: '15px' }}>{method.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: '16px' }}>{method.name}</span>
                  </label>
                ))}

                {/* Stripe Placeholder */}
                <div style={{ 
                  padding: '20px', 
                  borderRadius: '16px', 
                  border: '1px dashed var(--cream3)',
                  background: '#f9f9f9',
                  opacity: 0.6,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '24px', marginRight: '15px' }}>🌍</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>International Payments (Stripe)</div>
                    <div style={{ fontSize: '12px' }}>Integration coming soon...</div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="nav-btn-solid" 
                disabled={loading || !paymentMethod}
                style={{ width: '100%', padding: '18px', fontSize: '16px' }}
              >
                {loading ? 'PROCESSING...' : `PAY ${selectedPlan.price}`}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--ink)', color: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: 'var(--gold2)', marginBottom: '20px', fontSize: '18px' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span>{selectedPlan.name} Plan</span>
                <span style={{ fontWeight: 700 }}>{selectedPlan.price}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <span style={{ opacity: 0.7 }}>Platform Fee</span>
                <span style={{ fontWeight: 700 }}>₹0</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, marginTop: '10px' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--gold2)' }}>{selectedPlan.price}</span>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid var(--cream3)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px', color: 'var(--ink)' }}>Account Details</h4>
              <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>
                <div style={{ marginBottom: '4px' }}><strong>User:</strong> {currentUser?.name || 'Guest'}</div>
                <div><strong>Email:</strong> {currentUser?.email || 'N/A'}</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '0 10px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', lineHeight: '1.6' }}>
                By proceeding, you agree to One5's Terms of Service and Privacy Policy. All payments are secured with 256-bit encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
