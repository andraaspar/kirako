

module kirako.presenter {
	export class ScreenPresenter {
		
		private solver = kirako.Main.getSolver();
		private screen = kirako.Main.getScreen();
		
		private lastData: ScreenData;
		
		private onKirakoMouseMoveBound = illa.bind(this.onKirakoMouseMove, this);
		private onKirakoMouseUpBound = illa.bind(this.onKirakoMouseUp, this);
		
		private selectStartCharId: number;
		private selectStartLineId: number;
		
		constructor() {
			this.screen.kirako.on('mousedown', illa.bind(this.onKirakoMouseDown, this));
			this.screen.brushes.on('click', illa.bind(this.onBrushClicked, this));
			this.screen.palette.on('click', illa.bind(this.onPaletteClicked, this));
			this.screen.palette.on('contextmenu', illa.bind(this.onPaletteContextMenuClicked, this));
			jQuery(document).on('contextmenu', function(e: jQuery.IEvent) { e.preventDefault() })
			jQuery(document).on('keydown', illa.bind(this.onKeyDown, this));
			
			this.render();
		}
		
		protected render(force = false): void {
			var data = this.solver.getScreenData();
			if (!force && this.lastData && this.lastData.equals(data)) {
				return;
			}
			
			this.screen.kirako.width(32 * data.pieces[0].length);
			this.screen.kirako.height(32 * data.pieces.length);
			
			var kirakoArrkup = [];
			for (var lineId = 0, lineCount = data.pieces.length; lineId < lineCount; lineId++) {
				for (var charId = 0, charCount = data.pieces[lineId].length; charId < charCount; charId++) {
					var isSelected = lineId >= data.startLineId && lineId <= data.endLineId &&
						charId >= data.startCharId && charId <= data.endCharId;
					kirakoArrkup.push(['span', {'class': isSelected ? 'ko-selected' : '',
						style: 'color: ' + data.colors[lineId][charId] + '; background: ' + data.backgrounds[lineId][charId],
						'data-char-id': charId,
						'data-line-id': lineId},
						data.pieces[lineId][charId]]);
				}
				kirakoArrkup.push('\n');
			}
			this.screen.kirako.html(illa.Arrkup.createString(kirakoArrkup));
			
			var brushesArrkup = [];
			for (var brushId = 0, brushCount = data.brushes.length; brushId < brushCount; brushId++) {
				var brush = data.brushes[brushId];
				var isSelected = brush == data.brush;
				brushesArrkup.push(['span', {'class': isSelected ? 'ko-selected' : '',
					style: 'color: ' + data.color + '; background: ' + data.background,
					'data-brush': brush},
					brush]);
				if (brushId % 2 == 1) brushesArrkup.push(['br/']);
			}
			this.screen.brushes.html(illa.Arrkup.createString(brushesArrkup));
			
			var paletteArrkup = [];
			for (var colorId = 0, colorCount = data.palette.length; colorId < colorCount; colorId++) {
				var color = data.palette[colorId];
				paletteArrkup.push(['span', {style: 'background-color: ' + color,
					'data-color': color}]);
				if (colorId % 2 == 1) paletteArrkup.push(['br/']);
			}
			this.screen.palette.html(illa.Arrkup.createString(paletteArrkup));
			
			this.lastData = data;
		}
		
		protected onKirakoMouseDown(e: jQuery.IEvent): void {
			e.preventDefault();
			this.screen.kirako.on('mousemove', this.onKirakoMouseMoveBound);
			jQuery(document).on('mouseup', this.onKirakoMouseUpBound);
			
			var piece = this.getClosestPiece(e.target);
			var charId = this.selectStartCharId = this.getPieceCharId(piece);
			var lineId = this.selectStartLineId = this.getPieceLineId(piece);
			this.solver.setStartCharId(charId);
			this.solver.setStartLineId(lineId);
			this.solver.setEndCharId(charId);
			this.solver.setEndLineId(lineId);
			this.render();
		}
		
		protected onKirakoMouseMove(e: jQuery.IEvent): void {
			e.preventDefault();
			var piece = this.getClosestPiece(e.target);
			this.solver.setStartCharId(this.selectStartCharId);
			this.solver.setStartLineId(this.selectStartLineId);
			this.solver.setEndCharId(this.getPieceCharId(piece));
			this.solver.setEndLineId(this.getPieceLineId(piece));
			this.render();
		}
		
		protected onKirakoMouseUp(e: jQuery.IEvent): void {
			e.preventDefault();
			if (e.which == 3) {
				var prevBrush = this.lastData.brush;
				this.solver.setBrush(' ');
				this.solver.paint();
				this.solver.setBrush(prevBrush);
			} else {
				this.solver.paint();
			}
			this.solver.setStartCharId(-1);
			this.solver.setEndCharId(-1);
			this.solver.setStartLineId(-1);
			this.solver.setEndLineId(-1);
			this.render();
			
			this.screen.kirako.off('mousemove', this.onKirakoMouseMoveBound);
			jQuery(document).off('mouseup', this.onKirakoMouseUpBound);
			
			this.solver.save();
		}
		
		protected getClosestPiece(target: Element): jQuery.IInstance {
			return jQuery(target).closest('[data-char-id]');
		}
		
		protected getPieceCharId(piece: jQuery.IInstance): number {
			var result = 0;
			if (piece) {
				result = parseInt(piece.data('char-id'));
			}
			return result;
		}
		
		protected getPieceLineId(piece: jQuery.IInstance): number {
			var result = 0;
			if (piece) {
				result = parseInt(piece.data('line-id'));
			}
			return result;
		}
		
		protected onBrushClicked(e: jQuery.IEvent): void {
			e.preventDefault();
			this.solver.setBrush(jQuery(e.target).closest('[data-brush]').data('brush'));
			this.render();
		}
		
		protected onPaletteClicked(e: jQuery.IEvent): void {
			e.preventDefault();
			this.solver.setColor(jQuery(e.target).closest('[data-color]').data('color'));
			this.render();
		}
		
		protected onPaletteContextMenuClicked(e: jQuery.IEvent): void {
			e.preventDefault();
			this.solver.setBackground(jQuery(e.target).closest('[data-color]').data('color'));
			this.render();
		}
		
		protected onKeyDown(e: jQuery.IEvent): void {
			var needRender = false;
			switch (e.which) {
				case 37: // left
					this.solver.shiftLeft();
					needRender = true;
					break;
				case 38: // up
					this.solver.shiftUp();
					needRender = true;
					break;
				case 39: // right
					this.solver.shiftRight();
					needRender = true;
					break;
				case 40: // down
					this.solver.shiftDown();
					needRender = true;
					break;
			}
			if (needRender) {
				e.preventDefault();
				this.render(true);
			}
		}
	}
}