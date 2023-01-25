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