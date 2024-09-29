import { FEATURES } from "@/constants";
import React from "react";
import FeatureItem from "./feature-item";

export default function FeaturesSection() {
  return (
    <div className="my-20 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl md:text-4xl text-neutral-300">
        Why <span className="text-sky-500">Tiny-URL</span>?
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {FEATURES.map(({ Icon, title, description, color }) => (
          <FeatureItem
            key={title}
            title={title}
            description={description}
            Icon={Icon}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}
