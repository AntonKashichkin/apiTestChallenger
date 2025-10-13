import { test } from '@playwright/test';

export class ToDoIdNegative {
  constructor(request) {
    this.request = request;
  }

  async get(token, testinfo) {
    return test.step('GET /todos/id negative', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos/15`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }     
};