var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var DemandSchema = new mongoose.Schema({
    FormID: String,
    DemandTitle: String,
    DemandDesc: String,
    DemandPhoto: String,
    DemandIndustry: String,
    DemandArea: String,
    BidAmount: Number,
    DemandType: String,
    TbDeadLine: String,
    DeadLine: String,
    DemandState: String,
    MoneyState: String,
    FormMaker: {type: ObjectId, ref: 'User'},
    MeetingID: String,
    MeetingSummary: String,
    MeetingSummarySign: String,
    PdfUrl: String,
    PdfSgn: String,
    PdfFileName: String,
    MaxNum: Number,
    smsCode: String,
    PaySign: String,
    SgtrSign: String,
    ReadSign: String,
    DeleteSign: String,
    CancelSign: String,
    FinishSign: String,
    SetTopDT: {
        type: Date,
        default: Date.now()
    },
    FinishDT: {
        type: Date,
        default: Date.now()
    },
    meta: {
        FormDT: {
            type: Date,
            default: Date.now()
        },
        UpdateDT: {
            type: Date,
            default: Date.now()
        }
    }
});

DemandSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.FormDT = this.meta.UpdateDT = Date.now();
    } else {
        this.meta.UpdateDT = Date.now();
    }

    next();
});

DemandSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('-meta.UpdateDT')
            .exec(cb);
    },
    findById: function(id, cb) {
        return this
            .findOne({
                _id: id
            })
            .populate('FormMaker', 'name password')
            .exec(cb);
    }
}

module.exports = DemandSchema
