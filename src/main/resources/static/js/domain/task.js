$(document).ready(function(){
	getAllTasksAjax();
	initModalNewTask();
	newTask();
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
				showMessageError('#modalNewID', 'An error has occurred. Please, try again later.');
				console.error('An error has occurred. ' + ex);
			},
		}
	});
}

function newTask(){
	$('#newTaskID').click(function(){
		if(validate() != null ){
			var task = validate();
			newTaskAjax(task);
		}
	});
}


//-------------------------------------------------------------------------------------------------------------------------------
//	PRIVATE FUNCTIONS
//-------------------------------------------------------------------------------------------------------------------------------
function newTaskAjax(task){
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/api/tasks/new',
		data: task,
		cache: false,
		timeOut: 600000,
		contentType: "application/json; charset=utf-8",
		statusCode: {
			200: function(tasks){
				buildTable(tasks);
			},
			500: function(ex){
				console.error('Ocorreu um erro. ' + ex);
			}
		}
	});
}

function initModalNewTask(){
	var modalObject = {'modal':'#modalNewID','width':'30%', 'open':'#btnOpenModalID', 'close':'.cp-modal-close', 'cancel':'#cancelTaskID'};
	var fields      = ['#nameID'];
	cpModal(modalObject, fields);
}

function validate(){
	var name = $('#nameID').val();
	var json = '{"id":"null","name":"null"}';
	var obj  = JSON.parse(json);
	obj.name = name;

	if(name == ''){
		showMessageWarning('#msgNewTask', 'Provide a valid name.');
		return null;
	}else {
		return obj;
	}
}

function buildTable(tasks){
	$('#tbTasksID tbody > tr').remove();
	
	tasks.forEach(function(task){
			var $tr = $('<tr>').append(
				$('<td style="display:none;">').text(task.id),
				$('<td>').text(task.name),
				$('<td>').text(task.createDate),
				$('<td>').text(task.updateDate),
				$('<td>').text(task.active),
			);
		
			$('#tblTasksID').append($tr);
	})
}
