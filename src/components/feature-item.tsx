import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type FeatureItemProps = {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
  title: string;
  description: string;
};

export default function FeatureItem({
  Icon,
  color,
  title,
  description,
}: FeatureItemProps) {
  return (
    <Card className="group hover:shadow-md hover:shadow-neutral-700 transition-all">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <Icon
            className="group-hover:animate-bounce"
            style={{
              color: color,
            }}
          />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
