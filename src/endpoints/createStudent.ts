import { Request, Response } from "express"
import Student from "../database/Student"
import { StudentsDatabase } from "../database/StudentsDatabase"
import { BaseDatabase } from "../database/BaseDatabase"

export const createStudent = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400

    try {
        const name = req.body.name;
        const email = req.body.email;
        const birth_date = req.body.birth_date;
        const hobbies:string[] = req.body.hobbies

        const studentDatabase = new StudentsDatabase()

        if (!name) {
            errorCode = 422
            throw new Error("Provide student's name.")
        }

        if (!email) {
            errorCode = 422
            throw new Error("Provide student's email.")
        }

        const searchEmail = await studentDatabase.searchFor("email", "like", email)
        
        if (searchEmail.length > 0) {
            errorCode = 404
            throw new Error("E-mail address already in use.")
        }

        if (!birth_date) {
            errorCode = 422
            throw new Error("Provide new student's birth date.")
        }

        const modifiedBirthDate = birth_date.split("/").reverse().join("-")

        if (hobbies.length === 0) {
            errorCode = 422
            throw new Error("Provide at least one hobby.")        
        }

        const student = new Student (
            Date.now().toString(),
            name,
            email,
            modifiedBirthDate,
            "0000000000000",
        )

        await studentDatabase.create(student)

        const getHobbies = await BaseDatabase.connection("LabeSystem_Hobbies").select()

        for (let i = 0; i < hobbies.length; i++) {
            const findHobby = getHobbies.find(hobby => hobby.hobby_name.toLowerCase() === hobbies[i].toLowerCase())
            if (!findHobby) {
                const newHobby = {
                    "id": Date.now().toString(),
                    "hobby_name": hobbies[i]
                }

                await BaseDatabase.connection("LabeSystem_Hobbies").insert(newHobby)

                await BaseDatabase.connection("LabeSystem_Students_Hobbies").insert({
                    "id": Date.now().toString(), 
                    "student_id": student.getId(),
                    "hobby_id": newHobby.id
                })

            } else {
                await BaseDatabase.connection("LabeSystem_Students_Hobbies").insert({
                    "id": Date.now().toString(), 
                    "student_id": student.getId(),
                    "hobby_id": findHobby.id
                })
            }
        }

        res.status(201).send("Success! The student has been registered.")

    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}