import { ClassDatabase } from "../database/ClassDatabase"
import { Class, returnClassesDTO, updateClassModuleDTO } from "../models/Class"
import { generateId } from "../services/generateId"
import { CustomError } from "../error/CustomError"
import { ClassIdNotFound, DuplicateClassName, InvalidClassModuleType, InvalidClassModuleValue, MissingClassId, MissingClassModule, MissingClassName } from "../error/ClassErrors"


export class ClassBusiness {
    createClass = async (name: string): Promise<void> => {
        try {
            if (!name){
                throw new MissingClassName()          
            }
    
            const classDatabase = new ClassDatabase()
            const getClasses = await classDatabase.getAllClasses()
            const classAlreadyExists = getClasses.filter(item => item.name === name)

            if (classAlreadyExists.length > 0) {
                throw new DuplicateClassName()
            }

            const id = generateId()
            const module = "0"

            const newClass = new Class(id, name, module)
            await classDatabase.createClass(newClass)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllClasses = async (): Promise<returnClassesDTO[]> => {
        try {
            const classDatabase = new ClassDatabase()
            return await classDatabase.getAllClasses()
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    updateClassModule = async (input: updateClassModuleDTO): Promise<void> => {
        try {
            if (!input.classId) {
                throw new MissingClassId()
            }

            if (!input.newModule) {
                throw new MissingClassModule()       
            }

            if (typeof(input.newModule) !== "string") {
                throw new InvalidClassModuleType()    
            }

            if (Number(input.newModule) < 0 || Number(input.newModule) > 6) {
                throw new InvalidClassModuleValue()      
            }

            const classDatabase = new ClassDatabase()
            const getClasses = await  classDatabase.getAllClasses()
            const classIdExists = getClasses.filter(item => item.id === input.classId)

            if (classIdExists.length === 0) {
                throw new ClassIdNotFound()
            }

            await classDatabase.updateClassModule(input)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}