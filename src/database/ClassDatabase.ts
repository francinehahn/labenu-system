import Class from "../models/Class"
import { BaseDatabase } from "./BaseDatabase"


export class ClassDatabase extends BaseDatabase {
    TABLE_NAME = "LabeSystem_Class"  

    createClass = async (name: string, newClass: Class) => {
        try {
            const getClasses = await BaseDatabase.connection(this.TABLE_NAME).select().where("name", name)

            if (getClasses.length > 0) {
                throw new Error("This class name already exists.")
            }
    
            await BaseDatabase.connection(this.TABLE_NAME).insert(newClass)

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getAllClasses = async () => {
        try {
            const allClasses = await BaseDatabase.connection(this.TABLE_NAME).select()
            let result = []
            
            for (let className of allClasses) {
                const allIntructors = await BaseDatabase.connection("LabeSystem_Instructors").select("id", "name").where("class_id", className.id)
                const allStudents = await BaseDatabase.connection("LabeSystem_Students").select("id", "name").where("class_id", className.id)
 
                result.push({id: className.id, name: className.name, allIntructors, allStudents, module: className.module})
            }

            return result

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    updateClassModule = async (classId: string, newModule: string) => {
        try {
            const classIdExists = await BaseDatabase.connection(this.TABLE_NAME).select().where("id", classId)

            if (classIdExists.length === 0) {
                throw new Error("The class does not exist.")    
            }

            await BaseDatabase.connection(this.TABLE_NAME).where("id", classId).update("module", newModule)
        
        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}