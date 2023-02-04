import { Request, Response } from "express"
import { InstructorBusiness } from "../business/InstructorBusiness"
import { inputInstructorDTO, updateInstructorClassDTO } from "../models/Instructor"


export class InstructorController {
    constructor (private instructorBusiness: InstructorBusiness) {}

    createInstructor = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputInstructorDTO = {
                name: req.body.name,
                email: req.body.email,
                birthDate: req.body.birthDate,
                expertise: req.body.expertise
            }

            await this.instructorBusiness.createInstructor(input)
            
            res.status(201).send("Success! The instructor has been registered.")

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    updateInstructorClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: updateInstructorClassDTO = {
                instructorId: req.params.instructorId,
                classId: req.body.classId
            }

            await this.instructorBusiness.updateInstructorClass(input)

            res.status(201).send("Success! The instructor's class has been updated.")

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getAllInstructors = async (req: Request, res: Response): Promise<void> => {
        try {
            const expertise = req.query.expertise as string
            const instructors = await this.instructorBusiness.getAllInstructors(expertise)

            res.status(200).send(instructors)

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}