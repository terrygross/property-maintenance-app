
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonAction: () => void;
  isLink?: boolean;
  linkTo?: string;
}

const AdminCard = ({ title, description, icon, buttonText, buttonAction, isLink, linkTo }: AdminCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {isLink && linkTo ? (
          <Button asChild className="w-full">
            <Link to={linkTo}>{buttonText}</Link>
          </Button>
        ) : (
          <Button className="w-full" onClick={buttonAction}>
            {buttonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdminCard;
