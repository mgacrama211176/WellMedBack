import mongoose from 'mongoose';
import debugLib from 'debug';

const debug = debugLib('api:serverr');
const { connect } = mongoose;

export default async (host, dbName) => {
  try {
    await connect(host, { dbName });
    debug('Database is connected', host, dbName);
    console.log('Database is now Connected', dbName);
  } catch (e) {
    console.error('failed connecting to mongodb server');
    console.error(e);
  }
};
