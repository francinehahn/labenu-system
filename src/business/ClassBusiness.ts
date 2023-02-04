import { Class, returnClassesDTO, updateClassModuleDTO } from "../models/Class"
import { generateId } from "../services/generateId"
import { CustomError } from "../error/CustomError"
import { ClassIdNotFound, DuplicateClassName, InvalidClassModuleType, InvalidClassModuleValue, MissingClassId, MissingClassModule, MissingClassName } from "../error/ClassErrors"
import { ClassRepository } from "./ClassRepository"


export class ClassBusiness {
    constructor (private classDatabase: ClassRepository) {}

    createClass = async (name: string): Promise<void> => {
        try {
            if (!name){
                throw new MissingClassName()          
            }
    
            const getClasses = await this.classDatabase.getAllClasses()
            const classAlreadyExists = getClasses.filter(item => item.name === name)

            if (classAlreadyExists.length > 0) {
                throw new DuplicateClassName()
            }

            const id = generateId()
            const module = "0"

            const newClass = new Class(id, name, module)
            await this.classDatabase.createClass(newClass)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllClasses = async (): Promise<returnClassesDTO[]> => {
        try {
            return await this.classDatabase.getAllClasses()
        
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

            const getClasses = await  this.classDatabase.getAllClasses()
            const classIdExists = getClasses.filter(item => item.id === input.classId)

            if (classIdExists.length === 0) {
                throw new ClassIdNotFound()
            }

            await this.classDatabase.updateClassModule(input)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}