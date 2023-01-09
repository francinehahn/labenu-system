import { Request, Response } from "express"
import InstructorDatabase from "../database/InstructorDatabase"


export async function getAllInstructors (req: Request, res: Response) {
    let errorCode = 400
    
    try {
        const expertise = req.query.expertise as string
        const instructors = new InstructorDatabase()
        const result = await instructors.selectAllInstructors()
        let instructorsArray = []
        
        if (expertise && expertise !== "Typescript" && expertise !== "Programação Orientada a Objetos" && expertise !== "React" && expertise !== "Redux" && expertise !== "Backend" && expertise !== "Testes Unitários") {
            errorCode = 404
            throw new Error("The possible expertise are: Typescript, Programação Orientada a Objetos, React, Redux, Backend, Testes Unitários.")
        }

        for (let i = 0; result.length > i; i++) {
            const expertiseArray = await instructors.getExpertiseByInstructorId(result[i].id)
            const expertise = []
            for (let item of expertiseArray) {
                expertise.push(item.expertise_name)
            }

            instructorsArray.push({...result[i], expertise})
        }

        if (expertise) {
            let instructorsByExpertise = []
            for (let i = 0; i < instructorsArray.length; i++) {
                const checkExpertise = instructorsArray[i].expertise.filter((item: string) => item === expertise)

                if (checkExpertise.length > 0) {
                    instructorsByExpertise.push(instructorsArray[i])
                }
            }

            res.status(200).send(instructorsByExpertise)

        } else {
            res.status(200).send(instructorsArray)
        }

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}