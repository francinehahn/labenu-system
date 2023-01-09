import { Request, Response } from "express"
import { ClassDatabase } from "../database/ClassDatabase"

export const createClass = async (req: Request, res: Response)=>{
    let errorCode = 400
    let name = req.body.name
    const id = Date.now().toString()
    const module = "0"

    try {

        if(!name){
            errorCode = 422
            throw new Error("Provide the class name.")            
        }

        let classDB = new ClassDatabase()

        let allClass = await classDB.searchFor("name", "like", name)

        if (allClass.length > 0){
            errorCode = 400 
            throw new Error("This class name already exists.")
        }

        await classDB.createClass({id, name, module})

        res.status(201).send("Success! The class has been registered.")

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}