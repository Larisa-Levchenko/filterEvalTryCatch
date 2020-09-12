const filterByType = (type, ...values) => values.filter(value => typeof value === type), //функция принимает тип данных и данные
	//функция возвращает данные, которые соответствуют типу данных 

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //получаем со страницы элементы
		responseBlocksArray.forEach(block => block.style.display = 'none'); //скрываем, полученные элементы
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks(); //вызов функции hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; //показываем блок		
		if (spanSelector) { //если в функцию передан селектор
			document.querySelector(spanSelector).textContent = msgText; //записать текст в элесмент с данным селектором
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //функция вывода сообщения о ошибке

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //функция вывода результатов

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //функция выводит пустой блок вывода результатов

	tryFilterByType = (type, values) => {
		try { //код функции
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //вызов функции filterByType
			//преобразует массив данных полученных от функции filterByType в строку и записывает в переменную valuesArray			
			const alertMsg = (valuesArray.length) ? //если длина valuesArray не равна 0, то есть есть данные
				`Данные с типом ${type}: ${valuesArray}` : //записываем в переменную alertMsg данные
				`Отсутствуют данные типа ${type}`; //записываем в переменную alertMsg сообщение об отсутствии данных 
			showResults(alertMsg); //вызов функции вывода результатов, передаем функции alertMsg
		} catch (e) { //данный блок срабатывает при ошибке, в блоке try			
			showError(`Ошибка: ${e}`); //вызов функции вывода сообщения об ошибке, передаем функции код ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); //получаем со страницы элемент с селектором #filter-btn (id='filter-btn')

filterButton.addEventListener('click', e => { //добавляем слушатель на элемент filterButton, который по клику запускает функцию
	const typeInput = document.querySelector('#type'); //получаем со страницы элемент с селектором #type (id='type')
	const dataInput = document.querySelector('#data'); //получаем со страницы элемент с селектором #data (id='data')

	if (dataInput.value === '') { //если пользователь не ввел данные в инпут dataInput, то
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //сообщаем пользователю о ошибке (необходимо ввести данные)
		showNoResults(); //вызов функции showNoResults
	} else { //если условие не выполнилось
		dataInput.setCustomValidity(''); //пользователь ввел данные,поэтому не нужно выводить сообщение о ошибке
		e.preventDefault(); //отменяем стандартное поведение браузера
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызов функции tryFilterByType, передаем введенные пользователем данные,
		//с помощью метода trim удаляем лишние пробелы 
		//не совсем понимаю зачем использовать trim для typeInput.value
		//там реальзован select с готовыми value, думаю trim в данном случае можно удалить
	}
});