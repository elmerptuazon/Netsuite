function afterSubmit(type) {
	nlapiLogExecution('DEBUG', 'Log: ', type);
	if(type == 'create' || type == 'edit') {
		var recordFile = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());

		var record = nlapiPrintRecord('TRANSACTION', nlapiGetRecordId(), 'PDF');
		
		record.setFolder(232);
		var file = nlapiSubmitFile(record);


		recordFile.setFieldValue('custbody_pdf_attachment_elmer', file);
		nlapiSubmitRecord(recordFile);
	}
}