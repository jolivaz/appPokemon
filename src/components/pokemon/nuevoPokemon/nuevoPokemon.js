import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './nuevoPokemon.scss'

const NuevoPokemon = () => {
  const [listEntrenadores, setListEntrenadores] = useState([])
  const [listPokemons, setListPokemons] = useState([])
  const [pokemon, setPokemon] = useState('')
  const [entrenador, setEntrenador] = useState('')

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(data => {
        let id = -1
        data.results.forEach(currentItem => {
            const newItem = {
              id: id++,
              name: currentItem.name
            }
            setListPokemons((prevList) => [...prevList, newItem])
        })
      })
      .catch(error => console.error(error))

    fetch("https://api.dev.perfivo.com/pokeapi/v0/trainers/")
      .then(response => response.json())
      .then(data => {
        setListEntrenadores(data)
      })
      .catch(error => console.error(error)) 
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPokemon = {
        number: pokemon,
        trainer: entrenador
    }
    fetch("https://api.dev.perfivo.com/pokeapi/v0/pokemon/", {
        method: 'post',
        body: JSON.stringify(newPokemon),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('POKEMON CREADO')
      })
      .catch(error => console.error('error', error))
  }
  const handleChangePokemon = (e) => {
    setPokemon(e.target.value)
  }
  const handleEntrenador = (e) => {
    setEntrenador(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
        <div>
          <label>Pokemon:</label>
          <Select className="list-select" 
            value={pokemon} 
            onChange={handleChangePokemon}>
            {
              listPokemons.map(element => (
                <MenuItem key={element.name} 
                  value={element.id}>
                    {element.name}
                </MenuItem>
              ))
            }
          </Select>
        </div>
        <div>
          <label>Entrenador:</label>
          <Select className="list-select" 
            value={entrenador} 
            onChange={handleEntrenador}>
            {
              listEntrenadores.map(element => (
                <MenuItem key={element.name} 
                  value={element.id}> {element.name}
                </MenuItem>
              ))
            }
          </Select>
        </div>
        <input 
          className="btn-enviar" 
          type="submit" 
          value="Crear Pokemon" 
          disabled={pokemon.length === 0}/>
          <p className="note">Necesita seleccionar un pokemon</p>
    </form>
  );
}

export default NuevoPokemon;
