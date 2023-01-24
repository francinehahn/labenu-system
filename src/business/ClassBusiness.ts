import { ClassDatabase } from "../database/ClassDatabase"
import Class from "../models/Class"


export class ClassBusiness {
    createClass = async (name: string) => {
        try {
            const id = Date.now().toString()
            const module = "0"
    
            if (!name){
                throw new Error("Provide the class name.")            
            }
    
            const newClass = new Class(id, name, module)
            const classDatabase = new ClassDatabase()
            await classDatabase.createClass(name, newClass)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getAllClasses = async () => {
        try {
            const classDatabase = new ClassDatabase()
            return await classDatabase.getAllClasses()
        
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    updateClassModule = async (classId: string, newModule: string) => {
        try {
            if (!classId) {
                throw new Error("Class id is required.")
            }

            if (!newModule) {
                throw new Error("Class module is required.")            
            }

            if (classId && newModule && typeof(newModule) !== "string") {
                throw new Error("The class module requires a string value.")            
            }

            if (Number(newModule) < 0 || Number(newModule) > 6) {
                throw new Error(`Module ${newModule} does not exist. The possibles values are: 0, 1, 2, 3, 4, 5 e 6.`)            
            }

            const classDatabase = new ClassDatabase()
            await classDatabase.updateClassModule(classId, newModule)
        
        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}