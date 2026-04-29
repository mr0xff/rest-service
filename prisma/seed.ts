import { MessageService } from "../src/services";
import { prisma } from "../src/lib/prisma";

const message = new MessageService(prisma);

await message.createUserWithAction({
  username: "root",
  action: "READ"
});