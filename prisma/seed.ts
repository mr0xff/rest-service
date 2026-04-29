import { prisma } from "../src/lib/prisma";
import MessageService from "../src/services/message.service";

const message = new MessageService(prisma);

await message.createUserWithAction({
  username: "root",
  action: "READ"
});