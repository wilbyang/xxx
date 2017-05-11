import {observable, action, useStrict} from 'mobx'
import api from './api'
useStrict(true);
class MapMarkerStore {
  @observable counter = 0;
  @observable remoteCounter = 0;

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
    }, 500));
  }

  @action getFromRemote() {
    api.get('/hello')
      .then( action('', (r)=> {
        if(r.ok)
          this.remoteCounter = r.data;
        else
          this.remoteCounter = 'error';
      }));
  }
}

const mapMarkerStore = new MapMarkerStore;

export default mapMarkerStore;
