import { createTrip, removeTrip } from '../client/js/request';
import '../client/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';






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




