import Person from "./Person"

export class Student extends Person {
    constructor (
        id: string,
        name: string,
        email: string,
        birth_date: Date,
        class_id: string,
        private hobbies: string[]
    ) {
        super (id, name, email, birth_date, class_id)
        this.hobbies = hobbies
    }

    public getHobbies(): string[] {
        return this.hobbies
    }
}

export interface inputStudentDTO {
    name: string,
    email: string,
    birthDate: Date,
    hobbies: string[]
}

interface student {
    studentId: string,
    name: string
}

export interface returnStudentsByHobbiesDTO {
    id: string,
    hobbyName: string,
    students: student[]
}

export interface updateStudentClassDTO {
    studentId: string,
    classId: string
}