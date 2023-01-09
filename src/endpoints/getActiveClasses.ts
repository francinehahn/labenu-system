import { Request, Response } from "express"
import { BaseDatabase } from "../database/BaseDatabase"
import Class from "../database/Class"
import { ClassDatabase } from "../database/ClassDatabase"


export async function getActiveClasses (req: Request, res: Response) {
    let errorCode = 400

    try {
        let allClass = []
        let classDB = new ClassDatabase()
        
        let result = await classDB.getAllClass("module", "not like", "0")

        for (let item of result) {

            let allIntructors = await BaseDatabase.connection("LabeSystem_Instructors").select("id").whereLike("class_id", item.id)
            let allStudents = await BaseDatabase.connection("LabeSystem_Students").select("id").whereLike("class_id", item.id)

            const updateClass = new Class(
                item.id,
                item.name,
                allIntructors,
                allStudents,
                item.module
            )

            allClass.push(updateClass)
        }

        res.status(200).send(allClass)
        
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}