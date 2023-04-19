const { nanoid } = require("nanoid");
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/books',
        handler: (request, h) => {
            const {
                name,
                pageCount,
                readPage,
            } = request.payload;

            const id = nanoid(16);
            const insertedAt = new Date().toISOString();
            const updatedAt = insertedAt;

            const finished = pageCount === readPage ? true : false;

            const newBooks = {
                id,
                name,
                pageCount,
                readPage,
                finished,
                insertedAt,
                updatedAt
            }

            books.push(newBooks);

            const isSuccess = books.filter((book) => book.name !== undefined && book.readPage <= book.pageCount).length > 0;
            const noName = books.filter((book) => book.name === undefined).length > 0;
            const moreReadPage = books.filter((book) => book.pageCount < book.readPage).length > 0;

            if (isSuccess) {
                const response = h.response({
                    status: 'success',
                    message: 'Buku berhasil ditambahkan',
                    data: {
                        bookId: id,
                    }
                });

                response.code(201);
                return response;
            }

            if (noName) {
                const response = h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan buku. Mohon isi nama buku'
                })

                response.code(400);
                return response;
            }

            if (moreReadPage) {
                const response = h.response({
                    status: "fail",
                    message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
                })

                response.code(400);
                return response;
            }
        }
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();