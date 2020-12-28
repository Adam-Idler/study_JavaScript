const filterByType = (type, ...values) => values.filter(value => typeof value === type), // Функция которая получает выбранный тип данных и 
  // соотносит его с данными введеными пользователями. Возвращает массив 

	hideAllResponseBlocks = () => { // Функция скрывающая все блоки с ответом
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получение всех блоков, содержащих ответ, в массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); // скрывает каждый элемент
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // функция вывода блока с ответом
		// Параметы: 
		// blockSelector - селектор того элемента, что нужно вывести
		// msgText - переменная для текста внутри выводимого элемента
		// spanSelector - селектор для текста, который нужно вывести
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block'; // Делает видимым блок с селектром blockSelector
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText; // Если был передан spanSelector то текст внутри него присваиваем значению переменной msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // Функция для вывода ответа с ошибкой

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // Функция если ответ без ошибки

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // Функция если выводить нечего

	tryFilterByType = (type, values) => { // Функция получает, выбранный пользователем тип и введеные данные
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // Получение строки с данными, введеными в поле, которые соответствуют выбранному типу
			const alertMsg = (valuesArray.length) ? // В переменную запишется строка в зависимости от содержимого строки valuesArray
				`Данные с типом ${type}: ${valuesArray}` : // если строка valuesArray не пустая, то вывести ее содержимое
				`Отсутствуют данные типа ${type}`; // если пустая (нет данных соответствующих выбранному типу), вывести что данных такого типа нет
			showResults(alertMsg); // Выведет результат
		} catch (e) {
			showError(`Ошибка: ${e}`); // Если пользователь ввел данные с ошибками, то приложение продолжит работу, но выведет ошибку, совершенную пользователем в блоке вывода результата
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получение кнопки для запуска скрипта

filterButton.addEventListener('click', e => { //навешивание слушателя событий по клику на полученную кнопку
	const typeInput = document.querySelector('#type'); // получения поля с выбранным типом данных
	const dataInput = document.querySelector('#data'); // получене введеных данныхъ

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // если поле пустое, то сообщить об этом пользователю
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // Вызов функции для обработки введеных данных с переданным содержимым полей ввода
	}
});

