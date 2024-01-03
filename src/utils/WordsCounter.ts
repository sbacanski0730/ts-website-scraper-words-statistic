class WordsCounter {
	private _pageBody: String;
	private _wordsSet: Set<string> = new Set();
	private _countedWords: Map<string, number> = new Map();

	constructor(pageBody: string) {
		this._pageBody = pageBody;
	}

	public createWordsSet(): void {
		this._pageBody
			.split(' ')
			.filter((word) => word !== '')
			.forEach((word) => this._wordsSet.add(word));
	}

	public countWords(): void {
		this._wordsSet.forEach((word) => {
			const matched: Array<string> | null = this._pageBody.match(
				new RegExp(word, 'g')
			);

			this._countedWords.set(word, matched!.length);
		});
	}

	public get countedWords(): Map<string, number> {
		return this._countedWords;
	}
}

export default WordsCounter;
