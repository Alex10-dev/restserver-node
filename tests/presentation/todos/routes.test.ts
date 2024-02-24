
import request from 'supertest';
import { testServer } from './test-server';
import { prisma } from '../../../src/data/postgres';

describe('Testing routes', () => {

    beforeAll(async() => {
        await testServer.startServer();
    });

    afterAll(() => {
        testServer.closeServer();
    });

    afterEach(async() => {
        await prisma.todo.deleteMany();
    });

    const todo1 = {text: 'testing 1'};
    const todo2 = {text: 'testing 2'};

    test('Should return a list of TODOs', async() => {

        await prisma.todo.createMany({
            data: [ todo1, todo2 ]
        });

        const { body } = await request( testServer.app )
            .get('/api/todos')
            .expect(200);

        expect( body ).toBeInstanceOf( Array );
        expect( body.length ).toBe(2);
        expect( body[0].text ).toBe( todo1.text );
        expect( body[1].text ).toBe( todo2.text );
    });

    test('Should return a specific todo by ID', async() => {

        const todo = await prisma.todo.create({
            data: todo1 
        });
        const id = todo.id;

        const { body } = await request( testServer.app )
            .get(`/api/todos/${id}`)
            .expect(200);

        expect( body ).toEqual({
            id: id,
            text: todo.text,
            completedAt: todo.completedAt,
        });
    });


    test('Should return a 404 NotFound message api/todos/:id', async() => {

        const todo = await prisma.todo.create({
            data: todo1 
        });
        const id = todo.id;

        const { body } = await request( testServer.app )
            .get(`/api/todos/9999`)
            .expect(400);

        expect( body ).toEqual({ error: `Can't find todo with id: 9999` });
    });


    test('Should create a new todo api/todos/create-todo', async() => {

        const { body } = await request( testServer.app )
            .post(`/api/todos/create-todo`)
            .send( todo2 )
            .expect(201);

        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo2.text,
            completedAt: null,
        });
    });

    test('Should return an error message api/todos/create-todo', async() => {

        const { body } = await request( testServer.app )
            .post(`/api/todos/create-todo`)
            .send( {} )
            .expect(400);

        expect( body ).toEqual({ error: 'Text property is required' });
    });


    test('Should update a todo api/todos/update-todo', async() => {

        const todo = await prisma.todo.create({
            data: todo1 
        });
        const id = todo.id;

        const { body } = await request( testServer.app )
            .put(`/api/todos/update-todo/${id}`)
            .send({
                text: 'updated todo',
                completedAt: '2024-10-01',
            })
            .expect(200);

        expect( body ).toMatchObject({
            id: id,
            text: 'updated todo',
        });
        expect( body.completedAt!.toString().split('T')[0] ).toBe( '2024-10-01' );
    });


    test('Should return a 404 NotFound message api/todos/update-todo', async() => {

        const todo = await prisma.todo.create({
            data: todo1 
        });
        const id = todo.id;

        const { body } = await request( testServer.app )
            .put(`/api/todos/update-todo/9999`)
            .send({
                text: 'updated todo',
                completedAt: '2024-10-01',
            })
            .expect(400);

        expect( body ).toEqual({ error: `Can't find todo with id: 9999` });
    });

    test('Should delete a todo by ID api/todos/', async() => {

        const newTodo1 = await prisma.todo.create({
            data: todo1
        });

        const newTodo2 = await prisma.todo.create({
            data: todo2
        });

        const { body } = await request( testServer.app )
            .delete(`/api/todos/${ newTodo1.id }`)
            .expect(200);

        expect( body ).toEqual({
            id: newTodo1.id,
            text: todo1.text,
            completedAt: null,
        });
    });


    test('Should return a 404 NotFound message api/todos/', async() => {

        await prisma.todo.create({
            data: todo1
        });

        const { body } = await request( testServer.app )
            .delete(`/api/todos/9999`)
            .expect(400);

        expect( body ).toEqual({ error: `Can't find todo with id: 9999` });
    });

})