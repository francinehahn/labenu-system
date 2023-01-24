import { Request, Response } from "express"
import { StudentBusiness } from "../business/StudentBusiness"


export class StudentController {
    createStudent = async (req: Request, res: Response) => {
        let errorCode = 400
    
        try {
            const name = req.body.name
            const email = req.body.email
            const birthDate = req.body.birthDate
            const hobbies: string[] = req.body.hobbies
    
            const studentBusiness = new StudentBusiness()
            await studentBusiness.createStudent(name, email, birthDate, hobbies)
    
            res.status(201).send("Success! The student has been registered.")
    
        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }

    updateStudentClass = async (req: Request, res: Response) => {
        let errorCode = 400
    
        try {
            const studentId = req.params.studentId as string
            const classId = req.body.classId as string
    
            const studentBusiness = new StudentBusiness()
            await studentBusiness.updateStudentClass(studentId, classId)

            res.status(200).send("Success! Student's class has been updated.")

        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }

    getAllStudents = async (req: Request, res: Response) => {
        let errorCode = 400
    
        try {
            let search = req.query.search as string

            const studentBusiness = new StudentBusiness()
            const students = await studentBusiness.getAllStudents(search)

            res.status(200).send(students)

        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }

    getStudentsByHobbies = async (req: Request, res: Response) => {
        let errorCode = 400
    
        try {
            const hobby = req.query.hobby as string

            const studentBusiness = new StudentBusiness()
            const students = await studentBusiness.getStudentsByHobbies(hobby)
            res.status(200).send(students)

        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }
}