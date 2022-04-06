const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  }//(запрос отправлен)
};


const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };//(получен результат: в payload полученные данные)
};


const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  };//(произошла ошибка: в payload передается объект Error)
};

const fetchBooks = (bookstoreService, dispatch) => () => { // это не action creator
  dispatch(booksRequested());//spinner при каждой загрузке данных
  bookstoreService.getBooks() //получаем данные
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err))); 
}


export {
  fetchBooks
};