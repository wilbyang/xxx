import {observable, action, useStrict} from 'mobx'
import {api, fb} from './api'
useStrict(true);
class ClippingsStore {
  @observable counter = 0;
  @observable remoteCounter = 0;
  @observable clippings = [];
  @observable user = {};
  @observable errorMsg = {};

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
  @action signInWithEmailAndPassword(email, password) {
    fb.auth().signInWithEmailAndPassword(email, password)
      .then( action('signed in', (r)=> {
        let {email, emailVerified, phoneNumber, photoURL, uid, refreshToken} = r;
        this.user = {email, emailVerified, phoneNumber, photoURL, uid, refreshToken};
      })).catch(function (error) {
      this.errorMsg = error.message;
      alert(error.message)
    });
  }
  @action signOut() {
    fb.auth().signOut()
      .then( action('signed out', (r)=> {
        this.user = {};
      })).catch(function (error) {
      this.errorMsg = error.message;
      alert(error.message)
    });
  }
}

const clippingsStore = new ClippingsStore;

export default clippingsStore;
