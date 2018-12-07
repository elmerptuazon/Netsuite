function scheduledScript(type) {
	var date = new Date();
	var dateFormat = nlapiDateToString(date, 'MM/DD/YYYY');
	var newRecord = nlapiCreateRecord('salesorder');
	newRecord.setFieldValue('entity', '2319');//id of the salesorder customer
	newRecord.setFieldValue('trandate', dateFormat);
	newRecord.setFieldValue('class', '7')
	//access existing sublist
	newRecord.selectNewLineItem('item');//default selection on sublist

	newRecord.setCurrentLineItemValue('item', 'item', '13');//id of item selected
	newRecord.setCurrentLineItemValue('item', 'quantity', '10');
	newRecord.setCurrentLineItemValue('item', 'price', '-1');
	newRecord.setCurrentLineItemValue('item', 'rate', '12.00');

	newRecord.commitLineItem('item');
	nlapiSubmitRecord(newRecord);
}

