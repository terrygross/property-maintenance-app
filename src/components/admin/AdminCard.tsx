
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  buttonText?: string;
  buttonAction?: () => void;
  isLink?: boolean;
  linkTo?: string;
  onClick?: () => void; // Added this prop for direct card clicks
}

const AdminCard = ({ 
  title, 
  description = "", 
  icon, 
  buttonText = "Manage", 
  buttonAction, 
  isLink, 
  linkTo,
  onClick 
}: AdminCardProps) => {
  return (
    <Card className="h-full flex flex-col" onClick={onClick}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            {icon}
          </div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        {description && <CardDescription className="text-xs mt-2">{description}</CardDescription>}
      </CardHeader>
      {(buttonText || buttonAction || isLink) && (
        <CardFooter className="p-4 pt-2 mt-auto">
          {isLink && linkTo ? (
            <Button asChild size="sm" className="w-full text-xs">
              <Link to={linkTo}>{buttonText}</Link>
            </Button>
          ) : buttonAction ? (
            <Button size="sm" className="w-full text-xs" onClick={buttonAction}>
              {buttonText}
            </Button>
          ) : null}
        </CardFooter>
      )}
    </Card>
  );
};

export default AdminCard;
