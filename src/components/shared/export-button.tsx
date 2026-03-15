"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

interface ExportButtonProps {
  project: Project;
}

export function ExportButton({ project }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const exportJSON = () => {
    setExporting(true);

    const data = {
      project: project.name,
      source_locale: project.source_locale,
      target_locales: project.target_locales,
      exported_at: new Date().toISOString(),
      copy_strings: (project.copy_strings || []).map((cs) => ({
        key: cs.string_key,
        type: cs.string_type,
        original: cs.content,
        persuasion: cs.persuasion_category,
        adaptations: (cs.adaptations || []).map((a) => ({
          locale: a.locale,
          content: a.content,
          reasoning: a.cultural_reasoning,
        })),
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name.toLowerCase().replace(/\s+/g, "-")}-adaptations.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExporting(false);
  };

  const exportCSV = () => {
    setExporting(true);

    const rows: string[][] = [
      ["String Key", "Type", "Original (English)", "Locale", "Adapted Copy", "Cultural Reasoning"],
    ];

    (project.copy_strings || []).forEach((cs) => {
      (cs.adaptations || []).forEach((a) => {
        rows.push([
          cs.string_key,
          cs.string_type,
          `"${cs.content.replace(/"/g, '""')}"`,
          a.locale,
          `"${a.content.replace(/"/g, '""')}"`,
          `"${a.cultural_reasoning.replace(/"/g, '""')}"`,
        ]);
      });
    });

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name.toLowerCase().replace(/\s+/g, "-")}-adaptations.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExporting(false);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportJSON}
        disabled={exporting}
        className="border-2 text-xs"
      >
        <Download className="w-3.5 h-3.5 mr-1.5" />
        Export JSON
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportCSV}
        disabled={exporting}
        className="border-2 text-xs"
      >
        <Download className="w-3.5 h-3.5 mr-1.5" />
        Export CSV
      </Button>
    </div>
  );
}
