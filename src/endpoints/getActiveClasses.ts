import { Request, Response } from "express"
import { BaseDatabase } from "../database/BaseDatabase"
import Class from "../database/Class"
import { ClassDatabase } from "../database/ClassDatabase"

export const getActiveClasses = async (req: Request, res: Response) =>{
    let errorCode = 400
    let allClass = []

    try {
        let classDB = new ClassDatabase()
        
        let result = await classDB.getAllClass("module", "not like", "0")

        for(let iten of result){

            let allIntructors = await BaseDatabase.connection("LabeSystem_Instructors").select("id").whereLike("class_id", iten.id)
            let allStudents = await BaseDatabase.connection("LabeSystem_Students").select("id").whereLike("class_id", iten.id)

            const updateClass = new Class(
                iten.id,
                iten.name,
                allIntructors,
                allStudents,
                iten.module
            )

            allClass.push(updateClass)
        }

        res.status(200).send(allClass)
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}