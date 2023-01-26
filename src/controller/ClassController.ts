import { Request, Response } from "express"
import { ClassBusiness } from "../business/ClassBusiness"
import { updateClassModuleDTO } from "../models/updateClassModuleDTO"


export class ClassController {
    
    createClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const name: string = req.body.name
            
            const classBusiness = new ClassBusiness()
            await classBusiness.createClass(name)
            
            res.status(201).send("Success! The class has been registered.")

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getAllClasses = async (req: Request, res: Response): Promise<void> => {
        try {
            const classBusiness = new ClassBusiness()
            const allClasses = await classBusiness.getAllClasses()
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
    
            const classBusiness = new ClassBusiness()
            await classBusiness.updateClassModule(input)
    
            res.status(200).send("Success! Class module has been updated.")
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}