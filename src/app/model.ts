export interface DataSource {
  tasks: any;
  states: State[];
}

export interface State {
  id: number;
  title: string;
  type: string;
}

export interface Task {
  id: number;
  title: string;
  type: string;
  description: string;
}

export interface NewTask {
  title: string;
  description: string;
}
