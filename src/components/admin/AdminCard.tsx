
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonAction?: () => void;
  isLink?: boolean;
  linkTo?: string;
}

const AdminCard = ({ title, description, icon, buttonText, buttonAction, isLink, linkTo }: AdminCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            {icon}
          </div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs mt-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-2 mt-auto">
        {isLink && linkTo ? (
          <Button asChild size="sm" className="w-full text-xs">
            <Link to={linkTo}>{buttonText}</Link>
          </Button>
        ) : (
          <Button size="sm" className="w-full text-xs" onClick={buttonAction}>
            {buttonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdminCard;
