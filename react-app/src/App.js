import React from 'react';
import './App.css';
import BeamUI from "./BeamUI";
import Home from './Home';
import { Container, Typography } from "@material-ui/core";


function App() {

  return (
    <>
      <Container maxWidth="xl">
        <Typography
          gutterBottom
          variant='h2'
          align='center'
        >
          Beam Calculator App
        </Typography>
        {/* <BeamUI /> */}
        <Home />
      </Container>

    </>
  )
}

export default App;