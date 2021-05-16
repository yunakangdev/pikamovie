import { firebaseDatabase } from './firebase';

class NomineesRepository {
  saveNominee(userId, nominee) {
    firebaseDatabase.ref(`${userId}/nominees/${nominee.imdbID}`).set(nominee);
  }

  deleteNominee(userId, nomineeId) {
    firebaseDatabase.ref(`${userId}/nominees/${nomineeId}`).remove();
  }

  findNominee(userId, nomineeId) {
    firebaseDatabase.ref(userId + '/nominees')
      .equalTo(nomineeId)
      .once('value', snapshot => {
        const nomineeFound = snapshot.val();
        if (nomineeFound) {
          return nomineeFound;
        }
      });
  }

  syncNominees(userId, onUpdate) {
    const ref = firebaseDatabase.ref(userId + 'nominees');
    ref.on('value', snapshot => {
      const nomineesUpdated = snapshot.val();
      nomineesUpdated && onUpdate(nomineesUpdated);
    });
    return () => ref.off();
  }
}

export default NomineesRepository;

