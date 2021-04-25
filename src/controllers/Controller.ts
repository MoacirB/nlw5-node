import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class Controller{
    async delete(req: Request, res: Response){
        const messagesRepository = getCustomRepository(MessagesRepository);
        const connectionsRepository = getCustomRepository(ConnectionsRepository);
        const usersRePository = getCustomRepository(UsersRepository);

        const messages = await messagesRepository.find();
        const idMessages = messages.map(message => {
            return message.id;
        });
        if(messages.length>0)await messagesRepository.delete(idMessages);

        const connections = await connectionsRepository.find();
        const idConnections = connections.map((connection)=>(connection.id));
        if(connections.length>0)await connectionsRepository.delete(idConnections);

        return res.status(204).send();
    }
}

export { Controller };