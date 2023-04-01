import mongoose, { Mongoose } from 'mongoose';

class DataBaseConnection {

    private mongooseConnectionInst: any = null;

    constructor() {}

    private getConnectionPath() {
        const username = encodeURIComponent(process.env.DATABASE_USERNAME as any);
        const password = encodeURIComponent(process.env.DATABASE_PASSWORD as any);
        const clusterName = process.env.DATABASE_CLUSTERNAME;
        const databaseName = process.env.DATABASE_NAME;
        return `mongodb+srv://${username}:${password}@${clusterName}.j8ipoxv.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    }

    async connect() {
        try {
            const conn: Mongoose = await mongoose.connect(this.getConnectionPath());
            this.mongooseConnectionInst = conn;
            console.log(`db connection has been sucessfull`)
        } catch(error) {
            console.log('DB_CONNECTION_ERROR::', error);
        }
    }

    getDB(): Mongoose {
        return this.mongooseConnectionInst;
    }
}

const MongooseDB = new DataBaseConnection();
export default MongooseDB;