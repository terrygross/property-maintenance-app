
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ReporterStation from "@/components/reporter/ReporterStation";

const Reporter = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporter Station</h1>
          <p className="text-muted-foreground">Report maintenance issues with the property</p>
        </div>
        <Button asChild>
          <Link to="/admin">Back to Admin</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <ReporterStation />
      </div>
    </div>
  );
};

export default Reporter;
