import { BaseDatabase } from "./BaseDatabase"
import Student from "../models/Student"


export class StudentDatabase extends BaseDatabase {
    TABLE_NAME = "LabeSystem_Students"

    createStudent = async (id: string, name: string, email: string, birthDate: Date, classId: string, hobbies: string[]) => {
        try {
            const searchEmail = await BaseDatabase.connection(this.TABLE_NAME).select().where("email", email)
        
            if (searchEmail.length > 0) {
                throw new Error("E-mail address already in use.")
            }

            const newStudent = new Student (id, name, email, birthDate, classId, hobbies)

            await BaseDatabase.connection(this.TABLE_NAME).insert({
                id: newStudent.getId(),
                name: newStudent.getName(),
                email: newStudent.getEmail(),
                birth_date: newStudent.getBirthDate(),
                class_id: newStudent.getClassId()
            })

            const getHobbies = await BaseDatabase.connection("LabeSystem_Hobbies").select()

            for (let i = 0; i < hobbies.length; i++) {
                const findHobby = getHobbies.find(hobby => hobby.hobby_name.toLowerCase() === hobbies[i].toLowerCase())
                
                let hobbyId
                if (!findHobby) {
                    const newHobby = {
                        id: Date.now().toString(),
                        hobby_name: hobbies[i]
                    }

                    await BaseDatabase.connection("LabeSystem_Hobbies").insert(newHobby)
                    hobbyId = newHobby.id
                } else {
                    hobbyId = findHobby.id
                }

                await BaseDatabase.connection("LabeSystem_Students_Hobbies").insert({
                    id: Date.now().toString(), 
                    student_id: newStudent.getId(),
                    hobby_id: hobbyId
                })
            }

        } catch (err: any) {
            throw new Error(err.message)
        }
    }
     
    updateStudentClass = async (studentId: string, classId: string) => {
        try {
            const studentsList = await BaseDatabase.connection(this.TABLE_NAME).select()
            const findStudent = studentsList.find(student => student.id === studentId)
    
            if (!findStudent) {
                throw new Error("Student's ID not found.")
            }

            const classesList = await BaseDatabase.connection("LabeSystem_Class").select()
            const findClass = classesList.find(classes => classes.id === classId)

            if (!findClass) {
                throw new Error("Class ID not found.")
            }

            await BaseDatabase.connection(this.TABLE_NAME).where("id", studentId).update("class_id", classId)

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getAllStudents = async (search: string) => {
        try {
            let students = await BaseDatabase.connection(this.TABLE_NAME).select().where("name", "like", `%${search}%`)
            
            if (students.length < 1) {
                throw new Error("No students found with the given search parameter.")
            }

            for (let i = 0; i < students.length; i++) {
                const className = await BaseDatabase.connection.select("LabeSystem_Class.name")
                .from("LabeSystem_Class")
                .where("id", students[i].class_id)

                students[i].class_name = className[0].name

                const hobbies = await BaseDatabase.connection.select("LabeSystem_Hobbies.hobby_name")
                .from("LabeSystem_Students_Hobbies")
                .join("LabeSystem_Hobbies", "LabeSystem_Hobbies.id", "=", "LabeSystem_Students_Hobbies.hobby_id")
                .where('student_id', students[i].id)

                let studentHobbies = []

                for (let y = 0; y < hobbies.length; y++) {
                    studentHobbies.push(hobbies[y].hobby_name)
                }

                students[i].hobbies = studentHobbies
            }
    
            return students

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getStudentsByHobbies = async (hobby: string) => {
        try {
            let searchHobby = await BaseDatabase.connection("LabeSystem_Hobbies")
            .select()
            .where('hobby_name', 'like', `%${hobby}%`)

            if (searchHobby.length === 0) {
                throw new Error("No hobbies were found with the given search parameter.")
            }

            for (let i = 0; i < searchHobby.length; i++) {
                const searchStudents = await BaseDatabase.connection.select("LabeSystem_Students_Hobbies.student_id", "LabeSystem_Students.name")
                .from("LabeSystem_Students_Hobbies")
                .where('hobby_id', `${searchHobby[i].id}`)
                .join("LabeSystem_Students", "LabeSystem_Students_Hobbies.student_id", "=", "LabeSystem_Students.id")

                searchHobby[i].students = searchStudents
            }
            
            return searchHobby

        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}
