function beforeLoadTask(type) {
	nlapiLogExecution('DEBUG', 'Value: ', type);
	if(type == 'create') {
		nlapiSetFieldValue('requestreadreceipt', 'T');
	}
}