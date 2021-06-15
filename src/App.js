import React from 'react'
import { GalleryProvider } from './context'
import Form from './components/Form'

function App() {
  return (
    <GalleryProvider>
      <Form />
    </GalleryProvider>
  )
}

export default App
