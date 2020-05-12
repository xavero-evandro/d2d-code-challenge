import mongoose from 'mongoose';
import logger from './logger';

export const connect = async uri => {
  try {
    const mongoUrl = uri;
    mongoose.Promise = Promise;

    if (!mongoUrl) {
      logger.error("mongo uri can't be empty");
      process.exit(1);
    }

    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.debug('mongoose connected to database.');
  } catch (error) {
    console.log(error);
    logger.error(
      'MongoDB connection error. Please make sure MongoDB is running. ' + error,
    );
    process.exit();
  }
};

export const disconnect = async () => {
  logger.debug('mongoose disconnecting from db');
  await mongoose.disconnect();
};
