import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';
import ConnectionControllers from './controllers/ConnectionsController';
const routes = express.Router();

const classesControllers = new ClassesControllers()
const connectionControllers = new ConnectionControllers()

routes.post('/classes', classesControllers.create)
routes.get('/classes', classesControllers.index)

routes.post('/connections', connectionControllers.create)


export default routes;


