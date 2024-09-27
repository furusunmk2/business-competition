import React, { useEffect } from 'react';
import {Box, Typography} from '@mui/material';

function Simulation() {

  useEffect(() => {
    document.title = `シミュレーション`;
  });
  return (
    <Box sx={{ padding: '0 23rem' }} className='japanese-text'>
      <Typography variant='h4'>シミュレーション</Typography>
      <Typography variant='body1'>ここにシミュレーションのコンテンツを追加してください。</Typography>
    </Box>
  );
}

export default Simulation;
