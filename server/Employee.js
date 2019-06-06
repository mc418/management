// /backend/data.js
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

// this will be our data base's data structure 
ObjectId = Schema.ObjectId;
const employeeSchema = new Schema({
  avatar: { type: String, default: null },
  name: { type: String, required: true },
  title: { type: String, default: null },
  sex: { type: String, default: null },
  startDate: { type: Date, default: Date.now },
  officePhone: { type: String, default: null },
  cellPhone: { type: String, defuault: null },
  SMS: { type: String, defuault: null },
  email: { type: String, defulat: null },
  managerName: {type: String,default: null},
  manager: {type: ObjectId,default: null},
  directReports: { type: [ObjectId], defulat: [] }
});

employeeSchema.plugin(mongoosePaginate);

let Employee = mongoose.model("User", employeeSchema);

// export the new Schema so we could modify it using Node.js
module.exports = Employee;
