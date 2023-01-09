import { BaseDatabase } from "./BaseDatabase"

export default class InstructorDatabase extends BaseDatabase {
    TABLE_NAME = "LabeSystem_Instructors"

    public async createInstructor(id: string, name: string, email: string, birth_date: Date, class_id: string) {
        await super.create({id, name, email, birth_date, class_id})
    }

    public async createExpertise(instructor_id: string, expertise: string[]) {
        for (let i = 0; expertise.length > i; i++) {
            let expertise_id = await BaseDatabase.connection("LabeSystem_Expertise").select("id").where("expertise_name", expertise[i])
            expertise_id = expertise_id[0].id

            const id = Date.now().toString()
            await BaseDatabase.connection("LabeSystem_Instructors_Expertise").insert({id, instructor_id, expertise_id})
        }
    }

    public async getByEmail(email: string) {
        const result = await super.searchFor("email", "like", email)
        return result
    }

    public async selectAllInstructors() {
        const result = await super.getAll()
        return result
    }

    public async getExpertiseByInstructorId(id: string) {
        const result = await BaseDatabase.connection.select("LabeSystem_Expertise.expertise_name")
            .from("LabeSystem_Instructors_Expertise")
            .join("LabeSystem_Expertise", "LabeSystem_Expertise.id", "=", "LabeSystem_Instructors_Expertise.expertise_id")
            .where("instructor_id", id)
        
        return result
    }

    public async getInstructorsZodiacSigns(firstMonth: string, secondMonth: string, firstDay: string, secondDay: string, thirdDay: string, fourthDay: string) {
        const result = super.getZodiacSigns(firstMonth, secondMonth, firstDay, secondDay, thirdDay, fourthDay)
        return result
    }

    public async getClassInstructors(tableClassId: string, classId: string) {
        const result = super.getUsers(tableClassId, classId)
        return result
    }
}