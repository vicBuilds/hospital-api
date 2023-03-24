const reports = require("../../../models/report");

/*
***Steps****
This api is for all reports with a particular status

**Can only hit this api if any registered Doctor is logged in and the request has a valid token**

1.Get the Report status from Params and send all the required reports with the status.
2. Also the Send only the patient name.
3. Doctor who created the report under createdBy
*/

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
