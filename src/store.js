import { createStore } from 'redux';
import reducer from './reducers';

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

// store.dispatch('HELLO');

const store = createStore(reducer);

export default store;