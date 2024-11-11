const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin/besocial-1f612-firebase-adminsdk-42fo3-3f547ae90e.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
}

const db = admin.firestore();

const projectId = admin.app().options.projectId;

db.listCollections()
  .then(collections => {
    console.log(`Available collections in Project '${projectId}':`, collections.map(col => col.id));
  })
  .catch(error => {
    console.error("Error listing Firestore collections:", error);
  });

module.exports = { admin, db };


/*
function testFirestoreConnection() {
  const testDoc = db.collection('tests').doc('testDoc');

  // Write to Firestore
  testDoc.set({ testField: 'Hello, Firestore!' })
  .then(() => {
      console.log('Write successful!');
      // Read from Firestore
      return testDoc.get();
  })
  .then(doc => {
      if (doc.exists) {
          console.log('Read successful:', doc.data());
      } else {
          console.log('No data found!');
      }
  })
  .catch(error => {
      console.error('Error testing Firestore:', error);
  });
}

testFirestoreConnection();
*/
// Log available collections in Firestore


