import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';
import { text } from 'express';

io.on("connect", (socket)=>{
    const connectionService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    interface IParams{
        text: string;
        email: string;
    }

    socket.on("client_first_access", async (params)=>{
        const { email, text } = params as IParams;
        const socket_id = socket.id;
        let user_id: string;

        const userExists = await usersService.findByEmail(email);
        if(!userExists){
            const user = await usersService.create(email);
            user_id = user.id;

            await connectionService.create({socket_id, user_id});
        }
        else{
            const connection = await connectionService.findByUserId(userExists.id);

            user_id = userExists.id;
            if(!connection)await connectionService.create({socket_id, user_id});
            else{
                connection.socket_id = socket_id;
                connectionService.create(connection);
            }
        }
        await messagesService.create({text, user_id});

        const allMessages = await messagesService.findByUser(user_id);
        socket.emit("client_list_all_messages", allMessages);
    })
})