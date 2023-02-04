import express from 'express'
import { InstructorBusiness } from '../business/InstructorBusiness'
import { InstructorController } from '../controller/InstructorController'
import { ClassDatabase } from '../database/ClassDatabase'
import InstructorDatabase from '../database/InstructorDatabase'

export const instructorRouter = express.Router()
const classDatabase = new ClassDatabase()
const instructorDatabase = new InstructorDatabase()
const instructorBusiness = new InstructorBusiness(instructorDatabase, classDatabase)
const instructorController = new InstructorController(instructorBusiness)

//Get All Instructors
instructorRouter.get("/", instructorController.getAllInstructors)

//Create Instructor
instructorRouter.post("/", instructorController.createInstructor)

//Update Instructor's Class
instructorRouter.patch("/:instructorId", instructorController.updateInstructorClass)