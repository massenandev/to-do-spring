
/**
 * Inicia um dialog.
 * Nao abre o dialog
 * {'modal':'','width':'','cancel':''}
 * @param dialog
 * @returns
 */
function cpConfirmDialogInit(dialog){	
	$('.cp-confirm-dialog-content').css('width', dialog.width);
	var span = '.cp-confirm-dialog-close';

	$(dialog.cancel).click(function(){
		$(dialog.modal).css('display','none');
	});
	
	$(span).click(function(){
		$(dialog.modal).css('display','none');
	});
}

/**
 * Inicia e abre um dialog
 * {'modal':'','width':'','open':'','cancel':''}
 * @param dialogObject
 * @returns
 */
function cpConfirmDialog(dialog){	
	$('.cp-confirm-dialog-content').css('width', dialog.width);
	var span = '.cp-confirm-dialog-close';

	$(dialog.open).click(function(){
		$(dialog.modal).css('display','block');
	});
	
	$(dialog.cancel).click(function(){
		$(dialog.modal).css('display','none');
	});
	
	$(span).click(function(){
		$(dialog.modal).css('display','none');
	});
}

/**
 * Fecha um dialog
 * @param modalID
 * @returns
 */
function cpConfirmCloseDialog(dialogID){
	$(dialogID).css('display','none');
}

/**
 * Abre uma dialog
 * @param modalID
 * @returns
 */
function cpConfirmOpenDialog(dialogID){
	$(dialogID).css('display','block');
}