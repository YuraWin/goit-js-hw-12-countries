import './styles.css';
import cardTpl from './template/country-card.hbs';
import listTpl from './template/country-list.hbs';
import fetchCountries from './js/fetchCountries';
const debounce = require('lodash.debounce');

const refs = {
    searchInput: document.querySelector('.js-search-input'),
    cardContainer: document.querySelector('.list-countries')
}

refs.searchInput.addEventListener('input', debounce(onInput,500))

function onInput(e) {
    const search = e.target.value;

    console.log(search); // стереть для проверки

    fetchCountries(search)
        .then(cards => {
        console.log(cards);
        
        if (cards.length > 20) {
            console.log('кол-во больше 20')
            return;
        }
            if (cards.length > 1) {
                appendListMarkup(cards);
            console.log('кол-во до 20')
            return;
        }
        appendCountryMarkup(cards[0])
        })
        .catch(e => {
            console.log(e);
            refs.cardContainer.innerHTML = '';
        });
}

function appendCountryMarkup(cards) {
    refs.cardContainer.innerHTML = cardTpl(cards);
}
function appendListMarkup(cards) {
    refs.cardContainer.innerHTML = listTpl(cards);
}
