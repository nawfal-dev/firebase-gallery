import React, { useContext, useState } from 'react'
import { GalleryContext } from '../context'
import { motion } from 'framer-motion'

const Form = () => {
  const { uploadFile, error, data, progress, deletePicture } =
    useContext(GalleryContext)
  const [file, setFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')

  document.body.style.backgroundSize = 'cover'
  document.body.style.backgroundPosition = 'center'
  document.body.style.backgroundRepeat = 'no-repeat'
  document.body.style.background = `url('${selectedImage}')`

  const changeHandle = (e) => {
    const _selectedFile = e.target.files[0]
    console.log(_selectedFile)
    if (_selectedFile) {
      setFile(_selectedFile)
      uploadFile(_selectedFile)
    } else {
      setFile(null)
    }
  }

  return (
    <>
      <p>{error && error}</p>
      <form className='mb-5'>
        <label htmlFor='image'>Image</label>
        <input
          className='form-control'
          multiple={false}
          id='image'
          type='file'
          onChange={changeHandle}
        />
      </form>

      <div className='progress'>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: progress + '%' }}
          aria-valuemin='0'
          aria-valuemax='100'
        ></div>
      </div>

      <div className='album py-5 '>
        <div className='container'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            {data &&
              data.map(({ docId, url }) => {
                return (
                  <motion.div
                    onClick={() => setSelectedImage(url)}
                    style={{ cursor: 'pointer' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    layout
                    key={docId}
                    className='col shadow-sm'
                  >
                    <button onClick={() => deletePicture(docId)}> ❎ </button>
                    <img
                      height='100%'
                      width='100%'
                      className='bd-placeholder-img card-img-top'
                      src={url}
                      alt='test'
                    />
                  </motion.div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Form
