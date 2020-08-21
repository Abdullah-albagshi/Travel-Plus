const mongoose = require('mongoose');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');


const TravelSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  geonames: {
    type: String,
  },
  weather: {
    type: String,
  },
  country: {
    type: String,
  },
  pix: {
    type: String,
  }
});



module.exports = mongoose.model('Travel', TravelSchema);
