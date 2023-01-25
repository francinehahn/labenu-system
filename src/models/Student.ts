import Person from "./Person"

export default class Student extends Person {
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