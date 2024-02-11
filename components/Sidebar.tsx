"use client";

import { cn } from "@/lib/utils";
import { Braces, Database, FormInput, LayoutTemplate, ListChecks, StickyNote } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "./ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { appId } = useParams();
  const activeSegment = useSelectedLayoutSegment();

  function getVariant(segment: string | null) {
    return activeSegment === segment ? "default" : "ghost";
  }

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">KnackLens</h2>
          <div className="space-y-1">
            <Button variant={getVariant(null)} className="w-full justify-start" asChild>
              <Link href={`/${appId}`}>
                <Braces className="w-4 h-4 mr-2" /> Metadata
              </Link>
            </Button>
            <Button variant={getVariant("objects")} className="w-full justify-start" asChild>
              <Link href={`/${appId}/objects`}>
                <Database className="w-4 h-4 mr-2" /> Objects
              </Link>
            </Button>
            <Button variant={getVariant("fields")} className="w-full justify-start" asChild>
              <Link href={`/${appId}/fields`}>
                <FormInput className="w-4 h-4 mr-2" /> Fields
              </Link>
            </Button>
            <Button variant={getVariant("scenes")} className="w-full justify-start" asChild>
              <Link href={`/${appId}/scenes`}>
                <StickyNote className="w-4 h-4 mr-2" /> Scenes
              </Link>
            </Button>
            <Button variant={getVariant("views")} className="w-full justify-start" asChild>
              <Link href={`/${appId}/views`}>
                <LayoutTemplate className="w-4 h-4 mr-2" /> Views
              </Link>
            </Button>
            <Button variant={getVariant("tasks")} className="w-full justify-start" asChild>
              <Link href={`/${appId}/tasks`}>
                <ListChecks className="w-4 h-4 mr-2" /> Tasks
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
