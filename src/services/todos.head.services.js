import { test } from '@playwright/test';

export class ToDosHead {
  constructor(request) {
    this.request = request;
  }

  async head(token, testinfo) {
    return test.step('HEAD /todos', async () => {
      const response = await this.request.head(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }
}
