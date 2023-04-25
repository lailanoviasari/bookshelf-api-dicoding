const {
  addBooks, getAllBooksWith3Property, getDetailBook, editBookById, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksWith3Property,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getDetailBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;
