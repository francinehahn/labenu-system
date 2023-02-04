import { Instructor, inputInstructorDTO, updateInstructorClassDTO } from "../models/Instructor"
import { generateId } from "../services/generateId"
import { CustomError } from "../error/CustomError"
import { DuplicateEmail, InvalidExpertise, MissingBirthDate, MissingExpertise, MissingUserEmail, MissingUserId, MissingUserName, NoInstructorsFound, UserIdNotFound } from "../error/UserErrors"
import { ClassIdNotFound, MissingClassId } from "../error/ClassErrors"
import { InstructorRepository } from "./InstructorRepository"
import { ClassRepository } from "./ClassRepository"


export class InstructorBusiness {
    constructor (private instructorDatabase: InstructorRepository, private classDatabase: ClassRepository) {}

    createInstructor = async (input: inputInstructorDTO): Promise<void> => {
        try {
            if (!input.name) {
                throw new MissingUserName()
            }
            if (!input.email) {
                throw new MissingUserEmail()
            }
            if (!input.birthDate) {
                throw new MissingBirthDate()
            }
            if (!input.expertise) {
                throw new MissingExpertise()
            }
    
            input.birthDate = new Date(input.birthDate.toString().split("/").reverse().join(","))
            
            const checkEmail = await this.instructorDatabase.getInstructor("email", input.email)
        
            if (checkEmail.length > 0) {
                throw new DuplicateEmail()
            }

            const id = generateId()
            const classId = '0000000000000'

            const newInstructor = new Instructor(id, input.name, input.email, input.birthDate, classId, input.expertise)
            await this.instructorDatabase.createInstructor(newInstructor)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    updateInstructorClass = async (input: updateInstructorClassDTO): Promise<void> => {
        try {
            if (!input.instructorId) {
                throw new MissingUserId()
            }
    
            if (!input.classId) {
                throw new MissingClassId()
            }

            const instructorIdExists = await this.instructorDatabase.getInstructor("id", input.instructorId)
     
            if (instructorIdExists.length === 0) {
                throw new UserIdNotFound()
            }

            const allClasses = await this.classDatabase.getAllClasses()
            const classIdExists = allClasses.filter(item => item.id.toString() === input.classId)

            if (classIdExists.length === 0) {
                throw new ClassIdNotFound()
            }

            await this.instructorDatabase.updateInstructorClass(input)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllInstructors = async (expertise: string): Promise<Instructor[]> => {
        try {
            if (expertise && expertise !== "Typescript" && expertise !== "Programação Orientada a Objetos" && expertise !== "React" && expertise !== "Redux" && expertise !== "Backend" && expertise !== "Testes Unitários") {
                throw new InvalidExpertise()
            }

            if (!expertise) {
                expertise = "%"
            }

            const result = await this.instructorDatabase.getAllInstructors(expertise)
            
            if (result.length === 0) {
                throw new NoInstructorsFound()
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}