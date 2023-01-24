import app from "./app"
import { classRouter } from "./routes/classRouter"
import { instructorRouter } from "./routes/instructorRouter"
import { studentRouter } from "./routes/studentRouter"


app.use("/students", studentRouter)
app.use("/instructors", instructorRouter)
app.use("/classes", classRouter)






