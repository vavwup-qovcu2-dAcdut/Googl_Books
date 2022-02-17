import './style.css'
import React, { useContext } from 'react'
import GlobalContext from './context/GlobalContext'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import settings from './config.js'


const Header = observer(() => {
  const { MainStore } = useContext(GlobalContext)

  const handleSearch = (searchOptions) => {
    MainStore.setLoad(true)
    let key = `&key=${settings.key}`


    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchOptions}` + key)
      .then(data => data.json())
      .then(newdata => {
        MainStore.setBooks(newdata)

        setTimeout(() => {
          MainStore.setAbility(true)
          MainStore.setLoad(false)
        }, 2000)
      })
  }


  return (
    <header className=' pt-3 pb-3 mt-3'>

      <div className='header-bloc container'>

        <h1 className='text-center text-white fw-bold'>Googl Books</h1>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-10">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title of the book"
                value={MainStore.seacrh}
                onChange={(e) => {
                  MainStore.setAbility(false)
                  MainStore.setSearch(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(MainStore.options)
                  }
                }}
              />
              <Link
                className="btn btn-dark"
                type="submit"
                id="button-addon2"
                onClick={() => handleSearch(MainStore.options)}
                to='/'
              >
                <i className="bi bi-search"></i>
              </Link>
            </div>
          </div>
        </div>      

        <div className="row justify-content-center mt-3">

          <div className="col-sm-4 col-md-3 col-lg-3 col-7">

            <div>              
              <select
                className="form-select"
                defaultValue='All'
                onChange={(e) => {
                  MainStore.resetIndex()
                  MainStore.setAbility(false)
                  MainStore.setCategory(e.target.value)
                }}>
                <option value="0" disabled>Categories</option>
                <option value="All">All</option>
                <option value="Art">Art</option>
                <option value="Biography">Biography</option>
                <option value="Computers">Computers</option>
                <option value="History">History</option>
                <option value="Medical">Medical</option>
                <option value="Poetry">Poetry</option>
              </select>
            </div>

            <div  className='text-right pl-1'> Categories</div>

          </div>

          <div className="col-sm-4 col-md-3 col-lg-3 col-7">

            <div>
              <select
                className="form-select"
                defaultValue='relevance'
                onChange={(e) => {
                  MainStore.resetIndex()
                  MainStore.setAbility(false)
                  MainStore.setSort(e.target.value)
                }
                }>
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className='text-right pl-1'>Relevance</div>

            </div>
          </div>

      </div>

    </header >
  )
})

export default Header
