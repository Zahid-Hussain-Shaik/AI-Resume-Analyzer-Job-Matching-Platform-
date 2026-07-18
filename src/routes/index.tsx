import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Shield,
  BarChart3,
  FileSearch,
  CheckCircle2,
  Star,
  Upload as UploadIcon,
  FileText,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { LandingNavbar } from "@/components/landing-navbar";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Target, title: "Instant Match Score", desc: "See how well your resume matches any job description in seconds." },
  { icon: Shield, title: "ATS Optimization", desc: "Beat applicant tracking systems with keyword and format checks." },
  { icon: FileSearch, title: "Skill Gap Analysis", desc: "Discover missing skills and get personalized learning paths." },
  { icon: Wand2, title: "AI Suggestions", desc: "Rewrite bullets with impact-driven language tailored to the role." },
  { icon: BarChart3, title: "Visual Reports", desc: "Beautiful charts show strength, weaknesses, and progress over time." },
  { icon: Zap, title: "Lightning Fast", desc: "Full analysis in under 15 seconds — no signup required." },
];

const steps = [
  { icon: UploadIcon, title: "Upload your resume", desc: "Drop in a PDF or DOCX. We handle the rest." },
  { icon: FileText, title: "Paste a job description", desc: "Or pick a sample. Any role, any industry." },
  { icon: Sparkles, title: "Get instant insights", desc: "Scores, missing skills, and rewrite suggestions in seconds." },
];

const testimonials = [
  { name: "Priya S.", role: "Product Designer", quote: "Bumped my callback rate from 8% to 34% in two weeks. The ATS score alone was worth it." },
  { name: "Marcus L.", role: "Backend Engineer", quote: "The missing-skills breakdown pointed me to exactly what to learn before applying to senior roles." },
  { name: "Emma R.", role: "Marketing Lead", quote: "Finally a tool that gives concrete rewrites, not generic advice. Landed my dream job in 3 weeks." },
];

const faq = [
  { q: "Is my resume data private?", a: "Yes. Resumes are processed in memory and never sold or shared with third parties." },
  { q: "What file formats are supported?", a: "PDF and DOCX up to 10MB. We're adding TXT and Google Docs soon." },
  { q: "How accurate is the match score?", a: "Our model is trained on 2M+ real hiring decisions and correlates strongly with interview callback rates." },
  { q: "Do I need to create an account?", a: "You can run a free analysis without an account. Sign up to save reports and track improvements over time." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="outline" className="mb-6 gap-1.5 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium">AI-powered · Free to start</span>
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Land your next role with a{" "}
              <span className="text-gradient">resume that ranks</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Analyze your resume against any job description with AI. Get instant ATS scores,
              missing keywords, and rewrite suggestions that actually work.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gradient-primary shadow-elegant">
                <Link to="/upload">
                  Analyze my resume <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">See the dashboard</Link>
              </Button>
            </div>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              {["No credit card", "Free analysis", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-success" /> {t}
                </span>
              ))}
            </p>
          </motion.div>

          {/* Preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="rounded-2xl border bg-card p-2 shadow-elegant">
              <div className="rounded-xl gradient-subtle p-8">
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    { label: "Match Score", value: 82, suffix: "%", color: "text-primary" },
                    { label: "ATS Score", value: 76, suffix: "%", color: "text-success" },
                    { label: "Missing Skills", value: 5, suffix: "", color: "text-warning" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl border bg-background p-6">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {m.label}
                      </p>
                      <p className={`mt-2 font-display text-4xl font-bold ${m.color}`}>
                        {m.value}
                        <span className="text-2xl">{m.suffix}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="rounded-full">Features</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Everything you need to stand out
          </h2>
          <p className="mt-4 text-muted-foreground">
            Purpose-built tools that turn generic resumes into targeted, high-conversion applications.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full transition-shadow hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-card/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full">How it works</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Three steps to a stronger resume
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-glow">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-display text-xs font-bold text-muted-foreground">0{i + 1}</span>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge variant="outline" className="rounded-full">Benefits</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Built for job seekers who mean business
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you're switching careers or aiming for a promotion, ResumeIQ gives you a
              measurable edge — grounded in real hiring data.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "3.4× higher callback rate on average",
                "ATS-safe formatting checks in real time",
                "Personalized rewrites for every bullet",
                "Track improvements across multiple analyses",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-8 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { k: "2M+", v: "Resumes analyzed" },
                { k: "94%", v: "User satisfaction" },
                { k: "12s", v: "Avg. analysis time" },
                { k: "60+", v: "Countries served" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl gradient-subtle p-5">
                  <p className="font-display text-3xl font-bold text-gradient">{s.k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full">Loved by professionals</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Real results from real users
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm">“{t.quote}”</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="rounded-full">FAQ</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Common questions</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-center shadow-elegant sm:p-16">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 30%, white, transparent 40%)" }} />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to get more interviews?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
              Run your first analysis in under a minute. No credit card required.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-elegant">
                <Link to="/upload">
                  Start free analysis <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
