import express from 'express'
import { StudentBusiness } from '../business/StudentBusiness'
import { StudentController } from '../controller/StudentController'
import { ClassDatabase } from '../database/ClassDatabase'
import { StudentDatabase } from '../database/StudentDatabase'


export const studentRouter = express.Router()
const classDatabase = new ClassDatabase()
const studentDatabase = new StudentDatabase()
const studentBusiness = new StudentBusiness(studentDatabase, classDatabase)
const studentController = new StudentController(studentBusiness)

//Search Students
studentRouter.get("/", studentController.getAllStudents)

//Create Student
studentRouter.post("/", studentController.createStudent)

//Update Student's Class
studentRouter.patch("/:studentId", studentController.updateStudentClass)

//Get Students By Hobbies
studentRouter.get("/hobbies", studentController.getStudentsByHobbies)