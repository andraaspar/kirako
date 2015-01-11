/// <reference path='../presenter/ScreenData.ts'/>

/// <reference path='Kirako.ts'/>

module kirako.model {
	export class Solver {
		
		private kirako: Kirako;
		private brush: string = ' ';
		private color: string = 'black';
		private background: string = 'white';
		
		private startCharId: number;
		private endCharId: number;
		private startLineId: number;
		private endLineId: number;
		
		private brushes: string[];
		private palette = ['White', 'Gray', 'Black', 'Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple',
			'Pink', 'LightPink', 'HotPink', 'DeepPink', 'PaleVioletRed', 'MediumVioletRed',
			'LightSalmon', 'Salmon', 'DarkSalmon', 'LightCoral', 'IndianRed', 'Crimson', 'FireBrick', 'DarkRed', 'Red', 'OrangeRed',
			'Tomato', 'Coral', 'DarkOrange', 'Orange', 'Yellow', 'LightYellow', 'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip',
			'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Khaki', 'DarkKhaki', 'Gold', 'Cornsilk', 'BlanchedAlmond', 'Bisque',
			'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan', 'RosyBrown', 'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate',
			'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'DarkOliveGreen', 'Olive', 'OliveDrab', 'YellowGreen', 'LimeGreen', 'Lime',
			'LawnGreen', 'Chartreuse', 'GreenYellow', 'SpringGreen', 'MediumSpringGreen', 'LightGreen', 'PaleGreen', 'DarkSeaGreen',
			'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'MediumAquamarine', 'Aqua', 'Cyan', 'LightCyan',
			'PaleTurquoise', 'Aquamarine', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'LightSeaGreen', 'CadetBlue', 'DarkCyan',
			'Teal', 'LightSteelBlue', 'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue', 'DeepSkyBlue', 'DodgerBlue', 'CornflowerBlue',
			'SteelBlue', 'RoyalBlue', 'Blue', 'MediumBlue', 'DarkBlue', 'Navy', 'MidnightBlue', 'Lavender', 'Thistle', 'Plum', 'Violet',
			'Orchid', 'Fuchsia', 'Magenta', 'MediumOrchid', 'MediumPurple', 'BlueViolet', 'DarkViolet', 'DarkOrchid', 'DarkMagenta',
			'Purple', 'Indigo', 'DarkSlateBlue', 'RebeccaPurple', 'SlateBlue', 'MediumSlateBlue', 'White', 'MistyRose', 'Gainsboro',
			'LightGrey', 'Silver', 'DarkGray', 'Gray', 'DimGray', 'LightSlateGray', 'SlateGray', 'DarkSlateGray', 'Black'];
		
		
		constructor() {
			this.makeNewKirako();
			this.load();
			
			this.brushes = [' '];
			for (var i = 0; i < 95; i++) {
				this.brushes.push(String.fromCharCode(0xe000 + i));
			}
			this.brush = this.brushes[1];
		}
		
		makeNewKirako(): void {
			this.kirako = new Kirako();
			this.kirako.name = 'kirako';
			this.kirako.pieces = [];
			this.kirako.colors = [];
			this.kirako.backgrounds = [];
			for (var lineId = 0; lineId < 25; lineId++) {
				var line: string[] = [];
				var colorsLine: string[] = [];
				var backgroundsLine: string[] = [];
				for (var charId = 0; charId < 40; charId++) {
					line.push(' ');
					colorsLine.push('black');
					backgroundsLine.push('white');
				}
				this.kirako.pieces.push(line);
				this.kirako.colors.push(colorsLine);
				this.kirako.backgrounds.push(backgroundsLine);
			}
		}
		
		setStartCharId(value: number): void {
			this.startCharId = value;
		}
		
		setEndCharId(value: number): void {
			this.endCharId = Math.max(this.startCharId, value);
			this.startCharId = Math.min(this.startCharId, value);
		}
		
		setStartLineId(value: number): void {
			this.startLineId = value;
		}
		
		setEndLineId(value: number): void {
			this.endLineId = Math.max(this.startLineId, value);
			this.startLineId = Math.min(this.startLineId, value);
		}
		
		paint(): void {
			for (var lineId = this.startLineId; lineId <= this.endLineId; lineId++) {
				for (var charId = this.startCharId; charId <= this.endCharId; charId++) {
					this.kirako.pieces[lineId][charId] = this.brush;
					this.kirako.colors[lineId][charId] = this.color;
					this.kirako.backgrounds[lineId][charId] = this.background;
				}
			}
		}
		
		setBrush(value: string): void {
			this.brush = value;
		}
		
		setColor(value: string): void {
			this.color = value;
		}
		
		setBackground(value: string): void {
			this.background = value;
		}
		
		getScreenData(): presenter.ScreenData {
			var result = new presenter.ScreenData();
			
			result.pieces = this.kirako.pieces.slice(0);
			result.colors = this.kirako.colors.slice(0);
			result.backgrounds = this.kirako.backgrounds.slice(0);
			
			result.brushes = this.brushes.slice(0);
			result.palette = this.palette.slice(0);
			
			result.brush = this.brush;
			result.color = this.color;
			result.background = this.background;
			
			result.startCharId = this.startCharId;
			result.endCharId = this.endCharId;
			result.startLineId = this.startLineId;
			result.endLineId = this.endLineId;
			
			return result;
		}
		
		save(): void {
			localStorage.setItem('saved', JSON.stringify(this.kirako));
		}
		
		load(): void {
			var loaded = <Kirako>JSON.parse(localStorage.getItem('saved'));
			if (loaded && loaded.version == 1) {
				this.kirako = loaded;
			}
		}
		
		shiftLeft(): void {
			for (var lineId = 0, lineCount = this.kirako.pieces.length; lineId < lineCount; lineId++) {
				this.kirako.pieces[lineId].push(this.kirako.pieces[lineId].shift());
				this.kirako.colors[lineId].push(this.kirako.colors[lineId].shift());
				this.kirako.backgrounds[lineId].push(this.kirako.backgrounds[lineId].shift());
			}
		}
		
		shiftRight(): void {
			for (var lineId = 0, lineCount = this.kirako.pieces.length; lineId < lineCount; lineId++) {
				this.kirako.pieces[lineId].unshift(this.kirako.pieces[lineId].pop());
				this.kirako.colors[lineId].unshift(this.kirako.colors[lineId].pop());
				this.kirako.backgrounds[lineId].unshift(this.kirako.backgrounds[lineId].pop());
			}
		}
		
		shiftUp(): void {
			this.kirako.pieces.push(this.kirako.pieces.shift());
			this.kirako.colors.push(this.kirako.colors.shift());
			this.kirako.backgrounds.push(this.kirako.backgrounds.shift());
		}
		
		shiftDown(): void {
			this.kirako.pieces.unshift(this.kirako.pieces.pop());
			this.kirako.colors.unshift(this.kirako.colors.pop());
			this.kirako.backgrounds.unshift(this.kirako.backgrounds.pop());
		}
	}
}