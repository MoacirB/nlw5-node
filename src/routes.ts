import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";

import { SettingsController } from './controllers/SettingsController';
import { UsersController } from "./controllers/UsersController";
import { Controller } from "./controllers/Controller";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
const controller = new Controller();



/**
 * Tipos de parâmetros
 * Routes Params -> Parâmetros de rotas
 * Query Params -> Filtros e buscas
 * Body Params -> Envio de informações na página
 */

/**
 * GET -> Buscas
 * POST -> Criação
 * PUT -> Alteração
 * DELETE -> Deletar
 * PATCH -> Alterar uma infoamção específica
 */

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUserName);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

routes.delete("/delete", controller.delete);

export { routes };