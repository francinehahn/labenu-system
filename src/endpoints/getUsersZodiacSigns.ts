import { Request, Response } from "express"
import InstructorDatabase from "../database/InstructorDatabase"
import ZodiacSigns from "../database/ZodiacSigns"
import { StudentsDatabase } from "../database/StudentsDatabase"


export async function getUsersZodiacSigns (req: Request, res: Response) {
    let errorCode = 400

    try {
        let instructorsDB = new InstructorDatabase()
        let studentsDB = new StudentsDatabase()

        //Aries
        let ariesStudents = await studentsDB.getStudentsZodiacSigns('03', '04', '21', '31', '01', '20')
        let ariesInstructors = await instructorsDB.getInstructorsZodiacSigns('03', '04', '21', '31', '01', '20')
        
        //Taurus
        let taurusStudents = await studentsDB.getStudentsZodiacSigns('04', '05', '21', '30', '01', '20')
        let taurusInstructors = await instructorsDB.getInstructorsZodiacSigns('04', '05', '21', '30', '01', '20')
        
        //Gemini
        let geminiStudents = await studentsDB.getStudentsZodiacSigns('05', '06', '21', '31', '01', '20')
        let geminiInstructors = await instructorsDB.getInstructorsZodiacSigns('05', '06', '21', '31', '01', '20')
        
        //Cancer
        let cancerStudents = await studentsDB.getStudentsZodiacSigns('06', '07', '21', '30', '01', '22')
        let cancerInstructors = await instructorsDB.getInstructorsZodiacSigns('06', '07', '21', '30', '01', '22')
        
        //Leo      
        let leoStudents = await studentsDB.getStudentsZodiacSigns('07', '08', '23', '31', '01', '22')
        let leoInstructors = await instructorsDB.getInstructorsZodiacSigns('07', '08', '23', '31', '01', '22')        
        
        //Virgo
        let virgoStudents = await studentsDB.getStudentsZodiacSigns('08', '09', '23', '31', '01', '22')
        let virgoInstructors = await instructorsDB.getInstructorsZodiacSigns('08', '09', '23', '31', '01', '22')        
        
        //Libra
        let libraStudents = await studentsDB.getStudentsZodiacSigns('09', '10', '23', '30', '01', '22')
        let libraInstructors = await instructorsDB.getInstructorsZodiacSigns('09', '10', '23', '30', '01', '22')        
        
        //Scorpio
        let scorpioStudents = await studentsDB.getStudentsZodiacSigns('10', '11', '23', '31', '01', '21')
        let scorpioInstructors = await instructorsDB.getInstructorsZodiacSigns('10', '11', '23', '31', '01', '21')        
        
        //Sagittarius
        let sagittariuStudents = await studentsDB.getStudentsZodiacSigns('11', '12', '22', '30', '01', '21')
        let sagittariuInstructors = await instructorsDB.getInstructorsZodiacSigns('11', '12', '22', '30', '01', '21')        
        
        //Capricorn
        let capricornStudents = await studentsDB.getStudentsZodiacSigns('12', '01', '22', '31', '01', '20')
        let capricornInstructors = await instructorsDB.getInstructorsZodiacSigns('12', '01', '22', '31', '01', '20')        
        
        //Aquarius
        let aquariusStudents = await studentsDB.getStudentsZodiacSigns('01', '02', '21', '31', '01', '18')
        let aquariusInstructors = await instructorsDB.getInstructorsZodiacSigns('01', '02', '21', '31', '01', '18')
        
        //Pisces
        let piscesStudents = await studentsDB.getStudentsZodiacSigns('02', '03', '19', '29', '01', '20')
        let piscesInstructors = await instructorsDB.getInstructorsZodiacSigns('02', '03', '19', '29', '01', '20')        

        let zodiacSigns = new ZodiacSigns(
            {students: ariesStudents, intructors: ariesInstructors},
            {students: taurusStudents, intructors: taurusInstructors},
            {students: geminiStudents, intructors: geminiInstructors},
            {students: cancerStudents, intructors: cancerInstructors},
            {students: leoStudents, intructors: leoInstructors},
            {students: virgoStudents, intructors: virgoInstructors},
            {students: libraStudents, intructors: libraInstructors},
            {students: scorpioStudents, intructors: scorpioInstructors},
            {students: sagittariuStudents, intructors: sagittariuInstructors},
            {students: capricornStudents, intructors: capricornInstructors},
            {students: aquariusStudents, intructors: aquariusInstructors},
            {students: piscesStudents, intructors: piscesInstructors}
        )
        
        res.status(200).send(zodiacSigns)              
        
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}
