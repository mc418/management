const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;
const employeeSchema = new Schema({
  avatar: String,
  name: { type: String, required: true },
  title: { type: String, default: null },
  sex: { type: String, default: null },
  startDate: { type: Date, default: Date.now },
  cellPhone: { type: String, default: null },
  email: { type: String, default: null },
  managerName: {type: String,default: null},
  manager: {type: ObjectId,default: null},
  directReports: { type: [ObjectId], default: [] }
});

employeeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", employeeSchema);
