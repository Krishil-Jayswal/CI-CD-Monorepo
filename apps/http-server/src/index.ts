import { prisma } from "db";
import express from "express";
import { z } from "zod";

export const app = express();

const SumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.use(express.json());

app.post("/sum", async (req, res) => {
  const validation = SumInput.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ message: "Invalid data format." });
    return;
  }

  const { a, b } = validation.data;
  const sum = a + b;

  const request = await prisma.request.create({
    data: {
      a,
      b,
      sum,
    },
  });
  res.status(200).json({ sum });
});
