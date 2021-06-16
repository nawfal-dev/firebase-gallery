import React from 'react'
import { GalleryProvider } from './context'
import Form from './components/Form'
import Header from './components/Header'
import './style.css'

function App() {
  return (
    <GalleryProvider>
      <Header />
      <Form />
    </GalleryProvider>
  )
}

export default App
