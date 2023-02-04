import { Class, returnClassesDTO, updateClassModuleDTO } from "../models/Class"

export interface ClassRepository {
    createClass (newClass: Class): Promise<void>
    getAllClasses (): Promise<returnClassesDTO[]>
    updateClassModule (input: updateClassModuleDTO): Promise<void>
    getClassById (id: string): Promise<any>
}