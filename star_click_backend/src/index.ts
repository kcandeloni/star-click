import express, { json } from "express";
import cors from "cors";

import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { searchTitle } from "./utils/omdb-service";

const app = express();
app.use(cors());
app.use(json());

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    const prisma = new PrismaClient();
    const result = await searchTitle("naruto");
    console.log(result);
    const users = await prisma.user.findMany();
    return res.send(users).status(200);
  }
);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
