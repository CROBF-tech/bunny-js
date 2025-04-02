
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Section = {
  id: string;
  title: string;
};

interface DocumentationSidebarProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const DocumentationSidebar = ({
  sections,
  activeSection,
  onSectionChange,
}: DocumentationSidebarProps) => {
  return (
    <aside className="md:w-64 lg:w-80 bg-white border-r border-gray-200 md:sticky md:top-[73px] md:self-start md:h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-bunny-black mb-6">Documentación</h2>
        <nav>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-medium",
                    activeSection === section.id
                      ? "bg-bunny-yellow/20 text-bunny-black"
                      : "text-gray-700 hover:bg-bunny-yellow/10 hover:text-bunny-black"
                  )}
                  onClick={() => onSectionChange(section.id)}
                >
                  {section.title}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
