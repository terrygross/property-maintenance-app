
import React from "react";

const EmptyReporterJobs = () => {
  return (
    <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900">No unassigned jobs</h3>
      <p className="mt-1 text-sm text-gray-500">All jobs have been assigned to technicians or no issues have been reported.</p>
    </div>
  );
};

export default EmptyReporterJobs;
