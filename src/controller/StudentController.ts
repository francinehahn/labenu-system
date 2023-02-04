import { Request, Response } from "express"
import { StudentBusiness } from "../business/StudentBusiness"
import { inputStudentDTO, updateStudentClassDTO } from "../models/Student"


export class StudentController {
    constructor (private studentBusiness: StudentBusiness) {}

    createStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputStudentDTO = {
                name: req.body.name,
                email: req.body.email,
                birthDate: req.body.birthDate,
                hobbies: req.body.hobbies
            }
    
            await this.studentBusiness.createStudent(input)
    
            res.status(201).send("Success! The student has been registered.")
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    updateStudentClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: updateStudentClassDTO = {
                studentId: req.params.studentId,
                classId: req.body.classId
            }
    
            await this.studentBusiness.updateStudentClass(input)

            res.status(200).send("Success! The student's class has been updated.")

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getAllStudents = async (req: Request, res: Response): Promise<void> => {
        try {
            const search = req.query.search as string

            const students = await this.studentBusiness.getAllStudents(search)
            res.status(200).send(students)

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getStudentsByHobbies = async (req: Request, res: Response): Promise<void> => {
        try {
            const hobby = req.query.hobby as string

            const students = await this.studentBusiness.getStudentsByHobbies(hobby)
            res.status(200).send(students)

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}