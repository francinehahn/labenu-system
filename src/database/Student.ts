import Person from "./Person"

export type TStudent = {
    id: string,
    name: string,
    email: string,
    birth_date: Date,
    class_id: string,
    class: string,
    hobbies: string[]
}

export default class Student extends Person {
    constructor (id: string, name: string, email: string, birth_date: Date, class_id: string) {
        super (id, name, email, birth_date, class_id)
    }

}