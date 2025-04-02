
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) => {
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-md border-t-4 border-bunny-yellow transition-transform hover:translate-y-[-5px]", className)}>
      {icon && <div className="mb-4 text-bunny-yellow">{icon}</div>}
      <h3 className="text-bunny-black font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};
