import { Subtask } from './subtask.model';

export class Todo {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public completed: boolean,
        public category: number,
        public priority: number,
        public due_date: Date,
        public assigned_to: number[],
        public subtasks: Subtask[]
    ) { }


}
