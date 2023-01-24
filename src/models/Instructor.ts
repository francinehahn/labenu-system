import Person from "./Person"

export default class Instructor extends Person {
    constructor (
        id: string,
        name: string,
        email: string,
        birthDate: Date,
        classId: string,
        private expertise: string[]
    ) {
        super (id, name, email, birthDate, classId)
        this.expertise = expertise
    }

    public getExpertise () {
        return this.expertise
    }
}