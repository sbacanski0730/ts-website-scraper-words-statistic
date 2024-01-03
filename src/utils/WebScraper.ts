import axios from 'axios';

class ScrapedPage {
	private _pageLink: string;
	private _scrapedPage: string;

	constructor(pageLink: string) {
		this._pageLink = pageLink;
	}

	public async initialize(): Promise<void> {
		await axios.get(this._pageLink).then((res) => (this._scrapedPage = res.data));
	}

	public clearScrapedPageBody(): void {
		this.clearEscapeSequence();
		this.clearHTMLTags();
		this.clearDigits();
		this.clearCharacters();
		this.clearSpaces();
	}

	private clearEscapeSequence(): void {
		this.setScrapedPage = this._scrapedPage.replaceAll(/\s/g, ' ');
	}

	private clearSpaces(): void {
		this.setScrapedPage = this._scrapedPage.replace(/\s+/gm, ' ');
	}

	private clearHTMLTags(): void {
		this.setScrapedPage = this._scrapedPage.replace(/(<([^>]+)>)/gi, ' ');
	}

	private clearDigits(): void {
		this.setScrapedPage = this._scrapedPage.replaceAll(/\d/g, ' ');
	}

	private clearCharacters(): void {
		this.setScrapedPage = this._scrapedPage.replaceAll(/[^\w]/g, ' ');
	}

	public get scrapedPage() {
		if (typeof this._scrapedPage === 'undefined') throw Error('Property is empty');

		return this._scrapedPage;
	}

	public set setScrapedPage(pageBody: string) {
		if (typeof this._scrapedPage === 'undefined')
			throw Error('Property is empty setter');

		this._scrapedPage = pageBody;
	}
}
export default ScrapedPage;
