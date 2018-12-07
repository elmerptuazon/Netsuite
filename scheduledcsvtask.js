class generateCreditMemo {
	constructor() {
		this.filter = [
			new nlobjSearchFilter('status', null, 'anyof', 'CustInvc:A'),
			new nlobjSearchFilter('amountremainingtotalbox', null, 'lessthanorequalto', '1')
		];
		this.column = [
			new nlobjSearchColumn('entity'),
			new nlobjSearchColumn('trandate'),
			new nlobjSearchColumn('entity'),
			new nlobjSearchColumn('tranid'),
			new nlobjSearchColumn('currencyname'),
			new nlobjSearchColumn('amountpaid'),
			new nlobjSearchColumn('amountremaining'),
			new nlobjSearchColumn('amountremainingtotalbox')
		];
	};


	get releaseInvoiceRecord() {
		return this.getInvoiceRecord();
	};

	getInvoiceRecord() {
		var invoice = nlapiSearchRecord('invoice', null, this.filter, this.column);
		if(invoice !== null) {	
			for(var i = 0; i < invoice.length; i++) {
				var creditMemo = nlapiTransformRecord('invoice', invoice[i].getId(), 'creditmemo');
				var testThis = (nlapiSubmitRecord(creditMemo) !== null) ? 'Success' : 'Failed';
				nlapiLogExecution('DEBUG', 'Check if submitted: ', testThis);
			}
		};
	};
};

const credit = new generateCreditMemo();

function creditMemo() {
	credit.releaseInvoiceRecord;
}

