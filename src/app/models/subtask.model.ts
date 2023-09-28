export class Subtask {
    
    constructor(
        public title: string,
        public completed: boolean,
        public id: number | null,
        public todo: number | null
    ) {}
}
