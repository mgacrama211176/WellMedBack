import mongoose from 'mongoose';
import debugLib from 'debug';

const debug = debugLib('api:serverr');
const { connect } = mongoose;

export default async (host, dbName) => {
  try {
    debug('Database is connected', host, dbName);
    console.log('Database is now Connected', dbName);
    await connect(host, { dbName });
  } catch (e) {
    debug('Something went wrong with the server', e);
  }
};
