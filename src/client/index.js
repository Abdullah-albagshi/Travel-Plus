import './css/main.scss';
import './css/all.css';
import './css/bootstrap.min.css';
import './css/style.css';
import './js/request';
import  './js/jquery-1.12.1.min';
import './img/favicon.png';





const print = document.getElementById('print');
print.addEventListener('click', () => {
    window.print();
});

const create = document.getElementById('create');
create.addEventListener('click', createTrip);

const remove = document.getElementById('remove');
remove.addEventListener('click', removeTrip);

const select = document.getElementById('destination');

// Add select country
const response = fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data =>
        data.forEach(d => {
            let option = document.createElement("option");
            option.text = d.name;
            select.add(option);
        }));




