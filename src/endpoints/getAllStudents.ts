import { Request, Response } from "express"
import { StudentsDatabase } from "../database/StudentsDatabase"
import { BaseDatabase } from "../database/BaseDatabase"


export async function getAllStudents (req: Request, res: Response) {
    let errorCode = 400

    try {
        let search = req.query.search as string

        const studentDatabase = new StudentsDatabase()

        if (!search) {
            search = "%"
        }

        let students = await studentDatabase.searchFor("name", "like", `%${search}%`)

        for (let i = 0; i < students.length; i++) {
            const className = await BaseDatabase.connection.select("LabeSystem_Class.name")
            .from("LabeSystem_Class")
            .where("id", students[i].class_id)

            students[i].class = className[0].name

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

        if (students.length < 1) {
            errorCode = 404
            throw new Error("No students found with the given search parameter.")
        }
        
        res.status(200).send(students)

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}