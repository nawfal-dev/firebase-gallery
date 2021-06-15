import React, { useState, useEffect, createContext } from 'react'
import { db, storage, timestamp } from './firebase/config'

const GalleryContext = createContext()

const GalleryProvider = ({ children }) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)

  const uploadFile = (_file) => {
    setFile(_file)
  }

  useEffect(() => {
    if (file) {
      const stgRef = storage.ref(file.name)

      stgRef.put(file).on(
        'state_changed',
        (snap) => {
          // uploading
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(percentage)
        },
        (err) => {
          setError(err)
        },
        () => {
          stgRef.getDownloadURL().then((url) => {
            setUrl(url)
            setFile(null)
          })
        }
      )
    }
  }, [file])

  const values = {}
  return <GalleryContext.Provider value={values} children={children} />
}

export { GalleryContext, GalleryProvider }
