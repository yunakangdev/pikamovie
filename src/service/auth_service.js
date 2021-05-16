import { firebaseAuth, githubProvider, googleProvider } from './firebase';

class AuthService {  
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }
  
  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged(user => {
      onUserChanged(user);
    });
  }

  getUser() {
    const user = firebaseAuth.currentUser;
    if (user) {
      return user;
    } 
  }

  getProvider(providerName) {
    switch(providerName) {
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;