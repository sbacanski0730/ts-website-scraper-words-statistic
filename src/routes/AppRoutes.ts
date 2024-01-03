import axios from 'axios';
import { Application, Request, Response } from 'express';
import path from 'path';
import AppController from '../controllers/AppController';
class Routes {
	private appController: AppController = new AppController();

	public insertRoutes(app: Application) {
		app.route('/example-page').get(this.appController.giveExampleWebPage);

		app.route('/statistics').post(this.appController.countWords);

		app.route('/statistics-and-report').post(this.appController.countWordsAndReport);
	}
}

export default Routes;
