import React from 'react'
import FileUpload from './FileUpload';
import { Typography, Box } from '@mui/material';

export default function Homepage() {
  return (
    <Box       
        sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
    }}>
        <Typography variant="h5" sx={{ my: 5}}>Hi, This is a web that you can upload your slides and get some quizes by it :</Typography>
        <FileUpload sx={ {my: 5}}/>
    </Box>
  )
}
