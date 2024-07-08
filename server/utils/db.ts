import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl:string = process.env.DB_URL || '';

export const connectDB = async () => {
    try {
     await mongoose.connect(dbUrl).then((data:any) => {

        console.log(`Database connected successfully with ${data.connection.host}`);
    } );
    } catch (error) {
        console.log('Error connecting to database');
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;