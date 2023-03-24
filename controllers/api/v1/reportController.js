const reports = require("../../../models/report");

module.exports.allReportWithStatus = async (req, res) => {
  try {
    let requiredReports = await reports
      .find({
        status: req.params.status,
      })
      .populate({
        path: "createdBy",
        model: "doctors",
        select: "name",
      })
      .populate({
        path: "patient",
        model: "patients",
        select: "name",
      });

    return res.status(200).json({
      message: `Find all the reports with status ${req.params.status}`,
      data: requiredReports,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
