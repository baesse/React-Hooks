import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [location, setLocation] = useState({});



  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/baesse/repos')
    const data = await response.json()
    setRepositories(data)
  }, [])

  useEffect(() => {
    const size = repositories.filter(e => e.favorite).length
    document.title = `Você tem ${size} favoritos`
  }, [repositories])


  useEffect(() => {
    navigator.geolocation.watchPosition(handlePosition)
  }, [])

  const handleFavorite = id => {
    const newRepositores = repositories.map(e => {
      return e.id === id ? { ...e, favorite: !e.favorite } : e
    })
    setRepositories(newRepositores)
  }

  const handlePosition = ({ coords }) => {
    const { latitude, longitude } = coords
    setLocation({ latitude, longitude })
  }

  return (
    <>
      <ul>
        {repositories.map(e => <li key={e.id} >{e.name} {e.favorite ? <span>'favorito'</span> : <span>'não favorito'</span>}
          <button onClick={() => handleFavorite(e.id)} > Adicionar </button>
        </li>)}
      </ul>
      <>
        Latitude: {location.latitude}<br />
        Longitude: {location.longitude}
      </>

    </>
  )
}
