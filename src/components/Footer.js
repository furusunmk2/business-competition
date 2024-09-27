// footer.js
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" textAlign={'center'} className='japanese-text'>© 2024 ミギカタアガリ</Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'center'} className='japanese-text'>
          All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
