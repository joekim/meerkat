'use strict';

app.factory('Cases', function($firebase, $firebaseArray, $firebaseObject, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'studentcases');
  // var cases = $firebase(ref.child('studentcases')).$asArray();
  var cases = $firebaseArray(ref);

  var Case = {
    all: cases,
    recentCases: function() {
      var query = ref.orderByChild('timestamp').limitToLast(25);
      return $firebaseArray(query);
    },
    create: function(studentcase) {
      // console.log(studentcase);
      // cases.$add(studentcase).then(function(ref) {
      //   var id = ref.key();
      //   console.log('added record with id ' + id);
      //   // Students.addCase(studentNetId, id);
      // });
      return cases.$add(studentcase);
    },
    get: function(caseId) {
      var caseSnapshot = {};
      ref.child(caseId).on('value', function(snapshot) {
        caseSnapshot = snapshot.val();
        // caseObject.patientId = caseSnapshot.patientId;
      }, function(errorObject) {
        console.log(errorObject.code + ': Read failed for Cases.get() on case id: ' + caseId);
      });
      return caseSnapshot;
    },
    delete: function(studentcase) {
      return cases.$remove(studentcase);
    },
    deleteCase: function(caseId) {
      var onComplete = function(error) {
        if (error) {
          console.log('Case deleteCase synchronization failed');
        } else {
          console.log('Case deleteCase synchronization succeeded');
        }
      };
      var caseRef = ref.child(caseId);
      console.log('case Id: ' + caseId);
      caseRef.remove(onComplete);
    }
  };

  return Case;

});