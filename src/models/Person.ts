export default abstract class Person {
    constructor (
        protected id: string,
        protected name: string,
        protected email: string,
        protected birthDate: Date,
        protected classId: string,
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.birthDate = birthDate
        this.classId = classId
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
        return this.birthDate
    }

    public getClassId () {
        return this.classId
    }
}