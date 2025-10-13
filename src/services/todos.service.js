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

  async createNotDoneTodo(token, testinfo) {
    return test.step('Create todo with doneStatus: false', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: "Not completed task",
          description: "This task is not done yet",
          doneStatus: false
        }
      });
      return response;
    });
  }

  async createDoneTodo(token, testinfo) {
    return test.step('Create todo with doneStatus: true', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: "Completed task", 
          description: "This task is completed",
          doneStatus: true
        }
      });
      return response;
    });
  }
}