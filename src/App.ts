import express, { Application } from 'express';
import Routes from './routes/AppRoutes';

class App {
	private app: Application;
	private appRoutes: Routes;
	private PORT = process.env.PORT || '5014';

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.appRoutes = new Routes();
		this.appRoutes.insertRoutes(this.app);
	}

	public listen(): void {
		this.app.listen(this.PORT, () =>
			console.log(`Server is listening at port ${this.PORT}`)
		);
	}
}

export default App;
