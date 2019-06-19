const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;
const employeeSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, default: null },
  sex: { type: String, default: null },
  startDate: { type: Date, default: Date.now },
  cellPhone: { type: String, defuault: null },
  email: { type: String, defulat: null },
  managerName: {type: String,default: null},
  manager: {type: ObjectId,default: null},
  directReports: { type: [ObjectId], defulat: [] }
});

employeeSchema.plugin(mongoosePaginate);

let Employee = mongoose.model("User", employeeSchema);

module.exports = Employee;
