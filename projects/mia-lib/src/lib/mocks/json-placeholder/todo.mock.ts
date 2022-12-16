import { Todo } from '@lib/models/json-placeholder/todo.model';

const MOCK_TODO: Todo = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false
} as const;

const MOCK_LIST_TODOS: Todo[] = [MOCK_TODO];

export { MOCK_TODO, MOCK_LIST_TODOS };
