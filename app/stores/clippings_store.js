import {observable, action, useStrict} from 'mobx'
import {api, firebaseApp} from './api'
import ClippingListItem from './clipping'
import Secret from './secret'


useStrict(true);


const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;




class ClippingsStore {
  @observable counter = 0
  @observable remoteCounter = 0
  @observable clippings = []
  @observable secrets = []
  @observable currentUser = {}
  @observable errorMsg = ""
  @observable loading = false
  @observable artistIndex = 0

  constructor() {
    firebaseApp.auth().onAuthStateChanged(action('onAuthStateChanged', (user)=> {
        if (user) {
          let {email, emailVerified, phoneNumber, photoURL, uid, refreshToken} = user;
          this.currentUser = {email, emailVerified, phoneNumber, photoURL, uid, refreshToken};
        } else {
          this.currentUser = {}
        }
      })
    )
  }

  @action async getFreshSecrets(timestamp) {
    this.loading = true
    let userFocus = {}

    let userRef = firebaseApp.database().ref(`user/${this.currentUser.uid}`)
    await userRef.once("value").then(action("getUserProfile", (snapshot) => {
      userFocus = snapshot.val().focus
    }))
    let that = this
    let promises = []
    Object.keys(userFocus).forEach(function (item) {
      userFocus[item].forEach(function (i) {
        let path = `secret/${item}/${i}`;
        let secretsRef = firebaseApp.database().ref(path);
        promises.push(secretsRef.orderByChild('date').startAt(timestamp).once("value", action(path, (snapshot) => {
          let commingSecrets = []
          snapshot.forEach(function(childSnapshot) {
            let {txt, user, image, date} = childSnapshot.val()
            let key = childSnapshot.key
            commingSecrets.push({txt, user, image, key, date})
          })
          that.secrets = that.secrets.slice().concat(commingSecrets)
        })))
      })
    })
    Promise.all(promises).then(action("loadFinished",  (t) => {
      this.loading = false
    })).catch(err => {
      console.log(err)
    })
  }

  @action postSecret(topic) {
    let secretsRef = firebaseApp.database().ref("topic/".concat(topic));
    secretsRef.push({txt:"已经结婚的来聊聊感情", image:'', user:clippingsStore.currentUser.uid});
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
      .then( action('request my clippings', (r) => {
        if(r.ok) {
          this.clippings = r.data.map((item) => {
            let i = new ClippingListItem()
            i.Content = item.Content
            i.expanded = false
            i.Date = item.Date
            return i
          });
          this.loading = false
        }
        else {
          this.remoteCounter = 'error'
        }
      }));
  }
  @action signInWithEmailAndPassword(email, password) {
    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      this.errorMsg = error.message
      //alert(error.message)
    });
  }
  @action signOut() {
    firebaseApp.auth().signOut().catch(function (error) {
      this.errorMsg = error.message
      //alert(error.message)
    });
  }
}

const clippingsStore = new ClippingsStore

export default clippingsStore
