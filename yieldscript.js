class generateCreditMemo {
	constructor(filter, column) {
		this.filter = filter;
		this.column = column;
	}


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
		invoice = null;
		nlapiYieldScript();
	};
};

var filter = [new nlobjSearchFilter('status', null, 'anyof', 'CustInvc:A')];
var column = [new nlobjSearchColumn('trandate')];

const credit = new generateCreditMemo(filter, column);

function creditMemo() {
	credit.releaseInvoiceRecord;
}