import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Lightbulb, Eye, Heart, Briefcase, Building2, TrendingUp, UserCheck } from "lucide-react";

const audiences = [
  { icon: Briefcase, title: "Freelance Analysts", desc: "Solo professionals sharing data insights with multiple clients." },
  { icon: Building2, title: "Consulting Firms", desc: "Teams delivering BI dashboards as part of their consulting service." },
  { icon: TrendingUp, title: "Analytics Agencies", desc: "Agencies managing embedded analytics across many accounts." },
  { icon: UserCheck, title: "Business Consultants", desc: "Advisors weaving data-driven narratives into client engagements." },
];

const principles = [
  { icon: Target, title: "Simplicity First", desc: "No bloated features. Just secure, fast dashboard sharing." },
  { icon: Lightbulb, title: "Practitioner-Built", desc: "Designed by analysts who've felt the pain of dashboard distribution." },
  { icon: Eye, title: "Transparency", desc: "You see exactly what your clients see. No hidden complexity." },
  { icon: Heart, title: "Client Experience", desc: "Your clients get a polished portal, not a raw BI tool login." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="container py-16 max-w-3xl space-y-12">
      {/* Mission */}
      <div className="space-y-4 text-center">
        <h1 className="text-hero font-bold">About VizTec</h1>
        <p className="text-title text-muted-foreground">
          We believe every data professional deserves a simple, secure way to share dashboards with clients —
          without building infrastructure or wrestling with enterprise tools.
        </p>
      </div>

      {/* Why */}
      <div className="space-y-3">
        <h2 className="text-heading font-bold">Why VizTec Exists</h2>
        <p className="text-body text-muted-foreground">
          Sharing a dashboard should be as easy as sharing a document. But today, analysts are stuck emailing PDFs,
          managing messy public links, or paying for enterprise portals they don't need. VizTec fills that gap —
          a lightweight, branded portal that puts you in control of who sees what.
        </p>
      </div>

      {/* What */}
      <div className="space-y-3">
        <h2 className="text-heading font-bold">What It Does</h2>
        <p className="text-body text-muted-foreground">
          VizTec lets you embed any BI dashboard (Power BI, Tableau, Looker, Metabase, etc.) behind a secure login.
          You create customer accounts, assign reports, and your clients access a clean portal — no setup required on their end.
        </p>
      </div>

      {/* Who We Serve */}
      <div className="space-y-6">
        <h2 className="text-heading font-bold text-center">Who We Serve</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <Card key={a.title} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-2 text-center">
                <a.icon className="h-7 w-7 mx-auto text-primary" />
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-caption text-muted-foreground">{a.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="space-y-6">
        <h2 className="text-heading font-bold text-center">Our Philosophy</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <Card key={p.title} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-2 text-center">
                <p.icon className="h-7 w-7 mx-auto text-primary" />
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-caption text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vision */}
      <div className="space-y-3 text-center">
        <h2 className="text-heading font-bold">Our Vision</h2>
        <p className="text-body text-muted-foreground max-w-xl mx-auto">
          A world where every data professional can deliver polished analytics experiences to clients —
          without needing a development team or an enterprise license.
        </p>
        <Button size="lg" asChild className="mt-4">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
