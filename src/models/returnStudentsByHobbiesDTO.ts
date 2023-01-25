interface student {
    studentId: string,
    name: string
}

export interface returnStudentsByHobbiesDTO {
    id: string,
    hobbyName: string,
    students: student[]
}