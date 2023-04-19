const books = require('./books');
const { addBooks, getAllBooks, getDetailBook, editBookById, deleteBookById } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooks,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
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
    }
]

module.exports = routes;