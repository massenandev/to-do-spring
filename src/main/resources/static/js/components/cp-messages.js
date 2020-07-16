


function messagePanelError(message){
	showMessageError('#panelMessageID', message);
}

function messagePanelSuccess(message){
	showMessageSuccess('#panelMessageID', message);
}

function messagePanelWarning(message){
	showMessageWarning('#panelMessageID', message);
}


/**
 * 
 * @param targetID
 * @param message
 * @returns
 */
function showMessageError(targetID, message){
	$(targetID).text(message);
	$(targetID).addClass('alert');
	$(targetID).addClass('alert-danger');
	$(targetID).css('display','none');
	$(targetID).fadeIn(1000);
	$(targetID).fadeOut(4000);
}

/**
 * 
 * @param targetID
 * @param message
 * @returns
 */
function showMessageSuccess(targetID, message){
	$(targetID).text(message);
	$(targetID).addClass('alert');
	$(targetID).addClass('alert-success');
	$(targetID).css('display','none');
	$(targetID).fadeIn(1000);
	$(targetID).fadeOut(6000);
	$(targetID).css('margin', '0.1.rem, 0.0.rem, 0.1.rem, 0.0.rem;');
}

/**
 * 
 * @param targetID
 * @param message
 * @returns
 */
function showMessageWarning(targetID, message){
	$(targetID).text(message);
	$(targetID).addClass('alert');
	$(targetID).addClass('alert-warning');
	$(targetID).css('display','none');
	$(targetID).fadeIn(1000);
	$(targetID).fadeOut(6000);
	$(targetID).css('margin', '0.1.rem, 0.0.rem, 0.1.rem, 0.0.rem;');
}