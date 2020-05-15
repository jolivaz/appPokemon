import React from 'react'
import Entrenadores from '../entrenadores/entrenadores'
import Pokemon from '../pokemon/pokemon'
import Grid from '@material-ui/core/Grid'
import './home.scss'

function Home() {
  return (
    <Grid container justify="center">
        <Grid className="grids grid-pokemon" item xs={6}>
            <Pokemon />
        </Grid>
        <Grid className="grids grid-entrenadores" item xs={6}>
            <Entrenadores />
        </Grid>
    </Grid>
  );
}

export default Home;
