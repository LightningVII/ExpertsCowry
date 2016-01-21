var mongoose = require('mongoose');
var DemandSchema = require('../schemas/demand');
var Demand = mongoose.model('Demand', DemandSchema);

module.exports = Demand;