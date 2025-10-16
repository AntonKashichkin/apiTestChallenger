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
          title: 'Not completed task',
          description: 'This task is not done yet',
          doneStatus: false,
        },
      });
      return response;
    });
  }

  async createDoneTodo(token, testinfo) {
    return test.step('Create todo with doneStatus: true', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'Completed task',
          description: 'This task is completed',
          doneStatus: true,
        },
      });
      return response;
    });
  }

  async doneStatus(token, testinfo) {
    return test.step('Create todo with doneStatus: invalid', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          doneStatus: 'invalid',
        },
      });
      return response;
    });
  }

   async titleLonger(token, testinfo) {
    return test.step('Create todo with title longer', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'Title.'.repeat(10),
          description: 'This task is completed',
          doneStatus: true,
        },
      });
      return response;
    });
  }

  async descriptionLonger(token, testinfo) {
    return test.step('Create todo with description longer', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'Description too long',
          description: 'String longer than 200 characters.'.repeat(10),
          doneStatus: true,
        },
      });
      return response;
    });
  }

  async maxSizeContent(token, testinfo) {
    return test.step('Create todo with max size content', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: '50'.repeat(25),
          description: 'string in 200 bytes.'.repeat(10),
          doneStatus: true,
        },
      });
      return response;
    });
  }

  async contentTooLong(token, testinfo) {
    return test.step('Create todo with content too long', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'Stars drift softly across the calm and endless sky',
          description: 'sting in 5000 bytes'.repeat(264),
          doneStatus: true,
        },
      });
      return response;
    });
  }

  async priority(token, testinfo) {
    return test.step('Create a task with an unsupported parameter', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'Stars drift softly across the calm and endless sky',
          description: 'This task is completed',
          doneStatus: true,
          priority: 'extra',
        },
      });
      return response;
    });
  }

   async put(token, testinfo) {
    return test.step('Put /todos/{id} (400)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/15`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'create todo process payroll',
          description: '',
        },
      });
      return response;
    });
  }

  async updatingTask(token, testinfo) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos/10`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'updated title',
          description: '',
        },
      });
      return response;
    });
  }

  async updatingTaskOfANonExistentTask(token, testinfo) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos/15`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'updated title',
          description: '',
        },
      });
      return response;
    });
  }

  async fullChangeTask(token, testinfo) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/1`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: 'Change title',
          description: 'Change description',
          doneStatus: false,
        },
      });
      return response;
    });
  }

   async partialUpdate(token, testinfo) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: "partial update for title",
        },
      });
      return response;
    });
  }

   async noTitle(token, testinfo) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          description: "partial update for description",
        },
      });
      return response;
    });
  }

  async noAmendId(token, testinfo) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          id: 4,
          title: 'updated title',
        }   
      });
      return response;
    });
  }

  async deleteTodo(token, testinfo) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.delete(`${testinfo.project.use.api}/todos/5`, {
        headers: { 'X-CHALLENGER': token },
       });
      return response;
    });
  }

  async options(token, testinfo) {
    return test.step('Options)', async () => {
      const response = await fetch(`${testinfo.project.use.api}/todos`, {
        method: 'OPTIONS',
        headers: { 'X-CHALLENGER': token },
       });
      return {
        status: () => response.status,
        statusText: () => response.statusText,
        headers: () => Object.fromEntries(response.headers.entries()),
        text: async () => response.text(),
        ok: () => response.ok
      };
    });
  }
}


