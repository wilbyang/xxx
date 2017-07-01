import React from "react";
import { createRootNavigator } from "./navigation";
import { isSignedIn, isSignedInByFirebase } from "./auth";
import { observer} from 'mobx-react/native';
import clippingsStore from './stores/clippings_store';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: true
    };
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(clippingsStore.currentUser.uid);
    return <Layout />;
  }
}
