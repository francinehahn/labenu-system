import app from "./app"
import { classRouter } from "./routes/ClassRouter"
import { instructorRouter } from "./routes/InstructorRouter"
import { studentRouter } from "./routes/StudentRouter"


app.use("/students", studentRouter)
app.use("/instructors", instructorRouter)
app.use("/classes", classRouter)






