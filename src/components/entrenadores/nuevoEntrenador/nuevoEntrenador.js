import React, { useState } from 'react'
import TextField from '@material-ui/core/Input';
import './nuevoEntrenador.scss'

function NuevoEntrenador({setEntrenadores}) {
    const [name, setName] = useState('')
    const [created, setCreated] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        const newEntrenador = {
            name
        }
        fetch("https://api.dev.perfivo.com/pokeapi/v0/trainers/", {
            method: 'post',
            body: JSON.stringify(newEntrenador),
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            setCreated(true)
            setEntrenadores((prevList) => [...prevList, name])
            setName('')
            setTimeout(() => {
                setCreated(false)
            }, 1500)
          })
          .catch(error => console.error('error', error))
    }
    const handleChange = (e) => {
        setName(e.target.value)
    }
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
            <label>Nombre:</label>
            <TextField value={name} onChange={handleChange} />
        </div>
        <div>

            <input className="btn-enviar" 
                disabled={name.length < 5}
                type="submit" 
                value="Submit" />
            <p className="note">Necesita un nombre mayor a 5 caracteres</p>
            {
                created ? 
                    <p className="created">
                        ¡Entrenador creado con Exito!
                    </p>
                : null
            }
        </div>
      </form>
    </div>
  );
}

export default NuevoEntrenador;
