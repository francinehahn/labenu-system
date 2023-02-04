import { Request, Response } from "express"
import { InstructorBusiness } from "../business/InstructorBusiness"
import { createInstructorDTO, updateInstructorClassDTO } from "../models/Instructor"


export class InstructorController {

    createInstructor = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: createInstructorDTO = {
                name: req.body.name,
                email: req.body.email,
                birthDate: req.body.birthDate,
                expertise: req.body.expertise
            }

            const instructorBusiness = new InstructorBusiness()
            await instructorBusiness.createInstructor(input)
            
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

            const instructorBusiness = new InstructorBusiness()
            await instructorBusiness.updateInstructorClass(input)

            res.status(201).send("Success! The instructor's class id has been updated.")

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getAllInstructors = async (req: Request, res: Response): Promise<void> => {
        try {
            const expertise = req.query.expertise as string

            const instructorBusiness = new InstructorBusiness()
            const instructors = await instructorBusiness.getAllInstructors(expertise)

            res.status(200).send(instructors)

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}