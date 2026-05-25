import React from 'react';

const WhatsAppButton = () => {
  // REPLACE THIS with your actual business WhatsApp number (with country code, no + or spaces)
  const phoneNumber = "91XXXXXXXXXX"; 
  const message = "Hello One5 Realty, I'm interested in exploring premium property opportunities. Could you please assist me?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
      />
      <span className="whatsapp-tooltip">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
