import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../shared/motion';

const SERVICES = [
  'Corporate & Business Registration',
  'Contract Drafting & Review',
  'Regulatory Compliance & Corporate Filings',
  'Litigation & Dispute Resolution',
  'Intellectual Property Services',
  'Property & Real Estate Legal Services',
  'Employment & HR Legal Advisory',
  'Oil & Gas Legal Advisory',
  'Other / General Inquiry'
];

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().optional(),
  contactMethod: z.enum(['phone', 'email', 'whatsapp']).default('email'),
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
    defaultValues: { name: "", email: "", phone: "", service: "", contactMethod: 'email', subject: "", message: "" }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const subject = data.service ? `[${data.service}] ${data.subject}` : data.subject;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, subject, message: data.message })
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

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-6 mb-16"
          >
            {[
              { icon: Phone, label: 'Call Us', value: '09029633913', href: 'tel:+2349029633913', sub: 'Mon–Fri, 8am–6pm WAT' },
              { icon: MessageCircle, label: 'WhatsApp', value: '07054588490', href: 'https://wa.me/2347054588490', sub: 'Typically responds within an hour' },
              { icon: Mail, label: 'Email Us', value: 'info@gloriaondah.com', href: 'mailto:info@gloriaondah.com', sub: 'Response within 1 business day' }
            ].map((card) => {
              const Icon = card.icon;
              return (
                <motion.a key={card.label} variants={fadeInUp} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="group flex flex-col items-center text-center p-8 border border-border hover:border-secondary/50 transition-all bg-background hover:bg-muted/20">
                  <div className="w-14 h-14 bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-serif text-primary text-lg mb-1">{card.label}</h3>
                  <p className="text-sm font-medium text-foreground break-all">{card.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                </motion.a>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-4">Office Locations</h2>
              <p className="text-muted-foreground mb-10 max-w-md">We are available in Abuja and Lagos to support your legal needs.</p>

              <div className="space-y-8 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-secondary" /></div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Abuja Office</h4>
                    <p className="text-sm text-muted-foreground">No. 28, 3rd Avenue,<br />Gwarinpa Estate, Abuja</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-secondary" /></div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Lagos Office</h4>
                    <p className="text-sm text-muted-foreground">Available by appointment only.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0"><Clock className="h-5 w-5 text-secondary" /></div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">Business Hours</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between gap-8"><span>Monday – Friday</span><span className="font-medium text-foreground">8:00 AM – 6:00 PM</span></div>
                      <div className="flex justify-between gap-8"><span>Saturday</span><span className="font-medium text-foreground">By appointment</span></div>
                      <div className="flex justify-between gap-8"><span>Sunday</span><span className="font-medium text-foreground">Closed</span></div>
                      <div className="mt-3 text-xs bg-primary/5 border border-primary/10 px-3 py-2 text-primary font-medium">
                        Consultations available 24/7 via WhatsApp
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[300px] bg-muted border border-border w-full overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.815777174362!2d7.4045563!3d9.0805345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e7512803b9ea7%3A0x789cf308f237bf32!2sGwarinpa%20Estate%2C%20Abuja!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Abuja Office Location"
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
                  <p className="text-muted-foreground">Thank you for reaching out. A member of our team will contact you within one business day.</p>
                  <div className="bg-background border border-border px-6 py-3 text-sm font-mono">Reference: {refId}</div>
                  <Button variant="outline" className="rounded-none" onClick={() => { setIsSubmitted(false); form.reset(); }}>Send Another Message</Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif text-primary mb-8">Send a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="Adaeze Okeke" className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" placeholder="adaeze@company.ng" className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Phone Number *</FormLabel><FormControl><Input placeholder="080..." className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="service" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interested In</FormLabel>
                            <FormControl>
                              <select {...field} className="w-full h-12 px-3 border border-input bg-background focus:outline-none focus:ring-1 focus:ring-secondary text-sm rounded-none">
                                <option value="">Select a service...</option>
                                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem><FormLabel>Subject *</FormLabel><FormControl><Input placeholder="e.g., Company Registration Inquiry" className="bg-background rounded-none h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Message *</FormLabel><FormControl><Textarea placeholder="How can we help you?" className="bg-background rounded-none min-h-[130px] resize-none" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="contactMethod" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Contact Method</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-4 pt-1">
                              {[
                                { value: 'email', label: 'Email' },
                                { value: 'phone', label: 'Phone Call' },
                                { value: 'whatsapp', label: 'WhatsApp' }
                              ].map(opt => (
                                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" value={opt.value} checked={field.value === opt.value}
                                    onChange={() => field.onChange(opt.value)} className="w-4 h-4 accent-[#440a18]" />
                                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="consent" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-border p-4 bg-background">
                          <FormControl><input type="checkbox" className="mt-1 w-4 h-4" checked={field.value} onChange={field.onChange} /></FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-xs text-muted-foreground font-normal">I consent to Gloria Ondah & Associates collecting and processing my data in accordance with the NDPR and the <a href="/privacy" className="text-secondary hover:underline">Privacy Policy</a>.</FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )} />
                      {submitError && <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{submitError}</div>}
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14 text-base">
                        {isSubmitting ? 'Sending Message...' : 'Send a Message'}
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
