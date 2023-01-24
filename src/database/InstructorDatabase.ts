import Instructor from "../models/Instructor"
import { BaseDatabase } from "./BaseDatabase"


export default class InstructorDatabase extends BaseDatabase {
    TABLE_NAME = "LabeSystem_Instructors"

    createInstructor = async (id: string, name: string, email: string, birthDate: Date, classId: string, expertise: string[]) => {
        try {
            const checkEmail = await BaseDatabase.connection(this.TABLE_NAME).select().where("email", email)
        
            if (checkEmail.length > 0) {
                throw new Error("This email has already been registered.")
            }

            const newInstructor = new Instructor(id, name, email, birthDate, classId, expertise)
            
            await BaseDatabase.connection(this.TABLE_NAME).insert({
                id: newInstructor.getId(),
                name: newInstructor.getName(),
                email: newInstructor.getEmail(),
                birth_date: newInstructor.getBirthDate(),
                class_id: newInstructor.getClassId()
            })

            for (let i = 0; expertise.length > i; i++) {
                const expertise_id = await BaseDatabase.connection("LabeSystem_Expertise").select("id").where("expertise_name", expertise[i])

                const id = Date.now().toString()
                await BaseDatabase.connection("LabeSystem_Instructors_Expertise").insert({
                    id,
                    instructor_id: newInstructor.getId(),
                    expertise_id: expertise_id[0].id
                })
            }

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    updateInstructorClass = async (instructorId: string, classId: string) => {
        try {
            const instructorIdExists = await BaseDatabase.connection(this.TABLE_NAME).select().where("id", instructorId)           
            if (instructorIdExists.length === 0) {
                throw new Error("This instructor id does not exist.")
            }

            const classIdExists = await BaseDatabase.connection("LabeSystem_Class").select().where("id", classId)
            if (classIdExists.length === 0) {
                throw new Error("This class id does not exist.")
            }

            await BaseDatabase.connection(this.TABLE_NAME).where("id", instructorId).update("class_id", classId)
        
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getAllInstructors = async (expertise: string) => {
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

                let instructorsExpertise = []

                for (let y = 0; y < expertise.length; y++) {
                    instructorsExpertise.push(expertise[y].expertise_name)
                }

                instructors[i].expertise = instructorsExpertise
            }

            if (expertise !== "%") {
                let filterInstructors = []
                
                for (let instructor of instructors) {
                    const filterExpertise = instructor.expertise.filter((item: string) => item === expertise)
                    
                    if (filterExpertise.length > 0) {
                        filterInstructors.push(instructor)
                    }
                }

                if (filterInstructors.length === 0) {
                    throw new Error("No instructors found with the given search parameter.")
                }

                return filterInstructors

            } else {
                return instructors
            }    

        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}