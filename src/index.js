import React from "react";
// import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app/app";
import ErrorBoundary from './components/error-boundary';
import BookstoreService from './services/bookstore-service';
import { BookstoreServiceProvider } from "./components/bookstore-service-context";

import store from './store';

const bookstoreService = new BookstoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BookstoreServiceProvider value={bookstoreService}>
        <Router>
          {/* <Route></Route> */}
          <App />
        </Router>
      </BookstoreServiceProvider>
    </ErrorBoundary>
    {/* <App/> */}
  </Provider>,
  document.getElementById('root')
);

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
// root.render(
//   <Provider store={store}>
//     <ErrorBoundary>
//       <BookstoreServiceProvider value={bookstoreService}>
//         <Router>
//           <App />
//         </Router>
//       </BookstoreServiceProvider>
//     </ErrorBoundary>
//     {/* <App/> */}
//   </Provider>
// );