import WordsCounter from './WordsCounter';
import Report from './Report';
import path from 'path';

class CountedWordsReport {
	private countedWords: Map<string, number>;

	constructor(wordsCounter: WordsCounter) {
		wordsCounter.createWordsSet();
		wordsCounter.countWords();
		this.countedWords = wordsCounter.countedWords;
	}

	public showWhatIHave() {
		console.log('this: ', this);
	}

	public createReport(): Report {
		const newReport = new Report();

		const pathModule = path.basename(__dirname);

		console.log('path: ', path.dirname(__dirname));
		console.log('file: ', path.dirname(__filename));
		console.log('pathModule: ', pathModule);

		// newReport.fetchBlankReportFromSystem();
		return newReport;
	}
}

export default CountedWordsReport;
