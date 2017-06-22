import {observable, action, useStrict} from 'mobx'
import {api, firebaseApp} from './api'



useStrict(true);


const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;




class ClippingsStore {
  @observable counter = 0;
  @observable remoteCounter = 0;
  @observable clippings = [];
  @observable user = {};
  @observable errorMsg = "";
  @observable loading = false;
  @observable artistIndex = 0;


  constructor() {
    firebaseApp.auth().onAuthStateChanged(action('user status monitoring', (user)=> {
        if (user) {
          this.user = user;
        } else {
          this.user = {};
        }
      })
    );
  }



  @action facebookMe() {
    const infoRequest = new GraphRequest(
      '/me',
      null,
      action("facebook me", (error, result) => {
        console.log("xxhh")
        if (error) {
          alert('Error fetching data: ' + error.toString());
          console.log(error)
        } else {
          alert('Success fetching data: ' + result.toString());
          console.log(result)
        }
      })
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }


  @action setArtistIndex(index) {
    this.artistIndex = index;
  }


  @action decrement() {
    this.counter--;
  }

  @action incrementAsync() {
    setTimeout(action('0.5s timeout', () => {
      this.counter++;
    }), 500);
  }

  @action getClippings() {
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
    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      this.errorMsg = error.message;
      //alert(error.message)
    });
  }
  @action signOut() {
    firebaseApp.auth().signOut().catch(function (error) {
      this.errorMsg = error.message;
      //alert(error.message)
    });
  }



}

const clippingsStore = new ClippingsStore;

export default clippingsStore;
