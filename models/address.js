var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var AddressSchema = new Schema({
  a_id: { type: String, unique: true, index: true},
  txs: { type: Array, default: [] },
  received: { type: Number, default: 0 },
  sent: { type: Number, default: 0 },
  balance: {type: Number, default: 0},
  is_crowdsale: {type: Boolean, default: false}
}, {id: false});

module.exports = mongoose.model('Address', AddressSchema);

