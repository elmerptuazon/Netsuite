function form(request , response) {
	if(request.getMethod() == 'GET') {
		var form = nlapiCreateForm('Invoice');
		//create button
		var filter = [
		new nlobjSearchFilter('status', null, 'anyof', 'CustInvc:A'),//for filtering choices
		new nlobjSearchFilter('mainline', null, 'is', 'T') 
		];
		form.setScript('customscript_elmer_invoice_test_cs');
		form.setTitle('Open Invoices');
		form.addSubmitButton('Submit');
		form.addResetButton('Reset');
		//script for onlick should be string
		form.addButton('custpage_filter', 'Filter','suiteScript()');
		//create fields
		var fieldgroup = form.addFieldGroup('custpage_fieldgroup', 'Filters');
		form.addField('custpage_customer', 'select', 'Customer', 'customer', 'custpage_fieldgroup').setLayoutType('normal', 'none');
		form.addField('custpage_startdate', 'date', 'Start Date',null, 'custpage_fieldgroup').setLayoutType('normal', 'startcol');
		form.addField('custpage_enddate', 'date', 'End Date', null,'custpage_fieldgroup').setLayoutType('normal', 'startcol');
		fieldgroup.setShowBorder(true);
		//create sub list
		var formsublist = form.addSubList('custpage_formsublist','list', 'Invoice List');
		formsublist.addMarkAllButtons();
		formsublist.addField('selectid', 'checkbox', 'SELECT');
		formsublist.addField('id', 'text', 'ID');
		formsublist.addField('documentid', 'text', 'DOCUMENT #');
		formsublist.addField('dateid', 'text', 'DATE');
		formsublist.addField('customerid', 'text', 'CUSTOMER');
		formsublist.addField('purchaseid', 'text', 'PURCHASE #');
		formsublist.addField('statusid', 'text', 'STATUS');
		formsublist.addField('startdateid', 'text', 'START DATE');
		formsublist.addField('enddateid', 'text', 'END DATE');

		// formsublist.setLineItemValue('selectid',1, 'T');
		// formsublist.setLineItemValue('selectid',1, record[0].getValue);

		if(request.getParameter('customer') !== null) {
			var customer = request.getParameter('customer');
			filter.push(new nlobjSearchFilter('entity', null, 'is',customer));
		}
		if(request.getParameter('startdate') !== null) {
			var start = request.getParameter('startdate');
			filter.push(new nlobjSearchFilter('trandate', null, 'onorafter',start));
		}
		if(request.getParameter('enddate') !== null) {
			var endDate = request.getParameter('enddate');
			filter.push(new nlobjSearchFilter('trandate', null, 'onorbefore',endDate));
		}

			var col = [new nlobjSearchColumn('entity'), new nlobjSearchColumn('trandate'), new nlobjSearchColumn('externalid'), new nlobjSearchColumn('message'), new nlobjSearchColumn('otherrefnum'), 
			new nlobjSearchColumn('status'), new nlobjSearchColumn('tranid')];
			//display filtered search
			var record = nlapiSearchRecord('invoice', null, filter, col);
			if(record !== null) {
				for(var i = 1; i<record.length; i++) {
					formsublist.setLineItemValue('selectid',i, 'F');
					formsublist.setLineItemValue('id',i, record[i].getId());//getId automatic
					formsublist.setLineItemValue('documentid',i, "<a href='"+nlapiResolveURL('RECORD','invoice',record[i].getId())+"'>"+record[i].getValue('tranid')+"</a>");
					formsublist.setLineItemValue('dateid',i, record[i].getValue('trandate'));
					formsublist.setLineItemValue('customerid',i, record[i].getValue('externalid'));
					formsublist.setLineItemValue('purchaseid',i, record[i].getValue('otherrefnum'));
					formsublist.setLineItemValue('statusid',i, record[i].getValue('externalid'));
					formsublist.setLineItemValue('startdateid',i, record[i].getValue('trandate'));
					formsublist.setLineItemValue('enddateid',i, record[i].getValue('trandate'));

					
				}
			}
		response.writePage(form);
	}

	if(request.getMethod() == 'POST') {
		var subList = request.getLineItemCount('custpage_formsublist');
		var startPDF = nlapiCreateTemplateRenderer();
		var xmlExternal = nlapiGetContext().getSetting('SCRIPT', 'custscript_custpage_xmlexternal');
		var xml = '<?xml version="1.0"?>\n<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n<pdfset>\n';
		startPDF.setTemplate(xmlExternal);
		for(var i = 1; i<subList; i++) {
			var selectedItem = request.getLineItemValue('custpage_formsublist', 'selectid', i);
			if(selectedItem == 'T') {
				var checkedItem = request.getLineItemValue('custpage_formsublist','id', i);
				var record = nlapiLoadRecord('invoice', checkedItem);
				startPDF.addRecord('var', record);
				xml += startPDF.renderToString();
				// var pdf = nlapiXMLToPDF(xml);
			}
		}
		xml += '</pdfset>';
		response.renderPDF(xml);
	}
}

function suiteScript() {		//SUITELET SCRIPTID, SCRIPTDEPLOYMENTID
	var url = nlapiResolveURL('SUITELET', 'customscript_elmer_invoice_test_sl', 'customdeploy_elmer_invoice_test_sl');
								//IF INVOICE, RECORD TYPE, RECORDID
	var customer = '&customer='+nlapiGetFieldValue('custpage_customer');
	var start ='&startdate='+nlapiGetFieldValue('custpage_startdate');
	var endDate = '&enddate='+nlapiGetFieldValue('custpage_enddate');
	window.location.href = url + customer + start + endDate;
}