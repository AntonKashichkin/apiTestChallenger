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

  test('Challenges', async ({ api }, testinfo) => {
    let body = await api.challenges.get(token, testinfo);
    expect(body.challenges.length).toBe(59);
  });

  test('Todos', async ({ api }, testinfo) => {
    let body = await api.todos.get(token, testinfo);
    expect(body.todos.length).toBe(10);
  });

  test('Todo', async ({ api }, testinfo) => {
    let respTodo = await api.todo.get(token, testinfo);
    expect(respTodo.status()).toBe(404);
  });
});
