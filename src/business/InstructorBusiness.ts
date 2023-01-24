import InstructorDatabase from "../database/InstructorDatabase"



export class InstructorBusiness {
    createInstructor = async (name: string, email: string, birthDate: string, expertise: string[]) => {
        try {
            const id = Date.now().toString()
            const classId = '0000000000000'
    
            if (!name) {
                throw new Error("Provide the instructor name.")
            } else if (!email) {
                throw new Error("Provide the instructor email.")
            } else if (!birthDate) {
                throw new Error("Provide the instructor birth date in the following format: DD/MM/AAAA.")
            } else if (!expertise) {
                throw new Error("Provide the expertise of the instructor.")
            }
    
            const editedBirthDate = new Date(birthDate.toString().split("/").reverse().join("-"))
            
            const instructorDatabase = new InstructorDatabase()
            await instructorDatabase.createInstructor(id, name, email, editedBirthDate, classId, expertise)

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    updateInstructorClass = async (instructorId: string, classId: string) => {
        try {
            if (!instructorId) {
                throw new Error("Provide the instructor id.")
            }
    
            if (!classId) {
                throw new Error("Provide the class id.")
            }

            const instructorDatabase = new InstructorDatabase()
            await instructorDatabase.updateInstructorClass(instructorId, classId)

        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    getAllInstructors = async (expertise: string) => {
        try {
            if (expertise && expertise !== "Typescript" && expertise !== "Programação Orientada a Objetos" && expertise !== "React" && expertise !== "Redux" && expertise !== "Backend" && expertise !== "Testes Unitários") {
                throw new Error("The possible expertise are: Typescript, Programação Orientada a Objetos, React, Redux, Backend, Testes Unitários.")
            }

            if (!expertise) {
                expertise = "%"
            }

            const instructorDatabase = new InstructorDatabase()
            return await instructorDatabase.getAllInstructors(expertise)

        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}