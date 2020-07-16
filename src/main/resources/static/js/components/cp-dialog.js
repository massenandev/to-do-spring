
/**
 * Inicia um dialog.
 * Nao abre o dialog
 * {'modal':'','width':'','close':''}
 * @param dialog
 * @returns
 */
function cpDialogInit(dialog){	
	$('.cp-dialog-content').css('width', dialog.width);
	var span = '.cp-dialog-close';

	$(dialog.close).click(function(){
		$(dialog.modal).css('display','none');
	});
	
	$(span).click(function(){
		$(dialog.modal).css('display','none');
	});
}

/**
 * Inicia e abre um dialog
 * {'modal':'','width':'','open':'','close':''}
 * @param dialogObject
 * @returns
 */
function cpDialog(dialog){	
	$('.cp-dialog-content').css('width', dialog.width);
	var span = '.cp-dialog-close';

	$(dialog.open).click(function(){
		$(dialog.modal).css('display','block');
	});
	
	$(dialog.close).click(function(){
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
function cpCloseDialog(dialogID){
	$(dialogID).css('display','none');
}

/**
 * Abre uma dialog
 * @param modalID
 * @returns
 */
function cpOpenDialog(dialogID){
	$(dialogID).css('display','block');
}