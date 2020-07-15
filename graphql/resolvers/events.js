const Event = require('../../models/event');
const User=require('../../models/event');
const { transformEvent } = require('./merge');
  
module.exports = {
     // events resolver matches with root query
     // populate is provided by mongoose, it will populate with models that it is refered to using ref keyword
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (args,req) => {
      if(!req.isAuth){
        throw new Error('UnAuthenticated!')
      }
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId
      });
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result);
        const creator = await User.findById('5c0fbd06c816781c518e4f3e');
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();
  
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };
