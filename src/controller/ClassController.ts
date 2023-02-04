import { Request, Response } from "express"
import { ClassBusiness } from "../business/ClassBusiness"
import { updateClassModuleDTO } from "../models/Class"


export class ClassController {
    constructor (private classBusiness: ClassBusiness) {}

    createClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const name: string = req.body.name
            
            await this.classBusiness.createClass(name)
            
            res.status(201).send("Success! The class has been registered.")

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getAllClasses = async (req: Request, res: Response): Promise<void> => {
        try {
            const allClasses = await this.classBusiness.getAllClasses()
            res.status(200).send(allClasses)
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    updateClassModule = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: updateClassModuleDTO = {
                classId: req.params.classId,
                newModule: req.body.newModule
            }
    
            await this.classBusiness.updateClassModule(input)
    
            res.status(200).send("Success! Class module has been updated.")
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}