const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');

const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		const inputValue = input.previousElementSibling.innerText;
		showError(input, `${inputValue.slice(0, -1)} składa się z min. ${min} znaków.`);
	}
};

const checkPass = () => {
	if (pass.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują.');
	}
};

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'Adres e-mail jest niepoprawny.');
	}
};

const checkErrors = () => {
	const allFormBoxes = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allFormBoxes.forEach(box => {
		if (box.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();
	checkForm([username, pass, pass2, email]);
	checkLength(username, 3);
	checkLength(pass, 8);
	checkPass(pass, pass2);
	checkEmail(email);
	checkErrors();
});

clearBtn.addEventListener('click', e => {
	e.preventDefault();
	[username, pass, pass2, email].forEach(el => {
		el.value = '';
		clearError(el);
	});
});
