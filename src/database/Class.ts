export default class Class {
    constructor (
        private id: string,
        private name: string,
        private instructorsIds: any[],
        private studentsIds: any[],
        private module: string
    ) {
        this.id = id
        this.name = name
        this.instructorsIds = instructorsIds
        this.studentsIds = studentsIds
        this.module = module
    }

    public getId () {
        return this.id
    }

    public getName () {
        return this.name
    }

    public getInstructorsIds () {
        return this.instructorsIds
    }

    public getStudentsIds () {
        return this.studentsIds
    }

    public getModule () {
        return this.module
    }
}