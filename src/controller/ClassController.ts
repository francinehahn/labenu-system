import { Request, Response } from "express"
import { ClassBusiness } from "../business/ClassBusiness"


export class ClassController {
    
    createClass = async (req: Request, res: Response): Promise<void> => {
        let errorCode = 400

        try {
            const name = req.body.name
            
            const classBusiness = new ClassBusiness()
            await classBusiness.createClass(name)
            
            res.status(201).send("Success! The class has been registered.")

        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }

    getAllClasses = async (req: Request, res: Response): Promise<void> => {
        let errorCode = 400

        try {
            const classBusiness = new ClassBusiness()
            const allClasses = await classBusiness.getAllClasses()
            res.status(200).send(allClasses)
            
        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }

    updateClassModule = async (req: Request, res: Response): Promise<void> => {
        let errorCode = 400
    
        try {
            let classId = req.params.classId as string
            let newModule = req.body.newModule
    
            const classBusiness = new ClassBusiness()
            await classBusiness.updateClassModule(classId, newModule)
    
            res.status(200).send("Success! Class module has been updated.")
            
        } catch (err: any) {
            res.status(errorCode).send(err.message)
        }
    }
}