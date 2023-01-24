import express from 'express'
import { InstructorController } from '../controller/InstructorController'

export const instructorRouter = express.Router()
const instructorController = new InstructorController()

//Get All Instructors
instructorRouter.get("/", instructorController.getAllInstructors)

//Create Instructor
instructorRouter.post("/", instructorController.createInstructor)

//Update Instructor's Class
instructorRouter.patch("/:instructorId", instructorController.updateInstructorClass)