import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import withBookstoreService from '../hoc';
import { fetchBooks } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';



class BookList extends Component {

  componentDidMount() {
    this.props.fetchBooks();
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

const mapStateToProps = ({ books, loading, error }) => { //state
  return { books, loading, error }; //books: state.books
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {//(dispatch, ownProps) 

  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);