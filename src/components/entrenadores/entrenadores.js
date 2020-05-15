import React, {useState, useEffect} from 'react'
import NuevoEntrenador from './nuevoEntrenador/nuevoEntrenador'
import './entrenadores.scss'

function Entrenadores() {
    const [entrenadores, setEntrenadores] = useState([])
    const [showCrearEntrenador, setShowCrearEntrenador] = useState(false)
    const [showDeleteEntrenador, setShowDeleteEntrenador] = useState(false)
    useEffect(() => {
        getListEntrenadores()
      }, [])

      const getListEntrenadores = (e) => {
          if (e) {
              e.preventDefault()
          }
        fetch("https://api.dev.perfivo.com/pokeapi/v0/trainers/")
        .then(response => response.json())
        .then(data => {
          setEntrenadores(data)
        })
        .catch(error => console.error(error))
      }

      const handleShowCreate = (e) => {
        e.preventDefault()
        setShowCrearEntrenador(!showCrearEntrenador)
      }

      const handleDeleteEntrenador = (e,id) => {
          e.preventDefault()
        fetch(`https://api.dev.perfivo.com/pokeapi/v0/trainers/${id}/`, {
            method: 'delete'
        })
        .then(response => response.json())
        .then(data => {
            console.log('ELIMINADO')
            setShowDeleteEntrenador(true)
            setTimeout(() => {
                setShowDeleteEntrenador(false)
            }, 1500)
        })
        .catch(error => console.error(error))
      }


    return (
    <div className="seccion-entrenadores">
        <div className="seccion-entrenadores__crear-entrenador">
            <i className="fas fa-plus-circle"
                onClick={(e) =>handleShowCreate(e)} ></i>
        </div>
        {
            showCrearEntrenador ?
            <NuevoEntrenador setEntrenadores={setEntrenadores}/>
            : null
        }
        <div className="refresh">
            <i className="fas fa-sync-alt"
                onClick={e => getListEntrenadores(e)}>
            </i>
        </div>
        {
            showDeleteEntrenador ? 
            <p className="created">
                ¡Entrenador eliminado con Exito!
            </p>
            : null
        }
        {
            !!entrenadores.length ?
                entrenadores.map(element => (
                    <div key={element.name} className="item-entrenador">
                        <p key={element.name}>{element.name}</p>
                        <i className="fas fa-trash-alt" 
                            onClick={e => handleDeleteEntrenador(e,element.id)}></i>
                    </div>
                ))
            :
            <p>No hay entrenadores</p>
        }
    </div>
  );
}

export default Entrenadores;
