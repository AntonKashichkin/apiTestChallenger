import { ChallengerService, ChallengesService, ToDos, ToDo, ToDoIdPositive, ToDoIdNegative, ToDosFilter, ToDosHead } from './index';

export class Api {
  constructor(request) {
    this.requet = request;
    this.challenger = new ChallengerService(request);
    this.challenges = new ChallengesService(request);
    this.todos = new ToDos(request);
    this.todo = new ToDo(request);
    this.todoidpositive = new ToDoIdPositive(request);
    this.todoidnegative = new ToDoIdNegative(request);
    this.todosfilter = new ToDosFilter(request);
    this.todoshead = new ToDosHead(request);
  }
}
