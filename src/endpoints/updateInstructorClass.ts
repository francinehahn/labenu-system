import { Request, Response } from "express"
import InstructorDatabase from "../database/InstructorDatabase"


export async function updateInstructorClass (req: Request, res: Response) {
    let errorCode = 400

    try {
        const instructor_id = req.params.instructor_id
        const class_id = req.body.class_id

        if (instructor_id === ":instructor_id") {
            errorCode = 422
            throw new Error("Provide the instructor id.")
        }

        if (!class_id) {
            errorCode = 422
            throw new Error("Provide the class id.")
        }

        const instructorDB = new InstructorDatabase()

        const instructorIdExists = await instructorDB.searchFor("id", "like", instructor_id)
        if (instructorIdExists.length === 0) {
            errorCode = 404
            throw new Error("This instructor id does not exist.")
        }

        const classIdExists = await instructorDB.searchFor("class_id", "like", class_id)
        if (classIdExists.length === 0) {
            errorCode = 422
            throw new Error("This class id does not exist.")
        }

        await instructorDB.updateInfo(instructor_id, "class_id", class_id)

        res.status(201).send("Success! The class id has been updated.")

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}