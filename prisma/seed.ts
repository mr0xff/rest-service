import { PrismaClient } from "@prisma/client/extension";
import MessageService from "../dist/services/message.service";

const prisma = new PrismaClient()
const message = new MessageService(prisma);

await message.createUserWithAction({
  username: "root",
  action: "READ"
});