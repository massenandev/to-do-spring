//INITIALIZE
$(document).ready(function(){
	getAllTasksAjax();
	initModalCadastro();
	initDialogStatus();
	cadastrar();
	alterarStatus();
	initModalAtualizar();
	confirmarAtualizacao();
});

// [ PUBLIC FUNCTION ] -------------------------------------------------------------------------------//

var PARAMS = null;

function getAllTasksAjax(){
	$.ajax({
		type:'GET',
		url: 'http://localhost:8080/api/tasks/listar',
		cache: false,
		timeOut: 600000,
		contentType: 'json',
		statusCode: {
			200: function(tasks){
				buildTable(tasks);
			},
			500: function(ex){
				console.error('Ocorreu um erro.' + ex);
			}
		}
	});
}

function cadastrar(){
	$('#cadastraUsuarioID').click(function(){
		if(validarCadastro()){
			var perfil   = $('#perfilCadID option:selected').text();
			var username = $('#usrnameCadID').val();
			var task  = '{"perfil":"'+perfil+'","senha":"123456","username":"'+username+'"}';
			cadastrarUsuarioAjax(task);
			cpCloseModal('#modalCadUsuarioID');
		}
	});
}

function validarCadastro(){
	var perfil   = $('#perfilCadID option:selected').text();
	var username = $('#usrnameCadID').val();
	
	if(perfil == 'Selecione' | username == ''){
		showMessageWarning('#msgCadUsuario', 'Informe todos os campos.');
		return false;
	} else {
		return true;
	}
}

function exibirMdUsuario(line){
	var values = getLineTable(line);
	PARAMS 	   = values[0];
	cpOpenModal('#modalAtualizaUsuarioID');
}

function alterarStatus(){
	$('#confirmarAtivoID').click(function(){
		var status = PARAMS[1] ? false : true;
		atualizarStatus(PARAMS[0], status);
		cpConfirmCloseDialog('#dialogStatusID');
	});
}

function exibirDialogStatus(obj, ativo){
	var valores = getLineTable(obj);
	var msg     = ativo ? 'Deseja desativar o task?' : 'Deseja ativar o task?';  
	PARAMS      = [];
	
	PARAMS.push(Number(valores[0]));
	PARAMS.push(ativo);
	$('#questionID').text(msg);
	cpConfirmOpenDialog('#dialogStatusID');
}


// [ PRIVATE FUNCTIONS ] -------------------------------------------------------------------------------------------/
function atualizarStatus(id, status){
	$.ajax({
		type:'PUT',
		url: 'http://localhost:8080/api/tasks/status/'+status+'/id/'+id,
		cache: false,
		timeOut: 600000,
		contentType: "text/html; charset=utf-8",
		statusCode: {
			200: function(tasks){
				buildTable(tasks);
				var msg = status ? 'Usuario ativado com sucesso.' : 'Usuario desativado com sucesso';
				messagePanelSuccess(msg);
			},
			500: function(ex){
				messagePanelError('Ocorreu um erro no sistema, tente mais tarde.');
				console.error('Ocorreu um erro no sistema.' + ex.status);
			}
		}
	});
}


function cadastrarUsuarioAjax(task){
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
				messagePanelSuccess('Task created successfully.');
			},
			500: function(ex){
				messagePanelError('An error has occurred. Try again later.');
				console.error('An error has occurred. ' + ex);
			}
		}
	});
}

function initModalCadastro(){
	var fields = ['#usrnameCadID'];
	var modal  = {'modal':'#modalCadUsuarioID','width':'16%','open':'#btnAbrirModalID','cancel':'#cancelaUsuarioID','fields':fields};
	cpModal(modal);
}

function initModalAtualizar(){
	var modal  = {'modal':'#modalAtualizaUsuarioID','width':'16%','open':'#btnAbrirModalID','cancel':'#cancelaAtualizaUsuarioID','fields':null};
	cpModalInit(modal);
}

function initDialogStatus(){
	var obj = {'modal':'#dialogStatusID','width':'14%','cancel':'#closeAtivoID'};
	cpConfirmDialogInit(obj);
}


/**
 * Valida o cadastro da cidade
 * @returns
 */
function validate(){
	var username = $('#usrnameID').val();
	
	if(username	 == ''){
		showMessageWarning('#msgCadUsuario', 'Informe todos os campos.');
		return null;
	}else {
		return '{"id":"'+id+'","username":"'+username+'"}';
		
	}
}
/**
 * Show tasks table
 * @param tasks
 * @returns
 */

function buildTable(tasks){
	$('#tblTasksID tbody > tr').remove();
	
	tasks.forEach(function(tas){ 	
			var $tr = $('<tr>').append(
               $('<td style="display:none;">').text(tas.id),
               $('<td>').text(tas.name),
           	   $('<td>').html(getBooleanIcon(tas.active)),
           	   $('<td>').text(formatShortDate(tas.createDate)),
           	   $('<td>').text(formatShortDate(usr.updateDate)),
           	   $('<td onclick="exibirDialogStatus(this, '+tas.active+')">').html($('<a href="#"></a>').append(getBooleanIcon(tas.active))),
           	   $('<td onclick="exibirMdUsuario(this)">').html($('<a href="#"></a>').prepend(getIcon(2)))
	        );
		 	
		$('#tblTasksID').append($tr);
	});
}

function configBotaoLabel(id){
	if(id != '' && id != null){
		$('#cadastraUsuarioID').text('Atualizar');
	}else {
		$('#cadastraUsuarioID').text('Cadastrar');
	}
}