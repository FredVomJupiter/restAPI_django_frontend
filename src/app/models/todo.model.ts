import { Priority } from './priority.model';
import { Subtask } from './subtask.model';

export class Todo {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public completed: boolean,
        public category: number,
        public priority: Priority,
        public due_date: Date,
        public assigned_to: number[],
        public subtask: Subtask[]
    ) { }


}
