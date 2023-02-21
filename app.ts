import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import prisma from "./config/db";

import bookRoute from "./routes/bookRoute";
import publisherRoute from "./routes/publisherRoute";
import studentRoute from "./routes/studentRoute";
import peminjamanRoute from "./routes/peminjamanRoute";
import pengembalianRoute from "./routes/pengembalianRoute";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:3000/users",
//   "http://localhost:3000/users/index",
//   "http://localhost:3000/login",
//   "http://localhost:5173/",
//   "*",
// ];

app.use(
  cors({
    origin: "*",
  })
);

// app.use(
//   session({
//     secret: "key",
//     saveUninitialized: true,
//     store: new PrismaSessionStore(new PrismaClient(), {
//       checkPeriod: 2 * 60 * 1000,
//       dbRecordIdIsSessionId: true,
//       dbRecordIdFunction: undefined,
//     }),
//     resave: false,
//     cookie: {
//       secure: "auto",
//       maxAge: 7 * 24 * 60 * 1000,
//     },
//   })
// );

app.use(bookRoute);

app.use(publisherRoute);

app.use(studentRoute);

app.use(peminjamanRoute);

app.use(pengembalianRoute);

app.listen(5000, () => {
  console.log("connected to prisma sql");
});
