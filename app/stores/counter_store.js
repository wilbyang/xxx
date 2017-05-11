import {observable, action, useStrict} from 'mobx'
import api from './api'
useStrict(true);
class CounterStore {
  @observable counter = 0;
  @observable remoteCounter = 0;
  @observable clippings = [];

  constructor() {
  }

  @action increment() {
    this.counter++;
  }

  @action decrement() {
    this.counter--;
  }

  @action incrementAsync() {
    setTimeout(action('0.5s timeout', () => {
      this.counter++;
    }), 500);
  }

  @action getFromRemote() {
    api.get('/story.json')
      .then( action('request my clippings', (r)=> {
        if(r.ok) {
          this.clippings = r.data;
        }
        else
          this.remoteCounter = 'error';
      }));
  }
}

const counterStore = new CounterStore;

export default counterStore;
