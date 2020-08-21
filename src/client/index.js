import {
    createTrip, getCountdown, getFromPixabayAPI,
    getFromGeonamesAPI, getFromWeatherbit, removeTrip, getFromCountryAPI
} from '../client/js/request';
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


export {
    createTrip,
    getCountdown,
    getFromGeonamesAPI,
    getFromWeatherbit,
    getFromPixabayAPI,
    getFromCountryAPI,
    removeTrip,
};
