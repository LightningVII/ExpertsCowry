var Demand = require('../models/demand');
var User = require('../models/user');
var _ = require('underscore');

exports.getAllList = function(req, res) {
    Demand.fetch(function(err, demands) {
        if (err) {
            console.log(err);
        }

        res.json({
            demands: demands
        });
    })
};

exports.findById = function(req, res) {
    var id = req.params.id;

    if (id) {
        Demand.findById(id, function(err, demand) {
            if (err) {
                console.log('findById' + err);
            }


            res.json(demand);
            console.log(demand);
        });
    }
};

exports.save = function(req, res) {
    var id = req.body._id;
    var demandObj = req.body;
    var _demand;

    if (id !== undefined) {

        Demand.findById(id, function(err, demand) {
            if (err) {
                console.log(err);
            }

            _demand = _.extend(demand, demandObj);
            _demand.save(function(err, demand) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/demand/findById/' + demand._id);
            });
        })
    } else {
        _demand = new Demand({
            DemandTitle: req.body.DemandTitle,
            DemandDesc: req.body.DemandDesc,
            DemandPhoto: req.body.DemandPhoto
        });

        _demand.save(function(err, demand) {
            if (err) {
                //console.log(err);
                console.log(err);
            }
            console.log(demand);
            res.json(demand);
        });
    }
};
