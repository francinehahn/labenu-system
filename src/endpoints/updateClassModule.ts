import { Request, Response } from "express"
import { ClassDatabase } from "../database/ClassDatabase"

export const updateClassModule = async (req: Request, res: Response) =>{
    let errorCode = 400
    let idClass = req.params.id_class as string
    let {newModule} = req.body

    try {        
        if(idClass === ":id_class"){
            errorCode = 422
            throw new Error("Class id is required to continue.")
        } if(!newModule){
            errorCode = 422
            throw new Error("Class module is required to continue.")            
        } if(idClass && newModule && typeof(newModule) !== "string"){
            errorCode = 422
            throw new Error("The class module requires string value.")            
        } if(newModule !== "0" &&
            newModule !== "1" &&
            newModule !== "2" &&
            newModule !== "3" &&
            newModule !== "4" &&
            newModule !== "5" &&
            newModule !== "6"
        ){
            errorCode = 422
            throw new Error(`Module ${newModule} does not exist. The possibles modules are: 0, 1, 2, 3, 4, 5 e 6.`)            
        }
        
        const classDB = new ClassDatabase()

        const idClassExisting = await classDB.searchFor("id", "like", idClass)

        if(idClassExisting.length < 1){
            errorCode = 422
            throw new Error("This class does not exist.")    
        }

        classDB.updateModule(idClass, "module", newModule)

        res.status(200).send("Success! Class module has been updated.")
        
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}