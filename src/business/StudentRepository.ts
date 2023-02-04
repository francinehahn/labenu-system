import { returnStudentsByHobbiesDTO, Student, updateStudentClassDTO } from "../models/Student"


export interface StudentRepository {
    createStudent (newStudent: Student): Promise<void>
    updateStudentClass (input: updateStudentClassDTO): Promise<void>
    getAllStudents (search: string): Promise<Student[]>
    getStudentsByHobbies (hobby: string): Promise<returnStudentsByHobbiesDTO>
    searchHobby (hobby: string): Promise<any>
    getStudent (column: string, value: string): Promise<any>
}