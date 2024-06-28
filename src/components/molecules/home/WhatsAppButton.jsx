import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = ({ phoneNumber }) => {
  const handleClick = () => {
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div onClick={handleClick} className="fixed bottom-4 right-4 z-50 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md cursor-pointer transition duration-300 hover:bg-green-600">
      <WhatsAppIcon fontSize="large" />
    </div>
  );
};

export default WhatsAppButton;
