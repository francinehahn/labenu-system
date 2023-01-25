import { CustomError } from "./CustomError"

export class MissingClassId extends CustomError {
    constructor () {
        super(422, "Provide the class ID.")
    }
}

export class ClassIdNotFound extends CustomError {
    constructor () {
        super(404, "This class id does not exist.")
    }
}

export class MissingClassName extends CustomError {
    constructor () {
        super(422, "Provide the class name.")
    }
}

export class DuplicateClassName extends CustomError {
    constructor () {
        super(422, "This class name already exists.")
    }
}

export class MissingClassModule extends CustomError {
    constructor () {
        super(422, "Class module is required.")
    }
}

export class InvalidClassModuleType extends CustomError {
    constructor () {
        super(422, "The class module requires a string value.")
    }
}

export class InvalidClassModuleValue extends CustomError {
    constructor () {
        super(422, "This module does not exist. The possibles values are: 0, 1, 2, 3, 4, 5 e 6.")
    }
}

