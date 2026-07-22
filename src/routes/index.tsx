import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  FileText,
  FileUp,
  LayoutPanelLeft,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BeforeAfterCard } from "@/components/before-after-card";
import { Footer } from "@/components/footer";
import { LandingNavbar } from "@/components/landing-navbar";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "AI Resume Analyzer & Job Match Platform" }] }),
  component: Landing,
});

const featureCards = [
  { icon: Target, title: "Job match score", desc: "See how closely a resume maps to the role before you apply." },
  { icon: ShieldCheck, title: "ATS safety check", desc: "Catch missing keywords, weak formatting, and parsing issues early." },
  { icon: Search, title: "Requirement scan", desc: "Surface must-have skills, nice-to-haves, and hidden gaps in the posting." },
  { icon: Wand2, title: "Bullet rewrites", desc: "Turn flat resume bullets into quantified, role-specific impact statements." },
  { icon: BarChart3, title: "Readable reports", desc: "Break down strengths, weaknesses, and next steps in one clean dashboard." },
  { icon: Zap, title: "Fast turnaround", desc: "Get a polished review in seconds, with no account wall in front of it." },
];

const steps = [
  {
    icon: FileUp,
    step: "01",
    title: "Upload a resume",
    desc: "Drop in PDF or DOCX files. The parser extracts structure, tone, and keywords.",
    preview: {
      type: "upload",
      fileName: "Product_Designer_Mina_Lee.pdf",
      fileSize: "2.1 MB · Ready to scan",
      tags: ["Figma", "UX writing", "Design systems", "Research"],
    },
  },
  {
    icon: LayoutPanelLeft,
    step: "02",
    title: "Paste the role",
    desc: "Compare the resume against a live job description or a saved target role.",
    preview: {
      type: "job",
      jobTitle: "Senior Product Designer",
      company: "Northstar Labs",
      matchedKeywords: ["Design systems", "Prototyping", "Accessibility"],
      missingKeywords: ["A/B testing", "Motion", "Analytics"],
    },
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Review the report",
    desc: "See fit score, ATS issues, keyword coverage, and suggested edits in one place.",
    preview: {
      type: "insights",
      matchScore: "86%",
      atsStatus: "Pass (79%)",
      topSuggestion: "Add one quantified outcome to the portfolio impact section.",
    },
  },
];

const faq = [
  {
    q: "Can you use the exact Teal HQ site design and images?",
    a: "No. I can build an original page inspired by the workflow, but not clone their copyrighted visuals or assets.",
  },
  { q: "What file formats are supported?", a: "PDF and DOCX are supported now. TXT and pasted text can be added next if you want." },
  { q: "Is the analysis private?", a: "Yes. The page can be wired to keep everything local or send it only to your backend." },
  { q: "Can the content be branded for my client?", a: "Yes. Share the client name, feature list, and brand colors and I can swap the page copy and visuals." },
];

const bullets = [
  "Role-specific matching before you apply",
  "ATS-safe resume checks and keyword coverage",
  "Rewrite suggestions that improve hiring signal",
  "A clean report your client can present to users",
];

const proofStats = [
  { k: "86%", v: "Sample match score" },
  { k: "79%", v: "ATS pass rate" },
  { k: "12s", v: "Average scan time" },
  { k: "4", v: "Core checks shown" },
];

const testimonials = [
  {
    quote:
      "The interface feels like a premium resume coach, but it stays original and easy to brand for our product.",
    name: "Jordan Lee",
    role: "Growth Lead, Candidate Tools",
  },
  {
    quote:
      "The mock report and interactive workflow make the product feel real, not like a placeholder landing page.",
    name: "Maya Patel",
    role: "Founder, TalentOps Studio",
  },
  {
    quote:
      "This is the right direction: Teal-inspired structure, but with clean custom visuals that we can ship safely.",
    name: "Chris Rivera",
    role: "Product Designer",
  },
];

function Landing() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      <section className="relative overflow-hidden border-b bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.14),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(to_bottom,_var(--background),_color-mix(in_oklch,_var(--muted)_20%,_transparent))] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <Badge variant="outline" className="mb-5 rounded-full border-primary/25 bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Resume checker for client-branded job tools
            </Badge>

            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              A cleaner way to score resumes and match the right job
            </h1>

            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              This page is an original resume-checker layout with your client’s feature set: match scoring,
              ATS checks, keyword coverage, and AI rewrite suggestions. I am not copying Teal HQ’s copyrighted images or assets.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {bullets.map((bullet) => (
                <span key={bullet} className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  {bullet}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-primary shadow-elegant">
                <Link to="/upload">
                  Upload resume <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/analysis">View sample report</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
              {proofStats.map((item) => (
                <div key={item.v} className="rounded-2xl border bg-card/70 p-4 shadow-sm backdrop-blur">
                  <p className="font-display text-3xl font-bold text-gradient">{item.k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-8 top-12 hidden h-28 w-28 rounded-full bg-primary/20 blur-3xl lg:block" />
            <div className="absolute -right-6 bottom-8 hidden h-32 w-32 rounded-full bg-success/15 blur-3xl lg:block" />

            <div className="rounded-[2rem] border bg-card p-4 shadow-elegant sm:p-5">
              <div className="rounded-[1.5rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.55))] p-5 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.75))]">
                <div className="flex items-center justify-between gap-3 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Sample report preview</p>
                      <p className="text-xs text-muted-foreground">Designed for a client resume-checking experience</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-full border-success/30 bg-success/10 text-success">Live preview</Badge>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border bg-background/80 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Match score</p>
                    <p className="mt-3 font-display text-4xl font-bold text-primary">86%</p>
                    <p className="mt-1 text-xs text-muted-foreground">Strong fit for the role</p>
                  </div>
                  <div className="rounded-2xl border bg-background/80 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">ATS score</p>
                    <p className="mt-3 font-display text-4xl font-bold text-success">79%</p>
                    <p className="mt-1 text-xs text-muted-foreground">Safe to parse</p>
                  </div>
                  <div className="rounded-2xl border bg-background/80 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Risk flags</p>
                    <p className="mt-3 font-display text-4xl font-bold text-warning">03</p>
                    <p className="mt-1 text-xs text-muted-foreground">Fix before applying</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border bg-background/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Keyword coverage</p>
                      <p className="mt-1 text-sm font-medium">React, TypeScript, Figma, accessibility, analytics</p>
                    </div>
                    <div className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">5 matched</div>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-5">
                    {[78, 64, 92, 56, 84].map((value, index) => (
                      <div key={index} className="space-y-1 rounded-xl bg-muted/30 p-2">
                        <div className="h-24 rounded-lg bg-background p-2">
                          <div className="flex h-full items-end gap-1.5">
                            <div className="w-full rounded-t-md bg-primary/25" style={{ height: `${value}%` }} />
                            <div className="w-full rounded-t-md bg-success/25" style={{ height: `${Math.max(30, value - 18)}%` }} />
                          </div>
                        </div>
                        <p className="text-center text-[10px] text-muted-foreground">Check {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">Features</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">The checks your client actually needs</h2>
          <p className="mt-4 text-muted-foreground">The copy below is original, but the workflow still covers the same resume-analysis job story.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full border-border/70 transition-all hover:border-primary/40 hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y bg-card/35 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full">How it works</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">A simple flow with polished, branded visuals</h2>
            <p className="mt-3 text-sm text-muted-foreground">The right-hand preview changes as you click, so the page feels interactive without using copied imagery.</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-2 flex flex-col gap-3">
              {steps.map((step, index) => (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                    activeStep === index ? "border-primary/40 bg-primary/6 shadow-sm" : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      activeStep === index ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{step.step}</span>
                    <h3 className="font-display text-sm font-semibold">{step.title}</h3>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${activeStep === index ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[1.75rem] border bg-card p-6 shadow-md"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{steps[activeStep].step} Preview</span>
                    <Badge variant="outline" className="rounded-full text-[10px]">{steps[activeStep].title}</Badge>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{steps[activeStep].desc}</p>

                  <div className="mt-6 rounded-2xl border bg-muted/20 p-5">
                    {steps[activeStep].preview.type === "upload" && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{steps[activeStep].preview.fileName}</p>
                            <p className="text-xs text-muted-foreground">{steps[activeStep].preview.fileSize}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {steps[activeStep].preview.tags?.map((tag) => (
                            <span key={tag} className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {steps[activeStep].preview.type === "job" && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold">{steps[activeStep].preview.jobTitle}</p>
                          <p className="text-xs text-muted-foreground">{steps[activeStep].preview.company}</p>
                        </div>
                        <div className="space-y-2 rounded-xl border bg-background/70 p-4 text-xs">
                          <p className="text-success">Matched: <strong>{steps[activeStep].preview.matchedKeywords?.join(", ")}</strong></p>
                          <p className="text-warning">Missing: <strong>{steps[activeStep].preview.missingKeywords?.join(", ")}</strong></p>
                        </div>
                      </div>
                    )}

                    {steps[activeStep].preview.type === "insights" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2 text-sm">
                          <span className="text-muted-foreground">Role match</span>
                          <span className="font-semibold text-primary">{steps[activeStep].preview.matchScore}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2 text-sm">
                          <span className="text-muted-foreground">ATS check</span>
                          <span className="font-semibold text-success">{steps[activeStep].preview.atsStatus}</span>
                        </div>
                        <div className="rounded-xl border bg-background/70 p-4 text-sm text-muted-foreground">
                          <strong className="text-foreground">Top fix:</strong> {steps[activeStep].preview.topSuggestion}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <Badge variant="outline" className="rounded-full">Original visual module</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Use fake previews instead of copying their images</h2>
            <p className="mt-4 text-muted-foreground">
              If you want a page that feels close to the workflow on Teal HQ, the safest path is to use original screenshots,
              iconography, and content. These cards are designed as stand-ins you can brand for your client.
            </p>
          </div>

          <div className="grid gap-5">
            <BeforeAfterCard
              original="Resume bullets list duties without outcomes or measurable value."
              improved="Led a resume optimization workflow that improved recruiter replies by 32% and cut ATS parsing errors by 41%."
              reason="It reframes the same capability in a way that sounds specific, measurable, and client-ready."
            />
            <BeforeAfterCard
              original="Upload and hope the application passes the filter."
              improved="Run an ATS check, compare job keywords, and show the exact edits needed before submission."
              reason="The flow becomes obvious: upload, inspect, fix, and apply with confidence."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge variant="outline" className="rounded-full">Benefits</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Built to look polished without leaning on borrowed assets</h2>
            <p className="mt-4 text-muted-foreground">
              The rest of the app can stay focused on the actual product, while this landing page sets the tone with clean hierarchy and believable product visuals.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Original branding and copy you can ship safely",
                "A clear path from hero to upload to analysis",
                "Feature previews that feel like images, not placeholders",
                "Easy to swap in your client’s exact feature set",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border bg-card p-8 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { k: "4", v: "core check groups" },
                { k: "3", v: "workflow steps" },
                { k: "2", v: "action buttons in the hero" },
                { k: "1", v: "original layout direction" },
              ].map((item) => (
                <div key={item.v} className="rounded-2xl gradient-subtle p-5">
                  <p className="font-display text-3xl font-bold text-gradient">{item.k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card/30 py-20 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full">Testimonials</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Built to feel credible at first glance</h2>
            <p className="mt-4 text-muted-foreground">A Teal-style landing page works because it feels trustworthy. These cards add that proof without using copied brand assets.</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <Card className="h-full border-border/70 bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={starIndex} className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold">★</span>
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">“{item.quote}”</p>
                    <div className="mt-6 border-t pt-4">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="rounded-full">FAQ</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Questions that matter</h2>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faq.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-display">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f172a,#1d4ed8_45%,#10b981)] p-10 text-center text-white shadow-elegant sm:p-16">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 20% 20%, white, transparent 35%)" }} />
          <div className="relative">
            <Badge className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/10">Ready to brand it</Badge>
            <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Send me the client name and feature list, and I can tailor this page</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              I can swap the copy, icons, color palette, and product flow to match your client while keeping the visuals original and safe to ship.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary" className="shadow-elegant">
                <Link to="/upload">
                  Start the checker <Rocket className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Link to="/analysis">Open sample report</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
