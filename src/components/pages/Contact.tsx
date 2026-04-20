import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.literal(true, { errorMap: () => ({ message: "You must consent to data processing" }) })
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, subject: data.subject, message: data.message })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      setRefId(json.refCode);
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell title="Contact Us" breadcrumbs={[{ label: 'Contact' }]}>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-12 max-w-md">We are available to answer your inquiries and discuss how we can assist with your legal needs.</p>

              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-secondary" /></div>
                  <div><h4 className="font-bold text-primary mb-1">Abuja Office</h4><p className="text-sm text-muted-foreground">No. 28, 3rd Avenue,<br />Gwarinpa Estate, Abuja</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-secondary" /></div>
                  <div><h4 className="font-bold text-primary mb-1">Lagos Office</h4><p className="text-sm text-muted-foreground">Available by appointment only.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><Phone className="h-5 w-5 text-secondary" /></div>
                  <div><h4 className="font-bold text-primary mb-1">Phone & WhatsApp</h4><p className="text-sm text-muted-foreground">Phone: 09029633193<br />WhatsApp: 07054588490</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><Mail className="h-5 w-5 text-secondary" /></div>
                  <div><h4 className="font-bold text-primary mb-1">Email Address</h4><p className="text-sm text-muted-foreground">G.ondahlawoffice@gmail.com</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><Clock className="h-5 w-5 text-secondary" /></div>
                  <div><h4 className="font-bold text-primary mb-1">Business Hours</h4><p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM (WAT)</p></div>
                </div>
              </div>

              <div className="h-[300px] bg-muted border border-border w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.815777174362!2d7.4045563!3d9.0805345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e7512803b9ea7%3A0x789cf308f237bf32!2sGwarinpa%20Estate%2C%20Abuja!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location"
                ></iframe>
              </div>
            </div>

            <div className="bg-muted/30 p-8 md:p-12 border border-border">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-20 h-20 bg-[#e8f5e9] text-[#2e7d32] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-serif text-primary">Message Received</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. A member of our team will contact you shortly.</p>
                  <div className="bg-background border border-border px-6 py-3 rounded text-sm font-mono">Reference: {refId}</div>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif text-primary mb-8">Send a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john@example.com" className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="090..." className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="E.g., Corporate Registration Inquiry" className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="How can we help you?" className="bg-background rounded-none min-h-[150px] resize-none" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="consent" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                          <FormControl><input type="checkbox" className="mt-1" checked={field.value} onChange={field.onChange} /></FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-xs text-muted-foreground font-normal">I consent to Gloria Ondah & Associates collecting and processing my data in accordance with the NDPR and the Privacy Policy.</FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )} />
                      {submitError && <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{submitError}</div>}
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14 text-base">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
