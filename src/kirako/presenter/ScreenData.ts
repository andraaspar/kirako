

module kirako.presenter {
	export class ScreenData {
		
		pieces: string[][];
		colors: string[][];
		backgrounds: string[][];
		
		brushes: string[];
		palette: string[];
		
		brush: string;
		color: string;
		background: string;
		
		startCharId: number;
		endCharId: number;
		startLineId: number;
		endLineId: number;
		
		equals(other: ScreenData): boolean {
			for (var i in this) {
				if (this.hasOwnProperty(i)) {
					if (illa.isArray(this[i])) {
						if (this[i].join() != other[i].join()) return false;
					} else {
						if (this[i] != other[i]) return false;
					}
				}
			}
			return true;
		}
	}
}