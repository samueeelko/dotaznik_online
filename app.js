const questionsDiv = document.getElementById('questions');
//console.log(questionDiv);
const questionDiv = document.createElement('div');
questionDiv.className = 'question';

const label = document.createElement('label');
label.innerText = 'Najviac ma povzbudi blablabla';
label.htmlFor = 'q1';

//rozbalovaci select
const select = document.createElement('select');
select.id = 'q1';
select.name = 'q1';
select.required = true;
select.dataset.cat = 'A';

//moznosti pre select
const emptyOption = document.createElement('option');
emptyOption.value = '';
emptyOption.innerText = '-';
select.appendChild(emptyOption)

for (let i = 1; i <= 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    select.appendChild(option);
}

questionDiv.appendChild(label);
questionDiv.appendChild(document.createElement('br'));
questionDiv.appendChild(select);

questionsDiv.appendChild(questionDiv);