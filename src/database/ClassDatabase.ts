import {Class} from "../models/Class"
import {returnClassesDTO} from "../models/Class"
import { updateClassModuleDTO } from "../models/Class"
import { BaseDatabase } from "./BaseDatabase"
import { CustomError } from "../error/CustomError"
import { ClassRepository } from "../business/ClassRepository"


export class ClassDatabase extends BaseDatabase implements ClassRepository {
    TABLE_NAME = "LabeSystem_Class"  

    createClass = async (newClass: Class): Promise<void> => {
        try {    
            await BaseDatabase.connection(this.TABLE_NAME).insert(newClass)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllClasses = async (): Promise<returnClassesDTO[]> => {
        try {
            const allClasses = await BaseDatabase.connection(this.TABLE_NAME).select()
            let result: returnClassesDTO[] = []
            
            for (let className of allClasses) {
                const allInstructors = await BaseDatabase.connection("LabeSystem_Instructors")
                .select("id", "name").where("class_id", className.id)

                const allStudents = await BaseDatabase.connection("LabeSystem_Students")
                .select("id", "name").where("class_id", className.id)
 
                result.push({id: className.id, name: className.name, allInstructors, allStudents, module: className.module})
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    updateClassModule = async (input: updateClassModuleDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).where("id", input.classId).update("module", input.newModule)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }   

    getClassById = async (id: string): Promise<any> => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).where("id", id)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}