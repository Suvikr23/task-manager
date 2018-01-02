var mongoose =  require('mongoose');

var TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taggedList: {
        type: [String],
        required: false
    },
    createdBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);