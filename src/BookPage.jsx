import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import GlobalContext from './context/GlobalContext'
import Loader from './Loader'


const BookPage = observer(() => {
  const { id } = useParams()
  const { MainStore } = useContext(GlobalContext)

  useEffect(() => {
    MainStore.setLoad(true)
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(data => data.json())
      .then(newdata => {
        MainStore.setBook(newdata)
        MainStore.setLoad(false)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container border p-3">
      {MainStore.isLoad
        ? <Loader />
        : <>
          <div className="row">
            <div className="col-md-4 col-12 p-3">
              <img src={MainStore.book.volumeInfo.imageLinks?.thumbnail} alt="Title page" className='w-100' />
            </div>
            <div className="col-md-8 col-12 p-3">
              <p className='fs-6 mb-3 text-secondary'>{MainStore.book.volumeInfo.categories}</p>
              <p className='fs-2 fw-bold'>{MainStore.book.volumeInfo.title}</p>
              <p className='text-white btn-dark'>{MainStore.book.volumeInfo.authors?.join(', ')}</p>
              <p className='p-2 border ' dangerouslySetInnerHTML={{ __html: MainStore.book.volumeInfo.description }}></p>
            </div>
          </div>
        </>}

    </div>
  )
})

export default BookPage
