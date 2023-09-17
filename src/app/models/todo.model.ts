import { Category } from './category.model';
import { Priority } from './priority.model';
import { Assigned } from './assigned.model';
import { Subtask } from './subtask.model';

export class Todo {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public completed: boolean,
        public category: Category,
        public priority: Priority,
        public due_date: Date,
        public assigned_to: Assigned[],
        public subtask: Subtask[]
    ) { }


}
