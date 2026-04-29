import { prisma } from "../dist/lib/prisma";
import MessageService from "../dist/services/message.service";

const message = new MessageService(prisma);

await message.createUserWithAction({
  username: "root",
  action: "READ"
});