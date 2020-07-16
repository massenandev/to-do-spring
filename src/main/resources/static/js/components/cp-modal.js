
/**
 * Inicia um dialog.
 * Nao abre o dialog
 * {'modal':'','width':'','open':'','cancel':'', 'fields':[]}
 * @param dialog
 * @returns
 */
function cpModalInit(modal){	
	$('.cp-modal-content').css('width', modal.width);
	var span   = '.cp-modal-close';
	var fields = modal.fields;
	
	$(modal.cancel).click(function(){
		cpClearFieldsModal(modal.fields);
		$(modal.modal).css('display','none');
	});
	
	$(span).click(function(){
		cpClearFieldsModal(modal.fields);
		$(modal.modal).css('display','none');
	});
}

/**
 * Inicia e abre um dialog
 * {'modal':'','width':'','open':'','cancel':'', 'fields':[]}
 * @param dialogObject
 * @returns
 */
function cpModal(modal){	
	$('.cp-modal-content').css('width', modal.width);
	var span = '.cp-modal-close';

	$(modal.open).click(function(){
		$(modal.modal).css('display','block');
	});
	
	$(modal.cancel).click(function(){
		cpClearFieldsModal(modal.fields);
		$(modal.modal).css('display','none');
	});
	
	$(span).click(function(){
		cpClearFieldsModal(modal.fields);
		$(modal.modal).css('display','none');
	});
}

/**
 * Fecha um dialog
 * @param modalID
 * @returns
 */
function cpCloseModal(modalID){
	$(modalID).css('display','none');
}

/**
 * Abre uma dialog
 * @param modalID
 * @returns
 */
function cpOpenModal(modalID){
	$(modalID).css('display','block');
}

/**
 * Limpa os campos
 * @param fields
 * @returns
 */
function cpClearFieldsModal(fields){
	if(fields == null) return;
	fields.forEach(function(field){
		$(field).val('');
	});
}