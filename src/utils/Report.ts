import fs from 'fs';
import path from 'path';

class Report {
	constructor() {}

	private async fetchBlankReportFromSystem(absoluteFilePath: string): Promise<void> {
		try {
			if (!path.isAbsolute(absoluteFilePath))
				throw new Error('Giver path is not absolute');
			const file = await fs.promises.readFile(absoluteFilePath);
		} catch (err) {
			console.log(err);
		}
	}
}

export default Report;
