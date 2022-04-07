//Naming Convention

const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST' //получение данных
  }//(запрос отправлен)
};


const booksLoaded = (newBooks) => {
  return { // относится к тому же запросу, поэтому fetch
    type: 'FETCH_BOOKS_SUCCESS',//для успешного получения книг
    payload: newBooks
  };//(получен результат: в payload полученные данные)
};


const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE', //для получения ошибки
    payload: error
  };//(произошла ошибка: в payload передается объект Error)
};

export const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  };
};

export const bookRemovedFromCart = (bookId) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: bookId
  };
};

export const allBooksRemovedFromCart = (bookId) => {
  return {
    type: 'ALL_BOOKS_REMOVED_FROM_CART',
    payload: bookId
  };
};


const fetchBooksOld = (bookstoreService, dispatch) => () => { // это не action creator
  //двойная ф-ция () => () => чтобы можно было вызвать 
  // ф-цию без параметров. Они будут закрыты здесь
  dispatch(booksRequested());//spinner при каждой загрузке данных
  bookstoreService.getBooks() //получаем данные
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err))); 
}

const fetchBooks = (bookstoreService) => () => (dispatch) => {
  dispatch(booksRequested());//spinner при каждой загрузке данных
  bookstoreService.getBooks() //получаем данные
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err))); 
};
 
// export { // они используются все в fetchBooks
//   booksLoaded,
//   booksRequested,
//   booksError
// };

export {
  fetchBooks
};