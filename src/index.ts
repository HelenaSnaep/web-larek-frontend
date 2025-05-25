import './scss/styles.scss';

import { LarekApi }   from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants'
import { EventEmitter } from './components/base/events';
import { AppData } from './components/AppData';


const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL);

const appData = new AppData(events);

events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

api.getProductList().then(response => {
  appData.setItems(response.items); 
});

