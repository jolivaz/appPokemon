import React, { useState, useEffect } from "react"
import NuevoPokemon from './nuevoPokemon/nuevoPokemon'
import "./pokemon.scss"

function Pokemon() {
  const [listDetailPokemon, setListDetailPokemon] = useState([]);
  const [showCrearPokemonCreate, setShowCrearPokemonCreate] = useState(false)

  useEffect(() => {
    getPokemonList()
  }, [])

  const getPokemonList= (e) => {
    if (e) {
      e.preventDefault()
    }
    fetch("https://api.dev.perfivo.com/pokeapi/v0/pokemon/")
    .then(response => response.json())
    .then(data => {
      data.map(element => getPokemonDetail(element.number, element.id))
    })
    .catch(error => console.error(error))
  }

  const getPokemonDetail = (number,idPoke) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then(response => response.json())
      .then(data => {
        let types = data.types.map(({type}) => type.name).join(', ')
        const newPokemon = {
          name: data.name,
          types,
          number: data.id,
          picture: data.sprites.front_default,
          id:idPoke
        }
        setListDetailPokemon((prevList) => [...prevList, newPokemon])
      })
      .catch(error => console.error(error))
  }

  const handleShowCreate = (e) => {
    e.preventDefault()
    setShowCrearPokemonCreate(!showCrearPokemonCreate)
  }

  const handleDeletePokemon = (e,id) => {
    e.preventDefault()
  fetch(`https://api.dev.perfivo.com/pokeapi/v0/pokemon/${id}/`, {
      method: 'delete'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Pokemon Eliminado')
  })
  .catch(error => console.error(error))
}

  return (
    <div className="seccion-pokemon">
      <div className="seccion-pokemon__crear-pokemn">
        <i className="fas fa-plus-circle" 
          onClick={(e) =>handleShowCreate(e)} ></i>
      </div>
      {
        showCrearPokemonCreate ?
        <NuevoPokemon />
        : null
      }
      <div className="seccion-pokemon__lista-pokemon">
        {
          !!listDetailPokemon.length ? (
          listDetailPokemon.map(element => (
            <div className="seccion-pokemon__lista-pokemon-detail" 
              key={element.name}>
              <img src={element.picture} alt={element.name} />
              <div className="seccion-pokemon__lista-pokemon-detail-text">
                  <h4 className="seccion-pokemon__lista-pokemon-detail_name">
                    {element.name}
                  </h4>
                  <div className="seccion-pokemon__lista-pokemon-detail_list">
                    <span>Types:</span>
                    <p>{element.types}</p>
                  </div>
                  <div className="seccion-pokemon__lista-pokemon-detail_list">
                    <span>Number:</span>
                    <p>{element.number}</p>
                  </div>
              </div>
              <div className="seccion-pokemon__lista-pokemon-detail-delete">
                <i className="fas fa-trash-alt" 
                  onClick={e=> handleDeletePokemon(e,element.id)}></i>
              </div>
            </div>
          ))
        ) : (
          <p>No hay pokemon</p>
        )}
      </div>
    </div>
  );
}

export default Pokemon;
