import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", companyName: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form submitted:", data);
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="container py-16 max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-heading">Contact Us</CardTitle>
            <CardDescription>Have a question or want to learn more? Drop us a message.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center space-y-4 py-8">
                <p className="text-title font-semibold text-primary">Thank you!</p>
                <p className="text-body text-muted-foreground">Your message has been received. We'll be in touch soon.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl><Input placeholder="Company (optional)" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input placeholder="Phone (optional)" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl><Textarea placeholder="How can we help?" rows={4} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
