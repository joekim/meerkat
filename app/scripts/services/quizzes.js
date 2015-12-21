'use strict';

app.factory('Quizzes', function($firebase, $firebaseArray, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'quiz');
  // var cases = $firebase(ref.child('studentcases')).$asArray();
  var quizzes = $firebaseArray(ref);

  var Quiz = {
    all: quizzes,
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
      return $firebase(ref.child('studentcases').child(caseId)).$asObject();
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