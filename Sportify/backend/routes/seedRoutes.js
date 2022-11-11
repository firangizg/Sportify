import express from 'express';
import Event from '../models/eventModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Event. deleteMany({});
  const createdEvents = await Event.insertMany(data.events);
  await User. deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdEvents, createdUsers });
});
export default seedRouter;