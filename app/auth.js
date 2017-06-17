import { AsyncStorage } from "react-native";
import {fb} from "./stores/api";
export const USER_KEY = "auth-demo-key";
export const USER_UID_KEY = "auth-uid";

export const onSignIn = async () => {
  await AsyncStorage.setItem(USER_KEY, "true");
  console.log("key removed from storage");
}

export const onSignOut = async () => {
  await AsyncStorage.removeItem(USER_UID_KEY);
  console.log("key removed from storage");
}

export const isSignedIn = async () => {
  let result = await AsyncStorage.getItem(USER_UID_KEY);
  console.log(result);
  return result;
}
export const signedInByFirebase = async (email, password) => {
  let result = await fb.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    alert(error.message)
  });
  let setStorageResult = await AsyncStorage.setItem(USER_UID_KEY, result.uid);
  return result.uid;
};

export const createUserWithEmailAndPassword = async (email, password) => {
  let result = await fb.auth().createUserWithEmailAndPassword(email, password);
  return result.uid;
};