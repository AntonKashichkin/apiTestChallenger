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
    const response = await respTodoId.json();
    expect(response.errorMessages.some((msg) => msg.includes('Could not find an instance with todos/'))).toBe(true);
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

  test('Todos  @head', async ({ api }, testinfo) => {
    let response = await api.todoshead.head(token, testinfo);
    expect(response.status()).toBe(200);
  });

  test('Todos  @post', async ({ api }, testinfo) => {
    let response = await api.todos.createDoneTodo(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(201);
    expect(r.title).toBe('Completed task');
    expect(r.description).not.toBe('');
    expect(r.doneStatus).toBe(true);
  });

  test('Todos doneStatus  @post', async ({ api }, testinfo) => {
    let response = await api.todos.doneStatus(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Failed Validation: doneStatus should be BOOLEAN but was STRING');
  });

  test('Todos title too long  @post', async ({ api }, testinfo) => {
    let response = await api.todos.titleLonger(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain(
      'Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50'
    );
  });

  test('Todos description too long  @post', async ({ api }, testinfo) => {
    let response = await api.todos.descriptionLonger(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain(
      'Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200'
    );
  });

  test('Todos max size content  @post', async ({ api }, testinfo) => {
    let response = await api.todos.maxSizeContent(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(201);
    expect(r.title.length).toBe(50);
    expect(r.description.length).toBe(200);
  });

  test('Todos Content too long  @post', async ({ api }, testinfo) => {
    let response = await api.todos.contentTooLong(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(413);
    expect(r.errorMessages).toContain('Error: Request body too large, max allowed is 5000 bytes');
  });

  test('Todos priority @post', async ({ api }, testinfo) => {
    let response = await api.todos.priority(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Could not find field: priority');
  });



});
