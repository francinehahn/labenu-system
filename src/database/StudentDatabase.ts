import { BaseDatabase } from "./BaseDatabase"
import Student from "../models/Student"
import { generateId } from "../services/generateId"
import { updateStudentClassDTO } from "../models/updateStudentClassDTO"
import { returnStudentsByHobbiesDTO } from "../models/returnStudentsByHobbiesDTO"
import { CustomError } from "../error/CustomError"
import { UserIdNotFound } from "../error/UserErrors"
import { ClassIdNotFound } from "../error/ClassErrors"


export class StudentDatabase extends BaseDatabase {
    TABLE_NAME = "LabeSystem_Students"

    createStudent = async (newStudent: Student): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert({
                id: newStudent.getId(),
                name: newStudent.getName(),
                email: newStudent.getEmail(),
                birth_date: newStudent.getBirthDate(),
                class_id: newStudent.getClassId()
            })

            const getHobbies = await BaseDatabase.connection("LabeSystem_Hobbies").select()

            for (let i = 0; i < newStudent.getHobbies().length; i++) {
                const findHobby = getHobbies.find(hobby => hobby.hobby_name.toLowerCase() === newStudent.getHobbies()[i].toLowerCase())
                
                let hobbyId
                if (!findHobby) {
                    const newHobby = {
                        id: Date.now().toString(),
                        hobby_name: newStudent.getHobbies()[i]
                    }

                    await BaseDatabase.connection("LabeSystem_Hobbies").insert(newHobby)
                    hobbyId = newHobby.id
                } else {
                    hobbyId = findHobby.id
                }

                await BaseDatabase.connection("LabeSystem_Students_Hobbies").insert({
                    id: generateId(),
                    student_id: newStudent.getId(),
                    hobby_id: hobbyId
                })
            }

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
     

    updateStudentClass = async (input: updateStudentClassDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).where("id", input.studentId).update("class_id", input.classId)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllStudents = async (search: string): Promise<Student[]> => {
        try {
            let students = await BaseDatabase.connection(this.TABLE_NAME).select().where("name", "like", `%${search}%`)

            for (let i = 0; i < students.length; i++) {
                const className = await BaseDatabase.connection.select("LabeSystem_Class.name")
                .from("LabeSystem_Class")
                .where("id", students[i].class_id)

                students[i].class_name = className[0].name

                const hobbies = await BaseDatabase.connection.select("LabeSystem_Hobbies.hobby_name")
                .from("LabeSystem_Students_Hobbies")
                .join("LabeSystem_Hobbies", "LabeSystem_Hobbies.id", "=", "LabeSystem_Students_Hobbies.hobby_id")
                .where('student_id', students[i].id)

                let studentHobbies: string[] = []

                for (let y = 0; y < hobbies.length; y++) {
                    studentHobbies.push(hobbies[y].hobby_name)
                }

                students[i].hobbies = studentHobbies
            }
    
            return students

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    
    getStudentsByHobbies = async (hobby: string): Promise<returnStudentsByHobbiesDTO> => {
        try {
            const searchHobby = await this.searchHobby(hobby)

            for (let i = 0; i < searchHobby.length; i++) {
                const searchStudents = await BaseDatabase.connection.select("LabeSystem_Students_Hobbies.student_id", "LabeSystem_Students.name")
                .from("LabeSystem_Students_Hobbies")
                .where('hobby_id', `${searchHobby[i].id}`)
                .join("LabeSystem_Students", "LabeSystem_Students_Hobbies.student_id", "=", "LabeSystem_Students.id")

                searchHobby[i].students = searchStudents
            }
            
            return searchHobby

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    searchHobby = async (hobby: string): Promise<any> => {
        try {
            const result = BaseDatabase.connection("LabeSystem_Hobbies")
            .select()
            .where('hobby_name', 'like', `%${hobby}%`)

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getStudentByEmail = async (email: string): Promise<any> => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).where("email", email)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getStudentById = async (id: string): Promise<any> => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).where("id", id)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}
