import app from "./app"
import { createStudent } from "./endpoints/createStudent"
import { getAllStudents } from "./endpoints/getAllStudents"
import { createClass } from "./endpoints/createClass"
import { getActiveClasses } from "./endpoints/getActiveClasses"
import { createInstructor } from "./endpoints/createInstructor"
import { getAllInstructors } from "./endpoints/getAllInstructors"
import { updateStudentClass } from "./endpoints/updateStudentClass"
import { updateInstructorClass } from "./endpoints/updateInstructorClass"
import { updateClassModule } from "./endpoints/updateClassModule"
import { getStudentsByHobbies } from "./endpoints/getStudentsByHobbies"
import { getUsersZodiacSigns } from "./endpoints/getUsersZodiacSigns"
import { getClassUsers } from "./endpoints/getClassUsers"


//Get All Instructors
app.get("/instructors", getAllInstructors)

//Create Instructor
app.post("/instructors", createInstructor)

//Update Instructor's Class
app.patch("/instructors/:instructor_id", updateInstructorClass)

//Search Students
app.get("/students", getAllStudents)

//Create Student
app.post("/students", createStudent)

//Update Student's Class
app.patch("/students/:student_id", updateStudentClass)

//Get Users Zodiac Signs
app.get("/zodiac-signs", getUsersZodiacSigns)

//Get Students By Hobbies
app.get("/hobbies", getStudentsByHobbies)

//Search Active Classes
app.get("/classes", getActiveClasses)

//Create Class
app.post("/classes", createClass)

//Get Students and Instructors By Class
app.get("/classes/users", getClassUsers)

//Update Class Module
app.patch("/classes/:class_id", updateClassModule)






