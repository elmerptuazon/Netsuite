function firstOccurence(type) {
	if(type == 'scheduled') {
		var filters = [
		new nlobjSearchFilter('trandate', null, 'onorafter', 'threeDaysAgo'),
		new nlobjSearchFilter('trandate', null, 'onorbefore', 'today')
		];
		var col = [new nlobjSearchColumn('trandate')];
		var searchResults = nlapiSearchRecord('salesorder', null, filters, col);
		for ( var i = 1; searchResults != null && i <= searchResults.length; i++ )  {
			var newRecord = nlapiCreateRecord('salesorder', {entity: i});
			nlapiSubmitRecord(newRecord);
		}
	}
}

function secondOccurence(type) {
	if(type == 'scheduled') {
		var filters = [
		new nlobjSearchFilter('trandate', null, 'onorafter', 'twoDaysAgo'),
		new nlobjSearchFilter('trandate', null, 'onorbefore', 'today')
		];
		var col = [new nlobjSearchColumn('trandate')];
		var searchResults = nlapiSearchRecord('salesorder', null, filters, col);
		for ( var i = 1; searchResults != null && i <= searchResults.length; i++ )  {
			var newRecord = nlapiCreateRecord('salesorder', {entity: i});
			nlapiSubmitRecord(newRecord);
		}
	}
}