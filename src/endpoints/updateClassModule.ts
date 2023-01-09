import { Request, Response } from "express"
import { ClassDatabase } from "../database/ClassDatabase"


export async function updateClassModule (req: Request, res: Response) {
    let errorCode = 400

    try {
        let classId = req.params.class_id as string
        let {newModule} = req.body

        if (classId === ":class_id") {
            errorCode = 422
            throw new Error("Class id is required.")
        }
        if (!newModule) {
            errorCode = 422
            throw new Error("Class module is required.")            
        }
        if (classId && newModule && typeof(newModule) !== "string") {
            errorCode = 422
            throw new Error("The class module requires a string value.")            
        }
        if (newModule !== "0" &&
            newModule !== "1" &&
            newModule !== "2" &&
            newModule !== "3" &&
            newModule !== "4" &&
            newModule !== "5" &&
            newModule !== "6"
        ) {
            errorCode = 422
            throw new Error(`Module ${newModule} does not exist. The possibles modules are: 0, 1, 2, 3, 4, 5 e 6.`)            
        }
        
        const classDB = new ClassDatabase()

        const idClassExisting = await classDB.searchFor("id", "like", classId)

        if (idClassExisting.length === 0) {
            errorCode = 422
            throw new Error("This class does not exist.")    
        }

        classDB.updateModule(classId, "module", newModule)

        res.status(200).send("Success! Class module has been updated.")
        
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}