	/*---------------------------------------------------------------------------------------------------------------
	 * 	FUNCOES COMUNS DE JAVASCRIPT
	 *--------------------------------------------------------------------------------------------------------------*/

	/**
	 * Obtem de uma tag <tr/> o 
	 * conteudo de todas as colunas <td/>
	 * @param line (this) de uma <tr/>
	 * @returns
	 */
	function getLineTable(line){
		var values = [];
		
		$(line).closest('tr').find('td').each(function() {
		  	var column = $(this).text().trim();
	        if(column !== ''){
	        	values.push(column);
	        }
	   	});
		return values;
	}

	/**
	 * Formata moeda
	 * @param valor
	 * @returns - retorna o valor formato texto;
	 */
	function formatMoeda(valor){
		return valor.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
	}

	/**
	 * Formata data
	 * @param date
	 * @returns
	 */
	function formatShortDate(strDate){
		return (new Date(strDate)).toLocaleString("pt-BR");
	}

	/**
	 * 
	 * @param flag
	 * @returns
	 */
	function getBooleanIcon(flag){
		if(flag)return checkIcons[0];
		if(!flag)return checkIcons[1];
	}

	/**
	 * 
	 * @param index
	 * @returns
	 */
	function getIcon(index){
		return checkIcons[index];
	}
	
	/**
	 * Não permite a entrada de caracteres nao numericos.
	 * é necessario entrar utilizar no evento ONINPUT
	 * @param input
	 * @returns
	 */
	function onlyNumer(input){
		input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	}
	
	/**
	 * 
	 * @param id
	 * @returns
	 */
	function onkeyUpCurrency(id) {

		$(id).on('input',function(){//evita aparecer texto
			$(this).val( $(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') );
		});

		$(id).keyup(function(){//formata moeda ate 1 trilhao
			var value = $(this).val();

			if(value == '')return;

			var v = value.replace(/\D/g,'');
			v = (v/100).toFixed(2) + '';
			v = v.replace(".", ",");
			v = v.replace(/(\d)(\d{3})(\d{3})(\d{3})(\d{3}),/g, "$1.$2.$3.$4.$5,");
			v = v.replace(/(\d)(\d{3})(\d{3})(\d{3}),/g, "$1.$2.$3.$4,");
			v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
			v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
			$(this).val(v);
		});
	}
	
	/**
	 * @param array
	 * @returns
	 */
	function clearFields(array){
		array.forEach(function(item){
			$(item).val('');
		});
	}
	
	
	/**
	 * Inicializa um array
	 * @param size
	 * @returns
	 */
	function NewArray(size) {
	    var x = [];
	    for (var i = 0; i < size; ++i) {
	        x[i] = i;
	        return x;
	    }
	}
	
	
	/*----------------------------------------------------------------------------------------------------------
		PRIVATE FUNCTIONS
	------------------------------------------------------------------------------------------------------------*/
	
	var checkIcons = [
				'<img class="svg-icon" src="/img/svg/check-square.svg"/>',
				'<img class="svg-icon" src="/img/svg/square.svg"/>',
				'<img class="svg-icon" src="/img/svg/edit.svg"/>'
			]
