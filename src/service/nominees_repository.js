import firebaseApp from './firebase';

class NomineesRepository {
  // can't receive userId
  saveNominee(userId, nominee) {
    firebaseApp.database().ref(`${userId}/nominees/${nominee.imdbID}`).set(nominee);
  }

  deleteNominee(userId, nominee) {
    firebaseApp.database().ref(`${userId}/nominees/${nominee.imdbID}`).remove();
  }
}

export default NomineesRepository;