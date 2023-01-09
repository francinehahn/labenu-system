export default abstract class Person {
    constructor (
        protected id: string,
        protected name: string,
        protected email: string,
        protected birth_date: Date,
        protected class_id: string,
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.birth_date = birth_date
        this.class_id = class_id
    }

    public getId () {
        return this.id
    }

    public getName () {
        return this.name
    }

    public getEmail () {
        return this.email
    }

    public getBirthDate () {
        return this.birth_date
    }

    public getClassId () {
        return this.class_id
    }
}