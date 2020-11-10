import './styles.css';
import cardTpl from './template/country-card.hbs';
import listTpl from './template/country-list.hbs';
import fetchCountries from './js/fetchCountries';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, Stack} from "@pnotify/core";
const debounce = require('lodash.debounce');
const stackBottomModal = new Stack({
  modal: false,
});
const refs = {
    searchInput: document.querySelector('.js-search-input'),
    cardContainer: document.querySelector('.list-countries')
}

refs.searchInput.addEventListener('input', debounce(onInput,500))

function onInput(e) {
    const search = e.target.value;
   
    if (search === '') {
        refs.cardContainer.innerHTML = '';
        return;
        }
    
    fetchCountries(search)
        .then(cards => {
    
        if (cards.status === 404) {
            refs.cardContainer.innerHTML = '';
            return;
        }
        
        if (cards.length > 10) {
            refs.cardContainer.innerHTML = '';
            notice();
            return;
        }
            if (cards.length > 1) {
            appendListMarkup(cards);
            return;
        }
            appendCountryMarkup(...cards);
        })
}

function appendCountryMarkup(cards) {
    refs.cardContainer.innerHTML = cardTpl(cards);
}
function appendListMarkup(cards) {
    refs.cardContainer.innerHTML = listTpl(cards);
}

function notice() {
  alert({
    title: "To many matches found. Please enter a more specific query!",
    width: "340px",
    type: ["error"],
    stack: stackBottomModal,
    delay:1000
  });
}
