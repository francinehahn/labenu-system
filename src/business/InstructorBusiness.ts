import { ClassDatabase } from "../database/ClassDatabase"
import InstructorDatabase from "../database/InstructorDatabase"
import { createInstructorDTO } from "../models/createInstructorDTO"
import Instructor from "../models/Instructor"
import { updateInstructorClassDTO } from "../models/updateInstructorClassDTO"
import { generateId } from "../services/generateId"
import { CustomError } from "../error/CustomError"
import { DuplicateEmail, InvalidExpertise, MissingBirthDate, MissingExpertise, MissingUserEmail, MissingUserId, MissingUserName, NoInstructorsFound, UserIdNotFound } from "../error/UserErrors"
import { ClassIdNotFound, MissingClassId } from "../error/ClassErrors"


export class InstructorBusiness {
    createInstructor = async (input: createInstructorDTO): Promise<void> => {
        try {
            if (!input.name) {
                throw new MissingUserName()
            } else if (!input.email) {
                throw new MissingUserEmail()
            } else if (!input.birthDate) {
                throw new MissingBirthDate()
            } else if (!input.expertise) {
                throw new MissingExpertise()
            }
    
            input.birthDate = new Date(input.birthDate.toString().split("/").reverse().join(","))
            
            const instructorDatabase = new InstructorDatabase()
            const checkEmail = await instructorDatabase.getInstructorByEmail(input.email)
        
            if (checkEmail.length > 0) {
                throw new DuplicateEmail()
            }

            const id = generateId()
            const classId = '0000000000000'

            const newInstructor = new Instructor(id, input.name, input.email, input.birthDate, classId, input.expertise)
            await instructorDatabase.createInstructor(newInstructor)

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

            const instructorDatabase = new InstructorDatabase()
            const instructorIdExists = await instructorDatabase.getInstructorById(input.instructorId)
     
            if (instructorIdExists.length === 0) {
                throw new UserIdNotFound()
            }

            const classDatabase = new ClassDatabase()
            const allClasses = await classDatabase.getAllClasses()
            const classIdExists = allClasses.filter(item => item.id.toString() === input.classId)

            if (classIdExists.length === 0) {
                throw new ClassIdNotFound()
            }

            await instructorDatabase.updateInstructorClass(input)

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

            const instructorDatabase = new InstructorDatabase()
            const result = await instructorDatabase.getAllInstructors(expertise)
            
            if (result.length === 0) {
                throw new NoInstructorsFound()
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}