import axios from 'axios';

class ScrapedPage {
	private _scrapedPage: string;

	// tego patternu: "constructor and builder" nie do końca rozumiem
	// https://stackoverflow.com/questions/43431550/async-await-class-constructor
	constructor(pageBody: string) {
		if (typeof pageBody === undefined)
			throw new Error('Constructor cannot be called directly');

		this._scrapedPage = pageBody;
	}

	public static async build(link: string): Promise<ScrapedPage> {
		const pageBody = await axios
			.get(link)
			// .then((res) => res.data.replaceAll(/\s/g, ' '))
			.then((res) => this.clearEscapeSequence(res.data))
			.catch(() => {
				throw new Error('Problem with link');
			});
		return new ScrapedPage(pageBody);
	}

	// nie wiem czy lepiej robić to od razu w build(), czy w osobnych funkcjach
	private static clearEscapeSequence(pageBody: string): string {
		return pageBody.replaceAll(/\s/g, ' ');
	}

	public clearScrapedPageBody(): void {
		this.clearHTMLTags();
		this.clearDigits();
		this.clearCharacters();
	}

	public skipSpaces(): void {
		this._scrapedPage = this._scrapedPage.replace(/\s+/gm, ' ');
	}

	private clearHTMLTags(): void {
		this._scrapedPage = this._scrapedPage.replace(/(<([^>]+)>)/gi, ' ');
	}

	private clearDigits(): void {
		this._scrapedPage.replaceAll(/\d/g, ' ');
	}

	private clearCharacters(): void {
		this._scrapedPage = this._scrapedPage.replaceAll(/[^\w]/g, ' ');
	}

	public getScrapedPage(): string {
		if (typeof this._scrapedPage === undefined) throw Error('Property is empty');

		return this._scrapedPage;
	}
}
export default ScrapedPage;
