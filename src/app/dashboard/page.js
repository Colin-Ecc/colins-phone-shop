'use client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useState, useEffect } from 'react'






export default function Page() {


  //
  // function for putting items into the shopping cart.
  //
  function putInCart(pname){
    console.log(pname);
    
    console.log("putting in cart: " + pname)


    // fetch("api/putInCart?pname="+pname);
    fetch("api/putInCart", {
      method: "POST" , 
      body: JSON.stringify(pname),
    })


 
  }





  const [data, setData] = useState(null)
  const [weather, setWeatherData] = useState(0)
 
  useEffect(() => {
    fetch('api/getProducts')
    .then((res) => res.json())
    .then((data) => {
    setData(data)
    })
    fetch('api/getWeather')
    .then((res) => res.json())
    .then((weather) => {
    setWeatherData(weather)
    })
    


  }, [])
 

  if (!data) return <p>No data</p>



  
  const theme = createTheme({
    palette: {
     
      secondary: {
        main: green[500],
      },
    },
  });
  





  if (!weather) return <p>No weather</p>
  
  return (
    <ThemeProvider theme={theme}>
      Today's temperature: {JSON.stringify(weather.temp)}
    <Container component="main"  maxWidth="xs">
 
       <div style={{fontSize: '40px'}} > Dashboard</div>
        <div>
      {
        data.map((item, i) => (
          <div style={{padding: '20px'}} key={i} >
            Unique ID: {item._id}
            <br></br>
            {item.pname}
            - 
            {item.price}
            <br></br>
           <Button
  variant="outlined"
  onClick={() => {
    putInCart(item);
    alert(`${item.pname} added to cart!`);
  }}
>
  Add to cart
</Button>
          </div>
        ))
      }
    </div>

    </Container>

    </ThemeProvider>

  );
}