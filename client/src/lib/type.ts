export type TasksType = {
  tasks: TaskType[];
};

export type TaskType = {
  description: string;
  done: boolean;
  id: string;
  title: string;
  completed: boolean;
};
