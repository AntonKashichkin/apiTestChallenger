import { expect } from '@playwright/test';
import { test } from '../src/fixture/index';

let token;

test.describe('Tests using the facade & fixture pattern', () => {
  test.beforeAll(async ({ api }, testinfo) => {
    let r = await api.challenger.post(testinfo);
    const headers = r.headers();
    // @ts-ignore
    console.log(`${testinfo.project.use.api}${headers.location}`);
    token = headers['x-challenger'];
  });

  test('Challenges @get', async ({ api }, testinfo) => {
    let body = await api.challenges.get(token, testinfo);
    expect(body.challenges.length).toBe(59);
  });

  test('Todos  @get', async ({ api }, testinfo) => {
    let body = await api.todos.get(token, testinfo);
    expect(body.todos.length).toBe(10);
  });

  test('Todo  @get', async ({ api }, testinfo) => {
    let respTodo = await api.todo.get(token, testinfo);
    expect(respTodo.status()).toBe(404);
  });

  test('Todos ID positive @get', async ({ api }, testinfo) => {
    let respTodoId = await api.todoidpositive.get(token, testinfo);
    expect(respTodoId.status()).toBe(200);
    const responseBody = await respTodoId.json();
    const todo = responseBody.todos[0];
    expect(todo.id).toBe(5);
    expect(todo.title).toBe('pay invoices');
    expect(todo.doneStatus).toBe(false);
    expect(todo.description).toBe('');
  });

  test('Todos ID negativ @get', async ({ api }, testinfo) => {
    let respTodoId = await api.todoidnegative.get(token, testinfo);
    expect(respTodoId.status()).toBe(404);
  });

   test('Todos filter @get', async ({ api }, testinfo) => {
    await api.todos.createDoneTodo(token, testinfo);
    await api.todos.createNotDoneTodo(token, testinfo); 
    let respTodosFilter = await api.todosfilter.get(token, testinfo);
    const response = await respTodosFilter.json();
    const todos = response.todos[0];
    expect(respTodosFilter.status()).toBe(200);
    expect(todos.doneStatus).toBe(true);
  });
});