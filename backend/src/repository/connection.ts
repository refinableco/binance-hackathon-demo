import {Db} from "mongodb";

const MongoClient = require("mongodb").MongoClient;
let db: Db;

const DATABASE_NAME = 'binance_demo';

const uri = 'mongodb://root:root@127.0.0.1:27017'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const rehydrateOrCreateDB = async () => {
    if (db && client.isConnected()) {
        return db;
    }
    else {
        await client.connect();
        db = client.db(DATABASE_NAME);
        return db;
    }
};

export {
    rehydrateOrCreateDB
};
