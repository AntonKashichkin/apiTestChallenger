import { test } from '@playwright/test';

export class ToDoIdPositive {
  constructor(request) {
    this.request = request;
  }

  async get(token, testinfo) {
    return test.step('GET /todos/id positive', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos/5`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }     
};