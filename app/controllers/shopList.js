var content = require('getElenco');

function openPage(e) {
	var tabViewPage = Alloy.createController('page', {
								id: e.row.id,
								title: e.row.title
							}).getView();

	if(Ti.Platform.osname === 'android') tabViewPage.open();
	else $.nav.open(tabViewPage, {animated:true});
}

function refreshPunti() {
	content.loadElenco({
		success: function(data) {
			var rows = [];
			_.each(data, function(item) {
				rows.push(Alloy.createController('row', {
					id: item.id,
					title: item.title,
					img: item.img
				}).getView());
			});
			$.table.setData(rows);
			$.activityIndicator.hide();
			$.view1.remove($.activityIndicator);
		}
	});
}

$.activityIndicator.show();
refreshPunti();