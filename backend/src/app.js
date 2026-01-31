import express from "express"

const app = express();
app.use(express.json());
//import user routes
import UserRouter from "./routes/user.route.js";

//routed declaration
app.use("/api/v1/users", UserRouter );


//example route: http://localhost:8001/api/v1/users/register
export default app;