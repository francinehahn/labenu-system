import { Student, inputStudentDTO, returnStudentsByHobbiesDTO, updateStudentClassDTO } from "../models/Student"
import { generateId } from "../services/generateId"
import { CustomError } from "../error/CustomError"
import { DuplicateEmail, MissingBirthDate, MissingHobbies, MissingUserEmail, MissingUserId, MissingUserName, NoHobbiesFound, NoStudentsFound, UserIdNotFound } from "../error/UserErrors"
import { ClassIdNotFound, MissingClassId } from "../error/ClassErrors"
import { StudentRepository } from "./StudentRepository"
import { ClassRepository } from "./ClassRepository"


export class StudentBusiness {
    constructor (private studentDatabase: StudentRepository, private classDatabase: ClassRepository) {}

    createStudent = async (input: inputStudentDTO): Promise<void> => {
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
    
            const searchEmail = await this.studentDatabase.getStudent("email", input.email)
    
            if (searchEmail.length > 0) {
                throw new DuplicateEmail()
            }
    
            const modifiedBirthDate = new Date(input.birthDate.toString().split("/").reverse().join(","))
    
            if (input.hobbies.length === 0) {
                throw new MissingHobbies()
            }
    
            const id = generateId()
            const classId = "0000000000000"
    
            const newStudent = new Student(id, input.name, input.email, modifiedBirthDate, classId, input.hobbies)
            await this.studentDatabase.createStudent(newStudent)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    updateStudentClass = async (input: updateStudentClassDTO): Promise<void> => {
        try {
            if (!input.studentId) {
                throw new MissingUserId()
            }
    
            if (!input.classId) {
                throw new MissingClassId()
            }

            const studentIdExists = await this.studentDatabase.getStudent("id", input.studentId)
            if (studentIdExists.length === 0) {
                throw new UserIdNotFound()
            }

            const classIdExists = await this.classDatabase.getClassById(input.classId)
            if (classIdExists.length === 0) {
                throw new ClassIdNotFound()
            }

            await this.studentDatabase.updateStudentClass(input)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllStudents = async (search: string): Promise<Student[]> => {
        try {
            if (!search) {
                search = "%"
            }

            const students = await this.studentDatabase.getAllStudents(search)
            if (students.length < 1) {
                throw new NoStudentsFound()
            }

            return await this.studentDatabase.getAllStudents(search)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getStudentsByHobbies = async (hobby: string): Promise<returnStudentsByHobbiesDTO> => {
        try {
            if (!hobby) {
                hobby = "%"
            }

            let searchHobby = await this.studentDatabase.searchHobby(hobby)
            if (searchHobby.length === 0) {
                throw new NoHobbiesFound()
            }

            return await this.studentDatabase.getStudentsByHobbies(hobby)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}