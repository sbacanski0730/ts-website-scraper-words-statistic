import { Request, Response } from 'express';
import path from 'path';
import ScrapedPage from '../utils/WebScraper';
import WordsCounter from '../utils/WordsCounter';
import CountedWordsReport from '../utils/CountedWordsReport';

class AppController {
	public giveExampleWebPage(req: Request, res: Response): void {
		res.status(200).sendFile(path.join(__dirname, '../assets/exampleHTMLPage.html'));
	}

	public async countWords(req: Request, res: Response) {
		try {
			const scrapedPage = new ScrapedPage(req.body.link);
			await scrapedPage.initialize();

			scrapedPage.clearScrapedPageBody();

			const wordsCounter = new WordsCounter(scrapedPage.scrapedPage);
			wordsCounter.createWordsSet();
			wordsCounter.countWords();

			res.status(200).json(Object.fromEntries(wordsCounter.countedWords));
		} catch (err: any) {
			if (err instanceof Error) console.log('err: ', err.message);
			console.log('err: ', err.message);
			res.send(err.message);
		}
	}

	public async countWordsAndReport(req: Request, res: Response) {
		try {
			const scrapedPage = new ScrapedPage(req.body.link);
			await scrapedPage.initialize();

			scrapedPage.clearScrapedPageBody();

			const wordsCounter = new WordsCounter(scrapedPage.scrapedPage);

			const report = new CountedWordsReport(wordsCounter);
			report.createReport();

			res.send('OK');
		} catch (err: any) {
			if (err instanceof Error) console.log('err: ', err.message);
			console.log('err: ', err.message);
			res.send(err.message);
		}
	}
}

export default AppController;
