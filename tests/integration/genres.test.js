import request from 'supertest';
import getServer from '../../index';
import { Genre } from '../../models/genre';

let server = null;

describe('api/genres', () => {
    describe('GET /', () => {
        beforeEach(() => server = getServer());
        afterEach(async () => {
            await Genre.collection.deleteMany({});
            server && server.close()
        });
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre 1' },
                { name: 'genre 2' }
            ]);
            const res = await request(server).get(`/api/genres`);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some((item) => item.name === 'genre 1')).toBeTruthy();
        });
    })
    describe('GET /:id', () => {
        beforeEach(() => server = getServer());
        afterEach(async () => {
            await Genre.collection.deleteMany({});
            server && server.close()
        });
        it('should return a genres if valid id is passed', async () => {
            let genre = new Genre({ name: 'genre 1' });
            await genre.save();
            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
        it('should return status 404 if invalid id is passed', async () => {
            let genre = new Genre({ name: 'genre 1' });
            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(404);
        });
    });
    describe('POST /', () => {
        beforeEach(() => server = getServer());
        afterEach(async () => {
            await Genre.collection.deleteMany({});
            server && server.close()
        });
        it('should return status 401 if user is not authorized.', async () => {
            const res = await request(server).post(`/api/genres`).send({ name: 'genre 1' });
            expect(res.status).toBe(401);
        });
    });
})