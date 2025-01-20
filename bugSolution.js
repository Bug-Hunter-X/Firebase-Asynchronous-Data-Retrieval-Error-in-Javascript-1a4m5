The solution involves ensuring that data access happens only *after* the Firebase query has completed successfully.

```javascript
const db = firebase.firestore();

db.collection('users').where('age', '>', 25).get().then((querySnapshot) => {
  const users = [];
  querySnapshot.forEach((doc) => {
    //Collect data in an array first
    users.push(doc.data());
  });
  users.forEach(user=>{
    console.log(user.name); //Access data here safely
  })
}).catch((error) => {
  console.log('Error getting documents: ', error);
});
```

This revised code first collects all the data into an array before accessing it. This ensures that all the data is available before any access attempt. Using async/await can further improve readability and error handling:
```javascript
async function getUsers(){
  const db = firebase.firestore();
  const querySnapshot = await db.collection('users').where('age', '>', 25).get();
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
}

getUsers().then(users=>{
  users.forEach(user=>console.log(user.name))
}).catch(error=>console.log(error))
```