import { test } from '@playwright/test';

export class ToDos {
  constructor(request) {
    this.request = request;
  }

  async get(token, testinfo) {
    return test.step('GET /todos', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
      });
      const body = await response.json();
      return body;
    });
  }
}