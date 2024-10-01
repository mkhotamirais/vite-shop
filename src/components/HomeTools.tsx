"use client";

import React from "react";
import {
  SiVite,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
} from "react-icons/si";

const iconsLogo = [
  { title: "Vite", icon: SiVite },
  { title: "Mongodb", icon: SiMongodb },
  { title: "Express", icon: SiExpress },
  { title: "Nodejs", icon: SiNodedotjs },
  { title: "Typescript", icon: SiTypescript },
  { title: "Shadcn UI", icon: SiShadcnui },
  { title: "Tailwindcss", icon: SiTailwindcss },
  { title: "Framer", icon: SiFramer },
];

export default function HomeTools() {
  return (
    <div className="flex gap-8 flex-wrap justify-center pt-8">
      {iconsLogo.map((item, i) => (
        <div
          title={item.title}
          key={i}
          className={
            item.title === "Mongodb" || item.title === "Nodejs" || item.title === "Express" ? "text-primary" : ""
          }
        >
          {React.createElement(item.icon, { size: 32 })}
        </div>
      ))}
    </div>
  );
}
