import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, isBefore, startOfDay, isSunday } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight, Lock, Loader2, Download, ArrowLeft } from 'lucide-react';
import { PageShell } from '../shared/PageShell';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { practiceAreas } from '../shared/practiceAreas';

const serviceTypes = [
  { id: 'initial', name: 'Initial Consultation', duration: '30 min', price: 15000 },
  { id: 'strategy', name: 'Strategy Session', duration: '60 min', price: 35000 },
  { id: 'document', name: 'Document Review', duration: '45 min', price: 25000 },
  { id: 'retainer', name: 'Retainer Discovery', duration: '15 min', price: 0 }
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

const detailsSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  company: z.string().optional(),
  description: z.string().min(10, "Please provide brief details"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent required" }) })
});

type DetailsValues = z.infer<typeof detailsSchema>;

export function Booking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<string>("general");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState<DetailsValues | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [paystackUrl, setPaystackUrl] = useState<string | null>(null);

  const detailsForm = useForm<DetailsValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", description: "" }
  });

  const serviceObj = serviceTypes.find(s => s.id === selectedService);
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleDetailsSubmit = async (data: DetailsValues) => {
    setDetails(data);
    setApiError(null);
    setIsProcessing(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: serviceObj?.name,
          servicePrice: serviceObj?.price,
          practiceArea: selectedPractice,
          appointmentDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          appointmentTime: selectedTime,
          clientName: data.name,
          clientEmail: data.email,
          clientPhone: data.phone,
          clientCompany: data.company,
          description: data.description
        })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Booking failed');
      setRefCode(json.refCode);
      if (!json.requiresPayment) {
        setStep(5);
      } else if (json.paystackConfigured && json.authorizationUrl) {
        setPaystackUrl(json.authorizationUrl);
        nextStep();
      } else {
        if (json.paystackError) setApiError(json.paystackError);
        nextStep();
      }
    } catch (err: any) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processPayment = async () => {
    if (paystackUrl) {
      window.open(paystackUrl, '_blank');
      setStep(5);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); setStep(5); }, 2000);
  };

  return (
    <PageShell title="Book Consultation" breadcrumbs={[{ label: 'Booking' }]}>
      <div className="bg-muted/30 py-12 border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-border z-0"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-secondary z-0 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`relative z-10 flex flex-col items-center gap-2 ${step === 5 && s === 4 ? 'opacity-0' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors border-2 ${step > s ? 'bg-secondary text-white border-secondary' : step === s ? 'bg-primary text-white border-primary' : 'bg-background text-muted-foreground border-border'}`}>
                  {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                <span className={`text-xs uppercase tracking-wider hidden sm:block ${step >= s ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Service' : s === 2 ? 'Schedule' : s === 3 ? 'Details' : 'Payment'}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-background border border-border p-6 md:p-10 shadow-sm min-h-[500px]">

            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h2 className="text-2xl font-serif text-primary mb-2">Select Service Type</h2>
                  <p className="text-muted-foreground">Choose the consultation format that fits your needs.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceTypes.map(srv => (
                    <div key={srv.id} onClick={() => setSelectedService(srv.id)}
                      className={`cursor-pointer p-6 border transition-all ${selectedService === srv.id ? 'border-secondary bg-secondary/5 ring-1 ring-secondary/50' : 'border-border hover:border-primary/30 bg-background'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-primary">{srv.name}</h3>
                        <span className="text-xs bg-muted px-2 py-1 rounded font-medium">{srv.duration}</span>
                      </div>
                      <div className="text-xl font-serif text-primary mb-1">{srv.price === 0 ? 'Free' : `₦${srv.price.toLocaleString()}`}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-6 border-t border-border">
                  <label className="text-sm font-medium text-primary">Related Practice Area (Optional)</label>
                  <select value={selectedPractice} onChange={(e) => setSelectedPractice(e.target.value)}
                    className="w-full h-12 px-3 border border-input bg-background focus:outline-none focus:ring-1 focus:ring-secondary">
                    <option value="general">General Inquiry</option>
                    {practiceAreas.map(pa => <option key={pa.slug} value={pa.title}>{pa.title}</option>)}
                  </select>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={nextStep} disabled={!selectedService} className="bg-primary text-white rounded-none px-8">
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" size="icon" onClick={prevStep} className="h-8 w-8 rounded-full"><ArrowLeft className="h-4 w-4" /></Button>
                  <div>
                    <h2 className="text-2xl font-serif text-primary mb-2">Choose Date & Time</h2>
                    <p className="text-muted-foreground">Select an available slot for your {serviceObj?.name}.</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm font-medium text-primary block mb-3">Select Date</label>
                    <div className="border border-border inline-block p-2 bg-muted/10">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate}
                        disabled={(date) => isBefore(date, startOfDay(new Date())) || isSunday(date)} className="rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary block mb-3">Available Times (WAT)</label>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map(time => (
                          <div key={time} onClick={() => setSelectedTime(time)}
                            className={`cursor-pointer py-3 text-center border text-sm font-medium transition-colors ${selectedTime === time ? 'border-secondary bg-secondary text-white' : 'border-border hover:border-primary text-primary bg-background'}`}>
                            {time}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-[200px] border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground text-center p-6 bg-muted/20">
                        Please select a date first to see available times.
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-primary">{selectedDate ? format(selectedDate, 'MMM do, yyyy') : '--'}</span> at <span className="font-medium text-primary">{selectedTime || '--'}</span>
                  </div>
                  <Button onClick={nextStep} disabled={!selectedDate || !selectedTime} className="bg-primary text-white rounded-none px-8">
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" size="icon" onClick={prevStep} className="h-8 w-8 rounded-full"><ArrowLeft className="h-4 w-4" /></Button>
                  <div>
                    <h2 className="text-2xl font-serif text-primary mb-2">Your Details</h2>
                    <p className="text-muted-foreground">Provide information so we can prepare for the session.</p>
                  </div>
                </div>
                <Form {...detailsForm}>
                  <form onSubmit={detailsForm.handleSubmit(handleDetailsSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={detailsForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} className="rounded-none h-12" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={detailsForm.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} className="rounded-none h-12" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={detailsForm.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} className="rounded-none h-12" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={detailsForm.control} name="company" render={({ field }) => (
                        <FormItem><FormLabel>Company (Optional)</FormLabel><FormControl><Input {...field} className="rounded-none h-12" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={detailsForm.control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brief Description of Legal Issue</FormLabel>
                        <FormControl><Textarea {...field} className="rounded-none resize-none h-24" placeholder="What would you like to discuss?" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={detailsForm.control} name="consent" render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 pt-2">
                        <FormControl><input type="checkbox" className="mt-1" checked={field.value} onChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-xs text-muted-foreground font-normal">I consent to the collection of my data for consultation purposes under NDPR.</FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                    {apiError && <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{apiError}</div>}
                    <div className="flex justify-end pt-6 border-t border-border">
                      <Button type="submit" disabled={isProcessing} className="bg-primary text-white rounded-none px-8">
                        {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : <>{serviceObj?.price === 0 ? "Complete Booking" : "Proceed to Payment"} <ChevronRight className="ml-2 h-4 w-4" /></>}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" size="icon" onClick={prevStep} className="h-8 w-8 rounded-full"><ArrowLeft className="h-4 w-4" /></Button>
                  <div>
                    <h2 className="text-2xl font-serif text-primary mb-2">Checkout</h2>
                    <p className="text-muted-foreground">Complete your booking securely.</p>
                  </div>
                </div>
                <div className="bg-[#f9f9f9] border border-[#e4e4e4] rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-white p-6 border-b border-[#e4e4e4] text-center">
                    <div className="text-sm text-gray-500 mb-1">{details?.email}</div>
                    <div className="text-3xl font-bold text-[#1c1d1f]">₦{serviceObj?.price.toLocaleString()}</div>
                  </div>
                  <div className="p-6 bg-[#fcfcfc] border-b border-[#e4e4e4] space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Service:</span><span className="font-medium">{serviceObj?.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-medium">{selectedDate ? format(selectedDate, 'MMM do, yyyy') : ''}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Time:</span><span className="font-medium">{selectedTime}</span></div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="mb-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Card Number</label>
                      <Input placeholder="0000 0000 0000 0000" className="mt-1 font-mono tracking-widest bg-gray-50 border-gray-200" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div><label className="text-xs font-semibold text-gray-500 uppercase">Valid Till</label><Input placeholder="MM/YY" className="mt-1 bg-gray-50 border-gray-200" /></div>
                      <div><label className="text-xs font-semibold text-gray-500 uppercase">CVV</label><Input placeholder="123" className="mt-1 bg-gray-50 border-gray-200" type="password" maxLength={3} /></div>
                    </div>
                    <Button onClick={processPayment} disabled={isProcessing} className="w-full bg-[#3bb75e] hover:bg-[#2fa350] text-white h-12 text-lg font-medium shadow-sm transition-colors">
                      {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : (paystackUrl ? `Pay ₦${serviceObj?.price.toLocaleString()} via Paystack` : `Pay ₦${serviceObj?.price.toLocaleString()}`)}
                    </Button>
                  </div>
                  <div className="p-4 bg-[#f9f9f9] flex justify-center items-center gap-2 text-xs text-gray-500">
                    <Lock className="h-3 w-3" /> Secured by <strong>Paystack</strong>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-12 animate-in zoom-in-95 space-y-6 max-w-xl mx-auto">
                <div className="w-24 h-24 bg-[#e8f5e9] text-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-8 ring-[#e8f5e9]/50">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-serif text-primary">Booking Confirmed</h2>
                <p className="text-muted-foreground text-lg">Your {serviceObj?.name} has been scheduled successfully.</p>
                <div className="bg-muted p-6 text-left border border-border mt-8 mb-8 space-y-4">
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Reference</span><span className="font-mono font-medium">{refCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Date</span><span className="font-medium">{selectedDate ? format(selectedDate, 'EEEE, MMM do, yyyy') : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span><span className="font-medium">{selectedTime} (WAT)</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-8">A confirmation email will be sent to <strong>{details?.email}</strong>.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-border rounded-none h-12" onClick={() => alert("Calendar download coming soon")}>
                    <Download className="mr-2 h-4 w-4 text-primary" /> Add to Calendar
                  </Button>
                  <a href={`https://wa.me/2347054588490?text=Hi, I just booked a ${serviceObj?.name} for ${selectedDate ? format(selectedDate, 'MMM do') : ''} at ${selectedTime}. Ref: ${refCode}`} target="_blank" rel="noreferrer">
                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-none h-12">Send WhatsApp Notification</Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
