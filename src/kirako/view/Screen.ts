/// <reference path='../../../lib/illa/Arrkup.ts'/>

/// <reference path='Widget.ts'/>

module kirako.view {
	export class Screen extends Widget {
		
		kirako: jQuery.IInstance;
		palette: jQuery.IInstance;
		brushes: jQuery.IInstance;
		
		constructor(jq: jQuery.IInstance) {
			super(jq);
			
			this.getJQuery().html(illa.Arrkup.createString([
				['div', {'class': 'ko-brushes', 'data-name': 'brushes'}],
				['div', {'class': 'ko-palette', 'data-name': 'palette'}],
				['div', {'class': 'ko-kirako-wrapper'},
					['div', {'class': 'ko-kirako', 'data-name': 'kirako'}],
				]
			]));
			
			this.initJqs();
		}
	}
}