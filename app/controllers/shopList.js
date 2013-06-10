var content = require('getElenco');

function openPage(e) {
	var tabViewPage = Alloy.createController('page', {
								id: e.row.id,
								title: e.row.title
							});

	tabViewPage.getView().open();
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
			$.shopList.remove($.activityIndicator);
		}
	});
}

$.activityIndicator.show();
refreshPunti();