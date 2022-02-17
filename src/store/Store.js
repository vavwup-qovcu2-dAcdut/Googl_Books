import { makeAutoObservable } from "mobx"

class Store {
  books = {
    totalItems: 0,
    items: []
  }

  book = {
    volumeInfo: {
      imageLinks: {},
      categories: [],
      authors: [],
      description: ''
    }
  }
  category = 'All'
  sorting = 'relevance'
  isLoad = false
  search = ''
  startIndex = 30
  abilityToLoadMore = false


  constructor() {
    makeAutoObservable(this)
  }

  setSearch(value) {
    this.search = value
  }

  incrementIndex() {
    this.startIndex += 30;
  }

  resetIndex() {
    this.startIndex = 30;
  }

  setAbility(bool) {
    this.abilityToLoadMore = bool
  }

  setBooks(newBooks) {
    this.books = newBooks
  }

  setBook(newBook) {
    this.book = newBook
  }

  setCategory(newCat) {
    this.category = newCat
  }

  setSort(newSort) {
    this.sorting = newSort
  }

  setLoad(bool) {
    this.isLoad = bool
  }

  addItems(arr) {
    this.books.items.push(...arr)
  }

  get options() {
    let subject = this.category !== 'All' ? `+subject:${this.category}` : '';
    let order = this.sorting !== 'relevance' ? `&orderBy=${this.sorting}` : '';
    let length = `&maxResults=30`

    return this.search + subject + order + length
  }
}

export default Store
