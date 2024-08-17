var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://bqgaming2004:123@cluster0.fiwvtnl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var mongo = new MongoClient(url, { useNewUrlParser: true });

mongo.connect(function(err, db) {
    if (err) throw err;
    
    console.log("Database created!");


    // var dbo = db.db("Income");
});