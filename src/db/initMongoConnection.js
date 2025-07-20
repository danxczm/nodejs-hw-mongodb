// src/db/initMongoConnection.js

import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const pwd = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;

    await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`);
    console.log('👨🏼‍💻 Mongo connection successfully established!');
  } catch (e) {
    console.log('❌ Error while setting up mongo connection', e);
    throw e;
  }
};
