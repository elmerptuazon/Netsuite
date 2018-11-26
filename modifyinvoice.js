function afterSubmit(type) {
	nlapiLogExecution('DEBUG', 'Log: ', type);
	if(type == 'create' || type == 'edit') {
		var recordFile = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());

		var record = nlapiPrintRecord('TRANSACTION', nlapiGetRecordId(), 'PDF');//get file to process
		
		record.setFolder(232);
		var file = nlapiSubmitFile(record);//put processed file into file cabinet


		recordFile.setFieldValue('custbody_pdf_attachment_elmer', file);//put file into field only
		nlapiSubmitRecord(recordFile);//commit changes permanently
	}
}