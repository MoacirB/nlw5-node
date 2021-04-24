import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController{
    async create(req: Request, res: Response){
        const messagesService = new MessagesService();
        const { admin_id, text, user_id } = req.body;

        const message = await messagesService.create({admin_id, text, user_id});

        return res.json({message});
    }

    async showByUser(req: Request, res: Response){
        const { id } = req.params;

        const messageService = new MessagesService();
        const list = await messageService.findByUser(id);

        return res.json(list);
    }
}

export { MessagesController };