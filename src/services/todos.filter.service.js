import { test } from '@playwright/test';

export class ToDosFilter {
  constructor(request) {
    this.request = request;
  }

  async get(token, testinfo) {
    return test.step('GET /todos?doneStatus=true', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos?doneStatus=true`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }
}

