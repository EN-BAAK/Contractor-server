import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middleware/errorMiddleware";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";
import contractsRouter from "./routes/contracts";
import adminTesterRouter from "./routes/mainTester";
import path from "path";
import { dbConfig } from "./utils/database";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const app = express();

dbConfig();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    const indexPath = path.join(__dirname, "../../frontend/dist/index.html");
    res.sendFile(indexPath);
  } else {
    next();
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/contracts", contractsRouter);
app.use("/api/v1/mainTester", adminTesterRouter);

app.use(errorMiddleWare);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
