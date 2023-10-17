require("dotenv").config();

import mongoose, {ConnectOptions} from "mongoose";

let isConnected: boolean = false;
const MONGODB_URI: string = process.env.MONGODB_URI;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true );
    
    if(isConnected){
        console.log("MongoDB is already connected")
        return;
    }

    try{
        await mongoose.connect(
            MONGODB_URI!, {
                dbName: 'monPortfolio',
                useNewUrlParser: true,
                useUnifiedTopology:true,
            } as ConnectOptions
        )

        isConnected = true;
        console.log('MongoDB connected')

    }catch(err){
        console.log(err)
    }
}