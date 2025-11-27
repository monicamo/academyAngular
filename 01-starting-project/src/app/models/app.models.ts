export interface User {
  id: string;
  name: string;
  avatar: string;
}

// outra forma de declarar um tipo
export type User2 = {
  id: string;
  name: string;
  avatar: string;
};

export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}

export interface NewTaskData {
  title: string;
  summary: string;
  dueDate: string;
}
