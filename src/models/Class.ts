export class Class {
    constructor (
        private id: string,
        private name: string,
        private module: string
    ) {
        this.id = id
        this.name = name
        this.module = module
    }
}

interface instructor {
    id: string,
    name: string
}

interface student {
    id: string,
    name: string
}

export interface returnClassesDTO {
    id: string,
    name: string,
    allInstructors: instructor[],
    allStudents: student[],
    module: string
}

export interface updateClassModuleDTO {
    classId: string,
    newModule: string
}

