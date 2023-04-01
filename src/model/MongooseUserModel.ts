import mongoose, { Document, Model } from 'mongoose';
import { UserDTO } from '../dto/UserDTO';
const { Schema } = mongoose;


export default class MongooseUserModel {

    private getUserSchema(): any {
        return new Schema<UserDTO>({
            firstName: String, // String is shorthand for {type: String},
            middleName: String,
            lastName: String,
            username: String,
            password: String,
            id: Number,
            employeeId: Number,
            createdDate: { type: Date, default: Date.now }
        }, { 
            collection: 'users',
            versionKey: false 
        });
    }

    private getUserModel(): Model<UserDTO> {
        const userSchema = this.getUserSchema();
        return mongoose.model<UserDTO>('User', userSchema);
    }

    async addUser(user: UserDTO|null, callBack: Function) {
        const User: Model<UserDTO> = this.getUserModel();
        const dog: Document = new User({
            firstName: "Hirak", // String is shorthand for {type: String},
            middleName: "",
            lastName: "Santra",
            username: "hirak.santra",
            password: "G23KJ4G23J4G23GHH32#@4JJ24G",
            id: 43,
            employeeId: 667788,
        });
        try {
            await dog.save();
            console.log(dog);
        } catch(err) {
            console.log(err);
        }
    }

    async getAllUser() {
        const User: Model<UserDTO> = this.getUserModel();
    }

}