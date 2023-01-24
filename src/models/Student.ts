import Person from "./Person"

export default class Student extends Person {
    constructor (
        id: string,
        name: string,
        email: string,
        birthDate: Date,
        classId: string,
        private hobbies: string[]
    ) {
        super (id, name, email, birthDate, classId)
        this.hobbies = hobbies
    }

    public getHobbies(): string[] {
        return this.hobbies
    }
}