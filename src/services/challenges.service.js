import { test } from '@playwright/test';

export class ChallengesService {
  constructor(request) {
    this.request = request;
  }

  async get(token, testinfo) {
    return test.step('GET /challenges', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/challenges`, {
        headers: { 'X-CHALLENGER': token },
      });
      const body = await response.json();
      return body;
    });
  }
}
