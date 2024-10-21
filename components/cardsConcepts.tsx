"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import { Concept } from "@/interfaces/concepts";
import currency from "currency.js";
const iconSets = {
  ...FaIcons,
  ...MdIcons,
  ...GiIcons,
  // Add other icon sets here
};

const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = iconSets[name as keyof typeof iconSets];
  if (!IconComponent) {
    // Fallback icon or null if icon doesn't exist
    return null;
  }
  return <IconComponent className="mr-2 h-4 w-4" />;
};

export default function ConceptList({ concept }: { concept: Concept }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{concept.description}</CardTitle>
      </CardHeader>
      <CardContent>
        {concept.conceptTypeVehicule.map((vehicle) => (
          <div key={vehicle.id} className="flex items-center">
            <DynamicIcon name={vehicle.vehicleType.icon} />
            <span className="mr-2">{vehicle.vehicleType.label}</span>
            <span className="font-bold">
              {currency(vehicle.value, { symbol: "$", precision: 0 }).format()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
