import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunkMiddleware  from 'redux-thunk';

//MIDDLEWARE 
//Мы не получаем полный доступ к store. Доступ только к двум ф-циям:
// { getState, dispatch }

const logMiddleware = (store) => (dispatch) => (action) => { // часто dispatch это next (в документации)
  console.log(action.type);
  return dispatch(action);
};

const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
    return dispatch({
      type: action
    });
  }

  return dispatch(action);
};

const store = createStore(reducer, applyMiddleware(
  thunkMiddleware, stringMiddleware, logMiddleware)); // порядок важен

// const myAction = (dispatch) => {
//   setTimeout(() => dispatch({
//     type: 'DELAYED_ACTION'
//   }), 2000);
// };

const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: 'DELAYED_ACTION'
  }), timeout);
};

store.dispatch(delayedActionCreator(3000));//myAction

// ---------------------------------------------------------

// STORE ENHANCER
// const enhancer = (createStore) => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if (typeof action === 'string') {
//       return originalDispatch({
//         type: action
//       });
//     }

//     return originalDispatch(action);
//   };

//   return store;
// };

// const store = createStore(reducer, enhancer);

// MONKEY PATCHING //ИСПРАВЛЕНИЕ ОБЕЗЬЯНЫ
// const originalDispatch = store.dispatch;
// store.dispatch = (action) => {
//   if (typeof action === 'string') {
//     return originalDispatch({
//       type: action
//     });
//   }

//   return originalDispatch(action);
// };

// store.dispatch('HELLO'); // это тестер



// const store = createStore(reducer); //если без исправлений dispatch или store 

export default store;