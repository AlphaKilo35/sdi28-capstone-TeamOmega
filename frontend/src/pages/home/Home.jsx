import { useState, useEffect } from 'react'
import './home.css'

function Home() {
  let userId = 1
  useEffect(() => {
    fetch(`localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(data => console.log(data))
  })

  return (
    <>

    </>
  )
}

export default Home;
