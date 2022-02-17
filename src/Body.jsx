import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import GlobalContext from './context/GlobalContext'
import BookCard from './BookCard'
import Loader from './Loader'
import settings from './config.js'



const Body = observer(() => {
  const { MainStore } = useContext(GlobalContext)

  const loadMore = (searchOptions, index) => {

    MainStore.setLoad(true)

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchOptions}&startIndex=${index}&key=${settings.key}`)
      .then(data => data.json())
      .then(newdata => {
        MainStore.incrementIndex()
        MainStore.addItems(newdata.items)
        MainStore.setLoad(false)
      })
  }

  return (
    <main className='container'>
      <div className="row m-2">
        {MainStore.books.totalItems
          ? <>
            {
              MainStore.isLoad && !MainStore.abilityToLoadMore
                ? <div className="container text-center"><Loader /></div>
                : <>
                  <div className="container text-center">
                    <h5>Total founds: {MainStore.books.totalItems}</h5>
                  </div>
                  {MainStore.books.items.map(book => <BookCard key={book.id} book={book} />)}

                  {MainStore.abilityToLoadMore
                    ? <div className="container text-center">
                      {MainStore.isLoad
                        ? <Loader />
                        : <button
                          type="button"
                          className="btn btn-dark btn-lg m-5"
                          onClick={() => loadMore(MainStore.options, MainStore.startIndex)}>
                          Load more
                        </button>}

                    </div>
                    : <></>
                  }

                </>
            }
          </>
          : <></>
        }

      </div>
    </main>
  )
})

export default Body
