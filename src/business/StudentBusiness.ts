import { StudentDatabase } from "../database/StudentDatabase"
import { Student, createStudentDTO, returnStudentsByHobbiesDTO, updateStudentClassDTO } from "../models/Student"
import { generateId } from "../services/generateId"
import { CustomError } from "../error/CustomError"
import { DuplicateEmail, MissingBirthDate, MissingHobbies, MissingUserEmail, MissingUserId, MissingUserName, NoHobbiesFound, NoStudentsFound, UserIdNotFound } from "../error/UserErrors"
import { ClassIdNotFound, MissingClassId } from "../error/ClassErrors"
import { ClassDatabase } from "../database/ClassDatabase"


export class StudentBusiness {
    createStudent = async (input: createStudentDTO): Promise<void> => {
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
    
            const studentDatabase = new StudentDatabase()
            const searchEmail = await studentDatabase.getStudentByEmail(input.email)
    
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
            await studentDatabase.createStudent(newStudent)

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

            const studentDatabase = new StudentDatabase()

            const studentIdExists = await studentDatabase.getStudentById(input.studentId)
    
            if (studentIdExists.length === 0) {
                throw new UserIdNotFound()
            }

            const classDatabase = new ClassDatabase()
            const classIdExists = await classDatabase.getClassById(input.classId)

            if (classIdExists.length === 0) {
                throw new ClassIdNotFound()
            }
            await studentDatabase.updateStudentClass(input)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllStudents = async (search: string): Promise<Student[]> => {
        try {
            if (!search) {
                search = "%"
            }

            const studentDatabase = new StudentDatabase()
            const students = await studentDatabase.getAllStudents(search)
            
            if (students.length < 1) {
                throw new NoStudentsFound()
            }

            return await studentDatabase.getAllStudents(search)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getStudentsByHobbies = async (hobby: string): Promise<returnStudentsByHobbiesDTO> => {
        try {
            if (!hobby) {
                hobby = "%"
            }

            const studentDatabase = new StudentDatabase()

            let searchHobby = await studentDatabase.searchHobby(hobby)

            if (searchHobby.length === 0) {
                throw new NoHobbiesFound()
            }

            return await studentDatabase.getStudentsByHobbies(hobby)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}