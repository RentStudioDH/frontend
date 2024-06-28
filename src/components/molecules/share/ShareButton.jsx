import React, { useState } from 'react';
import { Button, Modal, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ShareButton = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleShare = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const shareUrl = window.location.href; // URL del producto
  const title = product.name; // Nombre del producto
  const description = product.description; // Descripción del producto

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${description}\n${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#A62639",
          color: "white",
          '&:hover': {
            bgcolor: "#8C1D31", // Color de fondo al pasar el cursor sobre el botón
          },
        }}
        startIcon={<ShareIcon />}
        onClick={handleShare}
      >
        Compartir
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: "1rem"
          }}
        >
          <h2 id="modal-title" className="font-semibold text-white bg-red-800 p-2 rounded-md flex justify-center items-center">Compartir en redes sociales</h2>
          <List>
            <ListItem disablePadding >
              <ListItemButton onClick={handleFacebookShare}>
                <ListItemIcon>
                  <FacebookIcon sx={{ color: '#3b5998' }} />
                </ListItemIcon>
                <ListItemText primary="Compartir en Facebook" sx={{ color: 'black' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleTwitterShare}>
                <ListItemIcon>
                  <TwitterIcon sx={{ color: '#1DA1F2' }} />
                </ListItemIcon>
                <ListItemText primary="Compartir en Twitter" sx={{ color: 'black' }}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleWhatsAppShare}>
                <ListItemIcon>
                  <WhatsAppIcon sx={{ color: '#25D366' }} />
                </ListItemIcon>
                <ListItemText primary="Compartir en WhatsApp" sx={{ color: 'black' }}/>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default ShareButton;
