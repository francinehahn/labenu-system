import express from 'express'
import { ClassBusiness } from '../business/ClassBusiness'
import { ClassController } from '../controller/ClassController'
import { ClassDatabase } from '../database/ClassDatabase'

export const classRouter = express.Router()
const classDatabase = new ClassDatabase()
const classBusiness = new ClassBusiness(classDatabase)
const classController = new ClassController(classBusiness)

//Get All Classes
classRouter.get("/", classController.getAllClasses)

//Create Class
classRouter.post("/", classController.createClass)

//Update Class Module
classRouter.patch("/:classId", classController.updateClassModule)