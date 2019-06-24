
const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Employee = require("./Employee");
var ObjectId = require("mongoose").Types.ObjectId;

const API_PORT = 8080;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://mc-418:I!mokay418@cluster0-lwts0.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
	dbRoute,
	{ useNewUrlParser: true }
);
mongoose.set("useFindAndModify", false);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


// LOAD EMPLOYEES
app.get("/api/employees?", (req, res) => {
	const { page, orderBy, search } = req.query;
	console.log(req.query);
	const order = req.query.order === "asc" ? 1 : -1;
	let options = {
		sort: {
			[orderBy]: order
		},
		page: parseInt(page),
		limit: 12
	};

	let query = {};
	
	query = {
		$or: [
			{ name: new RegExp(search, "i") },
			{ title: new RegExp(search, "i") },
			{ cellPhone: new RegExp(search, "i") },
			{ email: new RegExp(search, "i") },
			{ managerName: new RegExp(search, "i") }
		]
	};


	Employee.paginate(query, options, (err, employee) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).json({ employee });
		}
		console.log(employee);
	});

});


// LOAD REPORTERS
app.get("/api/employee/reporters/:employeeId", (req, res) => {
	Employee.findById(req.params["employeeId"], (err, employee) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			let reports = employee.directReports.toString();
			Employee.find({}, (err, all) => {
				if (err) {
					res.status(500).json({ error: err });
				} else {
					res.status(200).json({
						reporters: all.filter(em => reports.includes(em.id))
					});
				}
			});
		}
	});
});

// LOAD MANAGERS
app.get("/api/employee/manager/:employeeId", (req, res) => {
	Employee.findById(req.params["employeeId"], (err, employee) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			let manager = employee.manager.toString();
			Employee.find({}, (err, all) => {
				if (err) {
					res.status(500).json({ error: err });
				} else {
					res.status(200).json({
						manager: all.filter(em => manager === em.id)
					});
				}
			});
		}
	});
});

// ADD NEW EMPLOYEE
app.post("/api/employee", (req, res) => {
	if (!req.body.manager) {
		Employee.create(req.body, (err, employee) => {
			if (err) {
				res.status(500).json({ error: err });
			} else {
				Employee.find({}, (err, employee) => {
					if (err) {
						res.status(500).json({ error: err });
					} else {
						res.status(200).json({ employee });
					}
				});
			}
		});
	} else {
		Employee.create(req.body, (err, employee) => {
			if (err) {
				res.status(500).json({ error: err });
			} else {
				Employee.findById(req.body.manager, (err, manager) => {
					if (err) {
						res.status(500).json({ error: err });
					} else {
						let newManager = Object.assign({}, manager._doc);
						newManager.directReports = [
							...newManager.directReports,
							employee._id
						];
						Employee.findByIdAndUpdate(
							req.body.manager,
							newManager,
							(err, manager) => {
								if (err) {
									res.status(500).json({ error: err });
								} else {
									Employee.find({}, (err, employee) => {
										if (err) {
											res.status(500).json({ error: err });
										} else {
											res.status(200).json({ employee });
										}
									});
								}
							}
						);
					}
				});
			}
		});
	}
});

// EDIT EMPLOYEE
app.put("/api/employee/:employeeId", (req, res) => {
	Employee.findByIdAndUpdate(
		req.params["employeeId"],
		req.body,
		(err, employee) => {
			if (err) {
				res.status(500).json({ error: err });
			} else {
				if (employee != null) {
					let obj = employee._doc;
					//name change, need to change name for all DRs
					if (obj.name !== req.body.name) {
						if (obj.directReports.length > 0) {
							obj.directReports.forEach(report => {
								Employee.findById(report, (err, employee) => {
									if (err) {
										res.status(500).json({ error: err });
									} else {
										if (employee !== null) {
											let newReporter = Object.assign({}, employee._doc);
											newReporter.managerName = req.body.name;
											Employee.findByIdAndUpdate(
												report,
												newReporter,
												(err, employee) => {
													if (err) {
														res.status(500).json({ error: err });
													}
												}
											);
										}
									}
								});
							});
						}
					}
					// manager dosen`t change
					if (obj.manager===req.body.manager||(obj.manager!==null&&obj.manager.toString() === req.body.manager)) {
						Employee.findByIdAndUpdate(
							req.params["employeeId"],
							req.body,
							(err, employee) => {
								if (err) {
									res.status(500).json({ error: err });
								} else {
									Employee.find({}, (err, employee) => {
										if (err) {
											res.status(500).json({ error: err });
										} else {
											res.status(200).json({ employee });
										}
									});
								}
							}
						);
					} else {
						// delete previous manager
						if (employee.manager !== null) {
							Employee.findById(obj.manager, (err, manager) => {
								if (err) {
									res.status(500).json({ error: err });
								} else {
									if (manager !== null) {
										let newManager = Object.assign({}, manager._doc);
										newManager.directReports = newManager.directReports.filter(
											user => user.toString() !== req.params["employeeId"]
										);
										Employee.findByIdAndUpdate(
											obj.manager,
											newManager,
											(err, manager) => {
												if (err) {
													res.status(500).json({ error: err });
												}
											}
										);
									}
								}
							});
						}

						// add to new manager`s reportors
						if (req.body.manager !== null) {
							Employee.findById(req.body.manager, (err, manager) => {
								if (err) {
									res.status(500).json({ error: err });
								} else {
									if (manager !== null) {
										let newManager = Object.assign({}, manager._doc);
										newManager.directReports = [
											...newManager.directReports,
											obj._id
										];
										Employee.findByIdAndUpdate(
											req.body.manager,
											newManager,
											(err, manager) => {
												if (err) {
													res.status(500).json({ error: err });
												} else {
													Employee.find({}, (err, employee) => {
														if (err) {
															res.status(500).json({ error: err });
														} else {
															res.status(200).json({ employee });
														}
													});
												}
											}
										);
									}
								}
							});
						}
					}
				}
			}
		}
	);
});

// DELETE EMPLOYEE
app.delete("/api/employee/:employeeId", (req, res) => {
	Employee.findByIdAndRemove(req.params["employeeId"], (err, employee) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			if (employee !== null) {
				let obj = employee._doc;
				// current employee has manager
				if (obj.manager !== null) {
					Employee.findById(obj.manager, (err, manager) => {
						if (err) {
							res.status(500).json({ error: err });
						} else {
							if (manager !== null) {
								let newManager = Object.assign({}, manager._doc);
								let index = newManager.directReports.indexOf(
									req.params["employeeId"]
								);
								newManager.directReports.splice(index, 1);
								Employee.findByIdAndUpdate(
									obj.manager,
									newManager,
									(err, manager) => {
										if (err) {
											res.status(500).json({ error: err });
										} else {
											if (obj.directReports.length > 0) {
												//with manager and with directReports: delete DR from manager, update reporters manager, update manager new DR
												obj.directReports.forEach(report => { // update reporters manager
													Employee.findById(report, (err, employee) => {
														if (err) {
															res.status(500).json({ error: err });
														} else {
															if (employee !== null) {
																let newReporter = Object.assign(
																	{},
																	employee._doc
																);
																newReporter.manager = obj.manager;
																newReporter.managerName = obj.managerName;
																Employee.findByIdAndUpdate(
																	report,
																	newReporter,
																	(err, employee) => {
																		if (err) {
																			res.status(500).json({ error: err });
																		}
																	}
																);
															}
														}
													});
												});
												Employee.findById(obj.manager, (err, manager) => { // add employee's report to manager
													if (err) {
														res.status(500).json({ error: err });
													} else {
														if (manager !== null) {
															let newManager = Object.assign({}, manager._doc);
															newManager.directReports = [
																...newManager.directReports,
																...obj.directReports
															];
															Employee.findByIdAndUpdate(
																obj.manager,
																newManager,
																(err, manager) => {
																	if (err) {
																		res.status(500).json({ error: err });
																	} else {
																		Employee.find({}, (err, employee) => {
																			if (err) {
																				res.status(500).json({ error: err });
																			} else {
																				res.status(200).json({ employee });
																			}
																		});
																	}
																}
															);
														} else {
															Employee.find({}, (err, employee) => {
																if (err) {
																	res.status(500).json({ error: err });
																} else {
																	res.status(200).json({ employee });
																}
															});
														}
													}
												});
											} else {
												//with manager but without DR: just delete DR from manager
												Employee.find({}, (err, employee) => {
													if (err) {
														res.status(500).json({ error: err });
													} else {
														res.status(200).json({ employee });
													}
												});
											}
										}
									}
								);
							}
						}
					});
				} else {
					//without manager but with DR: set reporters manager to null
					if (obj.directReports.length > 0) {
						obj.directReports.forEach(report => {
							Employee.findById(report, (err, employee) => {
								if (err) {
									res.status(500).json({ error: err });
								} else {
									if (employee !== null) {
										let newReporter = Object.assign({}, employee._doc);
										newReporter.manager = null;
										newReporter.managerName = null;
										Employee.findByIdAndUpdate(
											report,
											newReporter,
											(err, employee) => {
												if (err) {
													res.status(500).json({ error: err });
												}
											}
										);
									}
								}
							});
						});
					}
					//without manager without DR: just delete the em
					Employee.find({}, (err, employee) => {
						if (err) {
							res.status(500).json({ error: err });
						} else {
							res.status(200).json({ employee });
						}
					});
				}
			} else {
				res.json({ message: "employee doesn`t exist." });
			}
		}
	});
});

// LOAD ALL MANAGERS
app.get("/api/employee/allManagers", (req, res) => { 
	Employee.find({}, (err, all) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).json({
				validManagers: all.map(m => {
					const r = (({ name, _id }) => ({ name, _id }))(m);
					return r;
				})
			});
		}
	});
});

// LOAD VALID MANAGERS
app.get("/api/employee/validManagers/:emId", (req, res) => {
	Employee.aggregate(
		[
			{ $match: { _id: mongoose.Types.ObjectId(req.params.emId) } },
			{
				$graphLookup: {
					from: "users",
					startWith: "$directReports",
					connectFromField: "directReports",
					connectToField: "_id",
					as: "chain"
				}
			},
			{
				$project: {
					drChain: "$chain._id"
				}
			}
		],
		(err, results) => {
			if (err) res.status(500).send(err);
			let self = results[0]._id.toString();
			let notValid = results[0].drChain.map(dr => dr.toString());
			Employee.find({}, (err, all) => {
				if (err) {
					res.status(500).json({ error: err });
				} else {
					let managers = all.filter(
						em => !notValid.includes(em.id) && self !== em.id
					);
					res.status(200).json({
						validManagers: managers.map(m => {
							const r = (({ name, _id }) => ({ name, _id }))(m);
							return r;
						})
					});
				}
			});
		}
	);
	
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));