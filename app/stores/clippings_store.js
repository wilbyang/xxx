import {observable, action, useStrict} from 'mobx'
import {api, fb} from './api'
useStrict(true);
class ClippingsStore {
  @observable counter = 0;
  @observable remoteCounter = 0;
  @observable clippings = [];
  @observable user = {};
  @observable errorMsg = "";
  @observable loading = false;

  constructor() {
    fb.auth().onAuthStateChanged(action('user status monitoring', (user)=> {
        if (user) {
          this.user = user;
        } else {
          this.user = {};
        }
      })
    );
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
    this.loading = true;
    api.get('/story.json')
      .then( action('request my clippings', (r)=> {
        if(r.ok) {
          this.clippings = r.data;
          this.loading = false;
        }
        else {
          this.remoteCounter = 'error';
        }
      }));
  }
  @action signInWithEmailAndPassword(email, password) {
    fb.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      this.errorMsg = error.message;
      //alert(error.message)
    });
  }
  @action signOut() {
    fb.auth().signOut().catch(function (error) {
      this.errorMsg = error.message;
      //alert(error.message)
    });
  }



}

const clippingsStore = new ClippingsStore;

export default clippingsStore;
