const mongodb = require("mongodb");

// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = mongodb

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID()

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to the database");
    }
    console.log("Connected successfully");
    const db = client.db(databaseName);

    // db.collection("users").insertMany([
    //     {
    //         name: "Akande Stephen",
    //         age: 24
    //     }, {
    //         name: 'Ayideji Miracle',
    //         age: 25
    //     }, {
    //         name: 'Alayande Abiola',
    //         age: 23
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to return user')
    //     }
    //     console.log(result.ops)
    // });

    // db.collection('users').findOne({
    //     age: 25
    // }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to find user')
    //     }
    //     console.log(user)
    // });

    db.collection('users').find({age: 25}).filter({name: 'Aanu Olakunle'}).limit(1).toArray((error, users) => {
        if (error) {
            return console.log('Unable to find user')
        }
        console.log(users)
    });
});
