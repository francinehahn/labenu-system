import express from 'express'
import { StudentController } from '../controller/StudentController'


export const studentRouter = express.Router()
const studentController = new StudentController()

//Search Students
studentRouter.get("/", studentController.getAllStudents)

//Create Student
studentRouter.post("/", studentController.createStudent)

//Update Student's Class
studentRouter.patch("/:studentId", studentController.updateStudentClass)

//Get Students By Hobbies
studentRouter.get("/hobbies", studentController.getStudentsByHobbies)