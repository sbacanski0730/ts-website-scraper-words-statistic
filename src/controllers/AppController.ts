import { Request, Response } from 'express';
import path from 'path';
import ScrapedPage from '../utils/WebScraper';
import StatisticProvider from '../utils/StatisticProvider';

class AppController {
	public giveExampleWebPage(req: Request, res: Response): void {
		res.status(200).sendFile(path.join(__dirname, '../assets/exampleHTMLPage.html'));
	}

	public async scrapAndStat(req: Request, res: Response) {
		const scrapedPage = await ScrapedPage.build(req.body.link).then((res) => res);

		scrapedPage.clearScrapedPageBody();
		scrapedPage.skipSpaces();

		const statObj = new StatisticProvider(scrapedPage.getScrapedPage());
		statObj.createWordsSet();
		statObj.countWords();
		console.table(statObj.countedWords);

		res.status(200).json(Object.fromEntries(statObj.countedWords));
	}
}

export default AppController;
