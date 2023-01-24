import express from 'express'
import { ClassController } from '../controller/ClassController'

export const classRouter = express.Router()
const classController = new ClassController()

//Get All Classes
classRouter.get("/", classController.getAllClasses)

//Create Class
classRouter.post("/", classController.createClass)

//Update Class Module
classRouter.patch("/:classId", classController.updateClassModule)