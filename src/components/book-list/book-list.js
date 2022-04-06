import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import withBookstoreService from '../hoc';
// import BookstoreService from '../../services/bookstore-service';
import { fetchBooks } from '../../actions';
import { compose } from '../../utils';
import './book-list.css';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';


const BookList = ({books}) => {
  return (
    <ul className='book-list'>
      {
        books.map((book) => {
          return (
            <li key={book.id}><BookListItem book={book}/></li>
          )
        })
      }
    </ul>
  );
};

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
    // //1.receive data
    // const { 
    //   bookstoreService, 
    //   booksLoaded, 
    //   booksRequested, 
    //   booksError } = this.props; // Получаем bookstoreService из контекста
    
    // booksRequested();//spinner при каждой загрузке данных

    // bookstoreService.getBooks() //получаем данные
    //   .then((data) => booksLoaded(data))
    //   .catch((err) => booksError(err)); 


    // //2.dispatch action to store
    // // this.props.booksLoaded(data); 
    // // когда есть данные, 
    // // вызываем booksLoaded(data) - action creator, 
    // // он вызывает dispatch и передает данные(список книг) 
    // // в Redux Store
  }


  render() {
    const { books, loading, error } = this.props;
    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorIndicator />
    }

    //получаем из Redux Store список книг и отрисовываем его
    return <BookList books={books}/>
  }
}


const mapStateToProps = ({ books, loading, error }) => { //state
  return { books, loading, error }; //books: state.books
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {//(dispatch, ownProps) 

  // const { bookstoreService } = ownProps;

  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
};

// const mapDispatchToProps = {
//    booksLoaded,
//    booksRequested,
//    booksError 
// };

// const mapDispatchToProps =  (dispatch) => {
//   return bindActionCreators({
//     booksLoaded
//   }, dispatch);

//   // return {
//   //   booksLoaded: (newBooks) => {
//   //     dispatch(booksLoaded(newBooks))
//   //     // dispatch({
//   //     //   type: 'BOOKS_LOADED',
//   //     //   payload: newBooks
//   //     // });
//   //   }
//   // };
// };

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);

// export default withBookstoreService()(
//   connect(mapStateToProps, mapDispatchToProps)(BookList));