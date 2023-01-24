import { StudentDatabase } from "../database/StudentDatabase"



export class StudentBusiness {
    createStudent = async (name: string, email: string, birthDate: string, hobbies: string[]) => {
        if (!name) {
            throw new Error("Provide the student's name.")
        }

        if (!email) {
            throw new Error("Provide the student's email.")
        }

        if (!birthDate) {
            throw new Error("Provide new student's birth date.")
        }

        const modifiedBirthDate = new Date(birthDate.toString().split("/").reverse().join("-"))

        if (hobbies.length === 0) {
            throw new Error("Provide at least one hobby.")
        }

        const id = Date.now().toString()
        const classId = "0000000000000"

        const studentDatabase = new StudentDatabase()
        await studentDatabase.createStudent(id, name, email, modifiedBirthDate, classId, hobbies)
    }

    updateStudentClass = async (studentId: string, classId: string) => {
        try {
            if (!studentId) {
                throw new Error("Provide student's ID.")
            }
    
            if (!classId) {
                throw new Error("Provide the new class ID.")
            }

            const studentDatabase = new StudentDatabase()
            await studentDatabase.updateStudentClass(studentId, classId)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getAllStudents = async (search: string) => {
        try {
            if (!search) {
                search = "%"
            }

            const studentDatabase = new StudentDatabase()
            return await studentDatabase.getAllStudents(search)

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getStudentsByHobbies = async (hobby: string) => {
        try {
            if (!hobby) {
                hobby = "%"
            }

            const studentDatabase = new StudentDatabase()
            return await studentDatabase.getStudentsByHobbies(hobby)

        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}