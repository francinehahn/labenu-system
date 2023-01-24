import { Request, Response } from "express";
import { InstructorBusiness } from "../business/InstructorBusiness";
import InstructorDatabase from "../database/InstructorDatabase";


export class InstructorController {
    createInstructor = async (req: Request, res: Response) => {
        let errorCode = 400

        try {
            const {name, email, birthDate, expertise} = req.body

            const instructorBusiness = new InstructorBusiness()
            await instructorBusiness.createInstructor(name, email, birthDate, expertise)
            
            res.status(201).send("Success! The instructor has been registered.")

        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }

    updateInstructorClass = async (req: Request, res: Response) => {
        let errorCode = 400

        try {
            const instructorId = req.params.instructorId
            const classId = req.body.classId

            const instructorBusiness = new InstructorBusiness()
            await instructorBusiness.updateInstructorClass(instructorId, classId)

            res.status(201).send("Success! The instructor's class id has been updated.")

        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }

    getAllInstructors = async (req: Request, res: Response) => {
        let errorCode = 400

        try {
            const expertise = req.query.expertise as string

            const instructorBusiness = new InstructorBusiness()
            const instructors = await instructorBusiness.getAllInstructors(expertise)

            res.status(200).send(instructors)

        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }
}