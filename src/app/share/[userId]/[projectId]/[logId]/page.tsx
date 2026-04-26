"use client";

/**
 * NOTE — Run this SQL in Supabase before this page will work for anonymous visitors:
 *
 * create policy "Projects linked to public logs are publicly readable"
 *   on public.projects for select
 *   using (
 *     exists (
 *       select 1 from public.build_logs
 *       where build_logs.project_id = projects.id
 *       and build_logs.is_public = true
 *     )
 *   );
 *
 * Without this, anonymous users can read the build log but not the project
 * details (safety, tools, steps) shown in the accordion below.
 */

import { use, useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { useDoc } from "@/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Calendar, User, Tag, ShieldCheck, Hammer, Zap, Clock } from "lucide-react";
import Image from "next/image";

export default function SharedLogPage({ params }: { params: Promise<{ userId: string, projectId: string, logId: string }> }) {
  const { userId, projectId, logId } = use(params);
  const [formattedDate, setFormattedDate] = useState<string>("");

  // Fetch the build log — RLS allows public reads where is_public = true
  const { data: log, isLoading: logLoading } = useDoc('build_logs', logId);

  // Fetch the associated project — requires the public read policy above
  const { data: project, isLoading: projectLoading } = useDoc('projects', log?.project_id ?? null);

  useEffect(() => {
    if (log?.created_at) {
      setFormattedDate(new Date(log.created_at).toLocaleDateString());
    }
  }, [log]);

  if (logLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!log || !log.is_public) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">This build log is private or does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-3xl px-4">
        <Card className="overflow-hidden border-primary/20 shadow-xl mb-8">
          {log.photo_url && (
            <div className="relative h-64 w-full md:h-96">
              <Image src={log.photo_url} alt="Build log photo" fill className="object-cover" />
            </div>
          )}
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {log.subcategory}
              </Badge>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                {log.category}
              </Badge>
            </div>
            <CardTitle className="font-headline text-3xl">{log.project_title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {log.username || "Homesteader"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {formattedDate}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">
              {log.note}
            </p>
          </CardContent>
        </Card>

        {/* Project guide accordion — only shown if the project row is accessible */}
        {!projectLoading && project && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="guide" className="border rounded-lg bg-card/50 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="rounded-full bg-primary/20 p-2 text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-headline text-lg font-bold">Original Rootstock Guide</p>
                    <p className="text-xs text-muted-foreground">The AI instructions used for this project</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" /> {project.estimated_time}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="h-4 w-4" /> {project.difficulty}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-headline font-bold text-sm mb-2 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-destructive" /> Safety First
                    </h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      {project.safety_precautions?.map((p: string, i: number) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm mb-2 flex items-center gap-2">
                      <Hammer className="h-4 w-4 text-primary" /> Tools Used
                    </h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      {project.tools_and_items?.map((t: string, i: number) => (
                        <li key={i}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-4">
                  {project.steps?.map((step: any) => (
                    <div key={step.stepNumber} className="flex gap-4">
                      <span className="font-headline font-bold text-primary">0{step.stepNumber}</span>
                      <p className="text-sm leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </main>
    </div>
  );
}