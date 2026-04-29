import { FastifyInstance } from "fastify";

export default function api(fastify: FastifyInstance){
  const { message } = fastify.service;
  fastify.get("/", (req, res) => {
    res.send({ message: "banana" })
  });

  fastify.get("/list", async (req, res) => {
    res.send({ data: await message.listAll() });
  });

  fastify.post<{
    Body: {
      username: string;
      action: "READ" | "WRITE" | "EXECUTE";
    }
  }>("/", async (req, res) => {
    res.send(await message.createUserWithAction(req.body));
  });
}