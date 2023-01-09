import { Request, Response } from "express"
import Instructor from "../database/Instructor"
import InstructorDatabase from "../database/InstructorDatabase"

export async function createInstructor (req: Request, res: Response) {
    let errorCode = 400
    
    try {
        const {name, email, birth_date, expertise} = req.body
        const id = Date.now().toString()
        const class_id = '0000000000000'

        if (!name) {
            errorCode = 422
            throw new Error("Provide the instructor name.")
        } else if (!email) {
            errorCode = 422
            throw new Error("Provide the instructor email.")
        } else if (!birth_date) {
            errorCode = 422
            throw new Error("Provide the instructor birth date in the following format: DD/MM/AAAA.")
        } else if (!expertise) {
            errorCode = 422
            throw new Error("Provide the expertise of the instructor.")
        }

        const birth_date_array = birth_date.split("/")
        const newBirthDate = new Date(`${birth_date_array[2]}, ${birth_date_array[1]}, ${birth_date_array[0]}`)
        
        const addInstructor = new InstructorDatabase()
        const checkEmail = await addInstructor.getByEmail(email)
        
        if (checkEmail.length > 0) {
            errorCode = 422
            throw new Error("This email has already been registered.")
        }

        const newInstructor = new Instructor(id, name, email, newBirthDate, class_id, expertise)

        await addInstructor.createInstructor(newInstructor.getId(), newInstructor.getName(), newInstructor.getEmail(), newInstructor.getBirthDate(), newInstructor.getClassId())
        await addInstructor.createExpertise(newInstructor.getId(), newInstructor.getExpertise())

        res.status(201).send("Success! The instructor has been registered.")

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}
