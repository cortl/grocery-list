const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });
const firestore = admin.firestore();

exports.incrementTotalItemsUser = functions.firestore
  .document("items/{docId}")
  .onCreate((docSnap) => {
    return firestore.collection("users")
      .doc(docSnap.get("userId"))
      .set(
        { totalItemsAdded: admin.firestore.FieldValue.increment(1) },
        { merge: true }
      );
  });

exports.addUserMetadata = functions.auth.user().onCreate((user) =>
  firestore.collection("users").doc(user.uid)
    .set({ user: user.displayName, email: user.email, totalItemsAdded: 0 }));

