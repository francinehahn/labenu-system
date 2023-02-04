import { Instructor, updateInstructorClassDTO } from "../models/Instructor"
import { generateId } from "../services/generateId"
import { BaseDatabase } from "./BaseDatabase"
import { CustomError } from "../error/CustomError"
import { InstructorRepository } from "../business/InstructorRepository"


export default class InstructorDatabase extends BaseDatabase implements InstructorRepository {
    TABLE_NAME = "LabeSystem_Instructors"

    createInstructor = async (newInstructor: Instructor): Promise<void> => {
        try {
            console.log(newInstructor)
            await BaseDatabase.connection(this.TABLE_NAME).insert({
                id: newInstructor.getId(),
                name: newInstructor.getName(),
                email: newInstructor.getEmail(),
                birth_date: newInstructor.getBirthDate(),
                class_id: newInstructor.getClassId()
            })

            for (let i = 0; i < newInstructor.getExpertise().length; i++) {
                const expertiseId = await BaseDatabase.connection("LabeSystem_Expertise")
                    .select("id")
                    .where("expertise_name", newInstructor.getExpertise()[i])

                const id = generateId()

                await BaseDatabase.connection("LabeSystem_Instructors_Expertise").insert({
                    id,
                    instructor_id: newInstructor.getId(),
                    expertise_id: expertiseId[0].id
                })
            }

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    updateInstructorClass = async (input: updateInstructorClassDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).where("id", input.instructorId).update("class_id", input.classId)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllInstructors = async (expertise: string): Promise<Instructor[]> => {
        try {
            let instructors = await BaseDatabase.connection(this.TABLE_NAME).select()
            
            for (let i = 0; i < instructors.length; i++) {
                const className = await BaseDatabase.connection.select("LabeSystem_Class.name")
                .from("LabeSystem_Class")
                .where("id", instructors[i].class_id)

                instructors[i].class_name = className[0].name

                const expertise = await BaseDatabase.connection.select("LabeSystem_Expertise.expertise_name")
                .from("LabeSystem_Instructors_Expertise")
                .join("LabeSystem_Expertise", "LabeSystem_Expertise.id", "=", "LabeSystem_Instructors_Expertise.expertise_id")
                .where('instructor_id', instructors[i].id)
                
                let instructorsExpertise: string[] = []

                for (let y = 0; y < expertise.length; y++) {
                    instructorsExpertise.push(expertise[y].expertise_name)
                }

                instructors[i].expertise = instructorsExpertise
            }

            if (expertise !== "%") {
                let filterInstructors: any = []
                
                for (let instructor of instructors) {
                    const filterExpertise = instructor.expertise.filter((item: string) => item === expertise)
                    
                    if (filterExpertise.length > 0) {
                        filterInstructors.push(instructor)
                    }
                }

                return filterInstructors
            } else {
                return instructors
            }    

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getInstructor = async (column: string, value: string): Promise<any> => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).where(column, value)
        
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}