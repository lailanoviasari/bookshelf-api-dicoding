const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const finished = pageCount === readPage ? true : false;

    const newBooks = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    books.push(newBooks);

    const noName = books.filter((book) => book.name === undefined).length > 0;
    const moreReadPage = books.filter((book) => book.readPage > book.pageCount).length > 0;

    if (!noName && !moreReadPage) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            }
        });

        //console.log(books.filter((book) => book.id === id));

        response.code(201);
        return response;
    }

    if (noName) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })

        books.splice(2, 1);

        response.code(400);
        return response;
    }

    if (moreReadPage) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })

        books.splice(2, 1);

        response.code(400);
        return response;
    }
};

const getAllBooksWith3Property = (request, h) => {

    const { reading, finished, name } = request.query;

    /* const bukuReading  */

    if (reading !== undefined) {
        if (reading == 0) {
            const bukuUnReading = books.filter((book) => book.reading == 0);

            return {
                status: 'success',
                data: {
                    books: bukuUnReading.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    }))
                },
            }
        } else if (reading == 1) {
            const bukuReading = books.filter((book) => book.reading == 1);

            return {
                status: 'success',
                data: {
                    books: bukuReading.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    }))
                },
            }
        }
    }

    if (finished !== undefined) {
        if (finished == 0) {
            const bukuUnfinished = books.filter((book) => book.finished == 0);

            return {
                status: 'success',
                data: {
                    books: bukuUnfinished.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    }))
                },
            }
        } else if (finished == 1) {
            const bukufinished = books.filter((book) => book.finished == 1);

            return {
                status: 'success',
                data: {
                    books: bukufinished.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    }))
                },
            }
        }
    }

    if (name !== undefined) {
        const bukuName = books.map((book) => book.name)
        const a = books.filter((book) => book.name == [name])

        console.log(bukuName)
        console.log([name]);
        console.log(a);
    }

    const response = h.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        },
    })

    response.code(200);
    return response;
}

const getDetailBook = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((book) => book.id === bookId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
};

const editBookById = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const updatedAt = new Date().toISOString();

    const finished = pageCount === readPage ? true : false;

    const index = books.findIndex((book) => book.id === bookId);

    const noName = name === undefined ? true : false;

    const moreReadPage = readPage > pageCount ? true : false;

    if (!noName && !moreReadPage && (index !== -1)) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            finished,
            readPage,
            reading,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });

        response.code(200);
        return response;
    }

    if (noName) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })

        response.code(400);
        return response;
    }

    if (moreReadPage) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })

        response.code(400);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan"
    })

    response.code(404);
    return response;

}

const deleteBookById = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        })

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    })

    response.code(404);
    return response;
}

module.exports = { addBooks, getAllBooksWith3Property, getDetailBook, editBookById, deleteBookById };