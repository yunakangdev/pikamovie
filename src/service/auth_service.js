import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebase.auth().signInWithPopup(authProvider);
  }
  
  logout() {
    firebase.auth().signOut();
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged(user => {
      onUserChanged(user);
    });
  }

  getUser() {
    const user = firebase.auth().currentUser;
    if (user) {
      // User is signed in
      return user;
    } else {
      // No user is signed in
    }
  }
}

export default AuthService;