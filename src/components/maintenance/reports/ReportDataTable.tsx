
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { FileSpreadsheetIcon, UploadIcon } from "lucide-react";

interface ReportDataRow {
  name?: string;
  value?: number;
  category?: string;
  avgTime?: number;
  month?: string;
  cost?: number;
}

interface ReportDataTableProps {
  reportType: string;
  tableData: ReportDataRow[];
  handleDownloadExcel: () => void;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReportDataTable: React.FC<ReportDataTableProps> = ({
  reportType,
  tableData,
  handleDownloadExcel,
  handleUploadClick,
  fileInputRef,
  handleFileUpload
}) => {
  let columns: string[] = [];

  switch (reportType) {
    case "maintenance":
      columns = ["Category", "Number of Issues"];
      break;
    case "response":
      columns = ["Category", "Average Response Time (hrs)"];
      break;
    case "cost":
      columns = ["Month", "Cost ($)"];
      break;
    case "satisfaction":
      columns = ["Rating", "Percentage (%)"];
      break;
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Report Data</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleDownloadExcel}
            className="flex items-center gap-2"
          >
            <FileSpreadsheetIcon className="h-4 w-4" />
            <span>Download Excel</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={handleUploadClick}
            className="flex items-center gap-2"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Upload Excel</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {reportType === "maintenance" && (
                <>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </>
              )}
              {reportType === "response" && (
                <>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.avgTime}</TableCell>
                </>
              )}
              {reportType === "cost" && (
                <>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>${row.cost}</TableCell>
                </>
              )}
              {reportType === "satisfaction" && (
                <>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}%</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportDataTable;
