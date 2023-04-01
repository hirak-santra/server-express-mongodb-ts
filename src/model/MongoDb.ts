import { MongoClient, Db, Collection } from "mongodb";

class DataBaseConnection {

    private mongoClientInst: MongoClient = null;
    private databaseName: string = null;
    private collectionList: string[] = [];

    constructor() {}

    private getConnectionPath() {
        const username = encodeURIComponent(process.env.DATABASE_USERNAME as any);
        const password = encodeURIComponent(process.env.DATABASE_PASSWORD as any);
        const clusterName = process.env.DATABASE_CLUSTERNAME;
        this.databaseName = process.env.DATABASE_NAME;
        return `mongodb+srv://${username}:${password}@${clusterName}.j8ipoxv.mongodb.net/${this.databaseName}?retryWrites=true&w=majority`;
    }

    setEnv() {
        const collectionNames = process.env.DATABASE_COLLECTION_LIST;
        this.collectionList = collectionNames.split('|');
    }

    async connect() {
        this.mongoClientInst = new MongoClient(this.getConnectionPath());
        try {
            await this.mongoClientInst.connect();
            console.log(`DB connection has been sucessfull`)
        } catch(error) {
            console.log('DB_CONNECTION_ERROR::', error);
        }
    }

    async close() {
        await this.mongoClientInst.close();
        console.log('DB connection has been closed!')
    }

    async getDB() {
        await this.connect();
        const db: Db = this.mongoClientInst.db(this.databaseName);
        const allCollections: Collection[] = await db.collections();
        allCollections.forEach((collection: Collection)=>{
            console.log(collection.collectionName);
        });
        await this.close();
    }

}

const MongoDb = new DataBaseConnection();
export default MongoDb;
