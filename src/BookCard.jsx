import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {

  return (
    <Link to={`/book/${book.id}`} className='col-md-6 col-xl-4 p-2'>
      <div className="h-100 row m-0 bg-light p-2 text-gray bg-opacity-75 rounded-3 bookCard">
        <div className="col w-25">
          <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Title page" />
        </div>
        <div className="col w-75">
          <p>{book.volumeInfo.title}</p>
          <p>Categories: {book.volumeInfo.categories?.[0]}</p>
          <p>Authors: {book.volumeInfo.authors?.join(', ')}</p>
        </div>
      </div>
    </Link>
  )
}

export default BookCard
