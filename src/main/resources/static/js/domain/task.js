$(document).ready(function(){
	getAllTasksAjax();
	initInsertModal();
	insertTask();
});

function getAllTasksAjax(){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/tasks/all',
		cache: false,
		timeOut: 600000,
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(data){
				buildTable(data);
			},
			500: function(ex){
				messagePanelError('An error has occurred. Plase, try again later.');
				console.error('An error has occurred. ' + ex);
			},
		}
	});
}

function insertTask(){
	$('#insertTaskID').click(function(){
		if( validate(null) != null ){
			var id = $('#hiddenID').val();
			
			if(id == ''){// new
				var task = validate(null);
				insertTaskAjax(task);
				cpCloseModal('#modalInsertTaskID');
				setLabelButton(null);
				
			}else {// update
				var task = validate(id);
				updateTaskAjax(task);
				cpCloseModal('#modalInsertTaskID');
				setLabelButton(null);
			}
			
		}
	});
}


function updateTask(line){
	var values = getLineTable(line);
	$('#nameID').val(values[1]);
	$('#hiddenID').val(values[0]);
	setLabelButton(values[0]);
	cpOpenModal('#modalInsertTaskID');
}

function updateStatus(){
	$('#confirmActiveID').click(function(){
		var status = PARAMS[1] ? false : true;
		updateStatus(PARAMS[0], status);
		cpConfirmCloseDialog('#dialogStatusID');
	});
}

function showDialogStatus(obj, active){
	var values  = getLineTable(obj);
	var msg     = active ? 'Do you wish to activate this task?' : 'Do you wish to deactivate this task?';  
	PARAMS      = [];
	
	PARAMS.push(Number(values[0]));
	PARAMS.push(active);
	$('#questionID').text(msg);
	cpConfirmOpenDialog('#dialogStatusID');
}

//-----------------------------------------------------------------------------------------------------------------------------------------
//	 PRIVATE FUNCTIONS 
//-----------------------------------------------------------------------------------------------------------------------------------------
function insertTaskAjax(task){
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/tasks/new',
		data: task,
		cache: false,
		timeOut: 600000,
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(tasks){
				buildTable(tasks);
				messagePanelSuccess('Task created successfully.');
			},
			500: function(ex){
				messagePanelError('An error has occurred. Please, try again later.');
				console.error('An error has occurred. ' + ex);
			}
		}
	});
}

function updateTaskAjax(task){
	$.ajax({
		type: 'PUT',
		url: 'http://localhost:8080/tasks/update',
		data: task,
		cache: false,
		timeOut: 600000,
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(tasks){
				buildTable(tasks);
				messagePanelSuccess('Task updated successfully.');
			},
			500: function(ex){
				messagePanelError('An error has occurred. Plase, try again later.');
				console.error('An error has occurred. ' + ex.status);
			}
		}
	});
}

/**
 * Prepare/executes modal task
 * @returns
 */
function initInsertModal(){
	var fields = ['#nameID'];
	var modal  = {'modal':'#modalInsertTaskID','width':'16%','open':'#btnAbrirModalID','cancel':'#cancelTaskID','fields':fields};
	cpModal(modal);
}

/**
 * Validate the task name
 * @returns
 */
function validate(){
	var name = $('#nameID').val();
	
	if(name == ''){
		showMessageWarning('#msgInsertTask', 'Please, provide a valid name.');
		return null;
	}else {
		return '{"id":"'+id+'","name":"'+name+'"}';
		
	}
}

/**
 * Build the task table
 * @param tasks
 * @returns
 */
function buildTable(tasks){
	$('#tblTasksID tbody > tr').remove();
	
	tasks.forEach(function(tas){
		var $tr = $('<tr>').append(
			$('<td style="display:none;">').text(tas.id),
			$('<td>').text(tas.name),
        	   $('<td>').text(formatShortDate(tas.createDate)),
           	   $('<td>').text(formatShortDate(tas.updateDate)),
           	   $('<td onclick="showDialogStatus(this, '+tas.active+')">').html($('<a href="#"></a>').append(getBooleanIcon(tas.active))),
           	   $('<td onclick="showMdTask(this)">').html($('<a href="#"></a>').prepend(getIcon(2))),
			$('<td onclick="updateTask(this)">').html($('<a href="#"></a>').prepend(getIcon(2)))
		);
		
	    $('#tblTasksID').append($tr);
	})
}

function setLabelButton(id){
	if(id != '' && id != null){
		$('#insertTaskID').text('Update');
	}else {
		$('#insertTaskID').text('Insert');
	}
}