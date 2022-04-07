const updateCartItems = (cartItems, item, idx) => { //обновляет массив
  
  if (item.count === 0) {//удаление элемента
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  }
  
  if (idx === -1){ //если это новый элемент //добавление элемента
    return [
      ...cartItems,
      item
    ]
  }

  return [//обновление элемента
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ]
}

const updateCartItem = (book, item = {}, quantity) => {

  const { 
    id = book.id, 
    count = 0, 
    title = book.title, 
    total = 0 } = item;

    return {
      id,
      title,
      count: count + quantity,
      total: total + quantity*book.price
    };
};

const updateOrder = (state, bookId, quantity) => {

  const { bookList: { books }, shoppingCart: { cartItems } } = state;

  // const bookId = action.payload;
  const book = books.find((book) => book.id === bookId);
  const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemIndex]; //if itemIndex===-1, тогда item===undefined
  
  const newItem = updateCartItem(book, item, quantity);
  return {
    orderTotal: 0,
    cartItems: updateCartItems(cartItems, newItem, itemIndex)
  };
};

const updateShoppingCart = (state, action) => {

  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0
    };
  }

  switch(action.type) {
    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);

    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.count); // сбиваем количество до нуля
  
    default:
      return state.shoppingCart;
  }
};

export default updateShoppingCart;