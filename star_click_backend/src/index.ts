import express, { json } from "express";
import cors from "cors";

import { userRouter } from "./routers";

const app = express();
app
  .use(cors())
  .use(json())
  .use("/users", userRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
