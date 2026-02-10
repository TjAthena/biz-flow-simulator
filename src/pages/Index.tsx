import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BarChart3, Shield, Users, Globe, Lock, Zap,
  AlertTriangle, Mail, FolderOpen, Eye, Settings, Link2,
  Briefcase, Building2, TrendingUp, UserCheck,
} from "lucide-react";

const problemCards = [
  { icon: Mail, title: "Email Attachments", desc: "Sending PDFs and screenshots loses interactivity and goes stale instantly." },
  { icon: AlertTriangle, title: "No Access Control", desc: "Anyone with the link can see your client's sensitive data." },
  { icon: FolderOpen, title: "Scattered Reports", desc: "Reports live in different tools, emails, and folders — impossible to manage." },
  { icon: Eye, title: "No Visibility", desc: "You never know if clients actually viewed the dashboards you shared." },
  { icon: Settings, title: "Complex Setup", desc: "Enterprise BI portals require IT teams and months of configuration." },
];

const targetUsers = [
  { icon: Briefcase, title: "Freelance Analysts", desc: "Solo data professionals sharing dashboards with multiple clients." },
  { icon: Building2, title: "Consulting Firms", desc: "Teams delivering analytics reports as a service to businesses." },
  { icon: TrendingUp, title: "Analytics Agencies", desc: "Agencies managing BI dashboards across many client accounts." },
  { icon: UserCheck, title: "Business Consultants", desc: "Advisors who embed data storytelling into client engagements." },
];

const scenarios = [
  { problem: "Client asks for latest sales numbers", solution: "Share a live Power BI dashboard with one click — always up to date." },
  { problem: "Multiple clients need different views", solution: "Assign specific reports to each customer with role-based access." },
  { problem: "Client's CEO wants access too", solution: "Create another customer login in seconds — no IT ticket needed." },
  { problem: "Switching BI tools mid-project", solution: "Just update the iframe URL — the customer experience stays the same." },
  { problem: "Client loses the dashboard link", solution: "They just log in to VizTec — their reports are always waiting." },
  { problem: "Need to revoke access after contract ends", solution: "Delete the customer account — access removed instantly." },
];

const features = [
  { icon: BarChart3, title: "Embed Any Dashboard", desc: "Power BI, Tableau, Looker, Metabase — if it has an iframe URL, it works." },
  { icon: Users, title: "Customer Management", desc: "Create customer accounts, assign reports, manage access from one place." },
  { icon: Shield, title: "Secure Access", desc: "Login-based access control — no more public links or guessable URLs." },
  { icon: Globe, title: "Branded Experience", desc: "Your clients see a clean, professional portal — not your BI tool." },
  { icon: Lock, title: "Admin Isolation", desc: "Each admin only sees their own customers and reports — zero data leaks." },
  { icon: Zap, title: "Instant Setup", desc: "Register, create a customer, paste a dashboard URL — live in under 2 minutes." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent">
        <div className="container py-20 md:py-32 text-center space-y-6 relative z-10">
          <h1 className="text-hero md:text-[3rem] md:leading-tight font-bold tracking-tight text-foreground">
            Share Dashboards.<br />Not Headaches.
          </h1>
          <p className="text-subtitle md:text-title text-muted-foreground max-w-2xl mx-auto">
            VizTec lets freelance analysts and consulting firms share embedded BI dashboards
            with clients through a secure, branded portal — no IT setup required.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Button size="lg" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register-admin">Register as Admin</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-display font-bold">The Problem with Dashboard Sharing</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Every analyst has felt these pain points.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {problemCards.map((c) => (
            <Card key={c.title} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-3 text-center">
                <c.icon className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-caption text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Target Users */}
      <section className="bg-card border-y">
        <div className="container py-16 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-display font-bold">Built For People Like You</h2>
            <p className="text-muted-foreground">VizTec is designed for data professionals who share dashboards with clients.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {targetUsers.map((u) => (
              <Card key={u.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3 text-center">
                  <u.icon className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">{u.title}</h3>
                  <p className="text-caption text-muted-foreground">{u.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Scenarios */}
      <section className="container py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-display font-bold">Real-World Scenarios</h2>
          <p className="text-muted-foreground">See how VizTec solves everyday challenges.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div>
                  <span className="text-caption font-semibold text-destructive uppercase">Problem</span>
                  <p className="text-body font-medium mt-1">{s.problem}</p>
                </div>
                <div>
                  <span className="text-caption font-semibold text-primary uppercase">VizTec Solution</span>
                  <p className="text-body text-muted-foreground mt-1">{s.solution}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-card border-y">
        <div className="container py-16 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-display font-bold">What You Get with VizTec</h2>
            <p className="text-muted-foreground">Everything you need to share dashboards professionally.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3 text-center">
                  <f.icon className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-caption text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
