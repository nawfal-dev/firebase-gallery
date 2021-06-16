import React, { useState, useEffect, createContext } from 'react'
import { db, storage, timestamp } from './firebase/config'

const GalleryContext = createContext()

const GalleryProvider = ({ children }) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [data, setData] = useState([])

  const uploadFile = (_file) => {
    setFile(_file)
  }

  const getGallery = () => {
    db.collection('gallery')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const _data = snapshot.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() }
        })
        setData(_data)
      })
  }

  const deletePicture = (docId) => {
    db.collection('gallery').doc(docId).delete()
  }

  useEffect(() => {
    getGallery()
  }, [])

  useEffect(() => {
    if (file) {
      const stgRef = storage.ref(file.name)
      const collectionRef = db.collection('gallery')

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
            collectionRef.add({
              createdAt: timestamp(),
              url,
            })
            setProgress(0)
            setFile(null)
          })
        }
      )
    }
  }, [file])

  const values = {
    progress,
    url,
    error,
    uploadFile,
    data,
    deletePicture,
  }
  return <GalleryContext.Provider value={values} children={children} />
}

export { GalleryContext, GalleryProvider }
