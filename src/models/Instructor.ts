import Person from "./Person"

export default class Instructor extends Person {
    constructor (
        id: string,
        name: string,
        email: string,
        birth_date: Date,
        class_id: string,
        private expertise: string[]
    ) {
        super (id, name, email, birth_date, class_id)
        this.expertise = expertise
    }

    public getExpertise () {
        return this.expertise
    }
}