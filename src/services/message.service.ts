import { PrismaClient } from "../generated/prisma/client.js";

export default class MessageService {
  #db: PrismaClient;

  constructor(db: PrismaClient){
    this.#db = db;
  }

  async createUserWithAction(data: {
    username: string;
    action: "READ" | "WRITE" | "EXECUTE"
  }){
    const [ user, action ] = await Promise.all([
      this.#db.user.create({
        data: { name: data.username }
      }),
      this.#db.action.create({
        data: { name: data.action }
      })
    ]);
    
    return {
      user,
      action
    }
  }
  
  async listAll(filter?: {
    user: boolean;
    action: boolean;
  }){


    if(filter?.user) return {
      users: await this.#db.user.findMany()
    }

    if(filter?.action) return {
      actions: await this.#db.action.findMany()
    }
    
    return {
      users: await this.#db.user.findMany(),
      actions: await this.#db.action.findMany()
    }
  }
}