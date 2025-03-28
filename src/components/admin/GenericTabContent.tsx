
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import AdminTab from "../AdminTab";

interface GenericTabContentProps {
  title: string;
  description: string;
  content?: React.ReactNode;
}

const GenericTabContent = ({ title, description, content }: GenericTabContentProps) => {
  return (
    <AdminTab title={title} description={description}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {content ? content : <p>{title} functionality will be implemented here.</p>}
        </CardContent>
      </Card>
    </AdminTab>
  );
};

export default GenericTabContent;
