import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import withBookstoreService from '../hoc';
// import BookstoreService from '../../services/bookstore-service';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';
import './book-list.css';
import Spinner from '../spinner/spinner';



class BookList extends Component {

  componentDidMount() {
    //1.receive data
    const { bookstoreService, booksLoaded } = this.props; // Получаем bookstoreService из контекста
    bookstoreService.getBooks() //получаем данные
      .then((data) => booksLoaded(data)); 

    //2.dispatch action to store
    // this.props.booksLoaded(data); 
    // когда есть данные, 
    // вызываем booksLoaded(data) - action creator, 
    // он вызывает dispatch и передает данные(список книг) 
    // в Redux Store
  }


  render() {
    const { books, loading } = this.props;
    if (loading) {
      return <Spinner/>
    }


    //получаем из Redux Store список книг и отрисовываем его
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
  }
}

const mapStateToProps = ({ books, loading }) => { //state
  return { books, loading }; //books: state.books
};

const mapDispatchToProps = {
   booksLoaded 
};

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
)(BookList);

// export default withBookstoreService()(
//   connect(mapStateToProps, mapDispatchToProps)(BookList));