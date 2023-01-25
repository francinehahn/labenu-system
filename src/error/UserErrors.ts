import { CustomError } from "./CustomError"


export class MissingUserId extends CustomError {
    constructor () {
        super(422, "Provide the user id.")
    }
}

export class UserIdNotFound extends CustomError {
    constructor () {
        super(404, "User id not found.")
    }
}

export class MissingUserName extends CustomError {
    constructor () {
        super(422, "Provide the user name.")
    }
}

export class MissingUserEmail extends CustomError {
    constructor () {
        super(422, "Provide the user email.")
    }
}

export class DuplicateEmail extends CustomError {
    constructor () {
        super(422, "This email is already registered in the database.")
    }
}

export class MissingBirthDate extends CustomError {
    constructor () {
        super(422, "Provide the birth date.")
    }
}

export class MissingHobbies extends CustomError {
    constructor () {
        super(422, "Provide at least one hobby.")
    }
}

export class NoStudentsFound extends CustomError {
    constructor () {
        super(404, "No students found with the given search parameter.")
    }
}

export class NoInstructorsFound extends CustomError {
    constructor () {
        super(404, "No instructors found with the given search parameter.")
    }
}

export class NoHobbiesFound extends CustomError {
    constructor () {
        super(404, "No hobbies were found with the given search parameter.")
    }
}

export class MissingExpertise extends CustomError {
    constructor () {
        super(422, "Provide the expertise of the instructor.")
    }
}

export class InvalidExpertise extends CustomError {
    constructor () {
        super(422, "The possible expertise are: Typescript, Programação Orientada a Objetos, React, Redux, Backend, Testes Unitários.")
    }
}


