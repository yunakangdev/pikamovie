import firebaseApp from './firebase';

class NomineesRepository {
  saveNominee(userId, nominee) {
    firebaseApp.database().ref(`${userId}/nominees/${nominee.imdbID}`).set({
    });
  }
}

export default NomineesRepository;