import fp from "fastify-plugin";
import MessageService from "../services/message.service.js";
import { prisma } from "../lib/prisma.js";

const service = {
  message: new MessageService(prisma)
}

export default fp((fastify) => {
  fastify.decorate("service", service);
});

declare module "fastify" {
  export interface FastifyInstance {
    service: typeof service;
  }
}