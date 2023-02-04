import { Instructor, updateInstructorClassDTO } from "../models/Instructor"


export interface InstructorRepository {
    createInstructor (newInstructor: Instructor): Promise<void>
    updateInstructorClass (input: updateInstructorClassDTO): Promise<void>
    getAllInstructors (expertise: string): Promise<Instructor[]>
    getInstructor (column: string, value: string): Promise<any>
}