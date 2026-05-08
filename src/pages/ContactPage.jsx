import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const ContactPage = () => {
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Form Submitted!",
            description: "Thank you for your message. We'll be in touch shortly!",
        });
        e.target.reset();
    };

  return (
    <>
      <Helmet>
        <title>Contact Us | ATC GOLD CONSTRUCTION</title>
        <meta name="description" content="Let's build together. Contact ATC GOLD CONSTRUCTION for your next critical infrastructure project." />
      </Helmet>
      
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-16 text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary uppercase"
          >
            Let's Build Together
          </motion.h1>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-primary mb-4">Partner with ATC GOLD CONSTRUCTION to deliver projects that are:</h2>
            <div className="grid sm:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                    <ShieldCheck className="h-10 w-10 mx-auto text-secondary mb-2" />
                    <p className="font-bold text-xl text-primary">Safe by Design</p>
                    <p className="text-gray-600">Uncompromising safety protocols</p>
                </div>
                <div className="text-center">
                    <Zap className="h-10 w-10 mx-auto text-secondary mb-2" />
                    <p className="font-bold text-xl text-primary">Fast to Market</p>
                    <p className="text-gray-600">Accelerated schedules, zero delays</p>
                </div>
                <div className="text-center">
                    <CheckCircle className="h-10 w-10 mx-auto text-secondary mb-2" />
                    <p className="font-bold text-xl text-primary">Built to Last</p>
                    <p className="text-gray-600">Engineered for performance</p>
                </div>
            </div>
          </motion.div>
          
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div variants={itemVariants} className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <MapPin className="h-8 w-8 text-secondary" />
                        <div>
                            <p className="font-semibold text-lg">Headquarters</p>
                            <p className="text-gray-600">Miami, Florida</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-8 w-8 text-secondary" />
                        <div>
                            <p className="font-semibold text-lg">Phone</p>
                            <a href="tel:786-612-4565" className="text-gray-600 hover:text-secondary">786-612-4565</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-8 w-8 text-secondary" />
                        <div>
                            <p className="font-semibold text-lg">Email</p>
                            <a href="mailto:Alejandro.Talavera@atcgoldllc.com" className="text-gray-600 hover:text-secondary">Alejandro.Talavera@atcgoldllc.com</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden h-64">
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-80.30,25.70,-80.10,25.90&layer=mapnik&marker=25.761681,-80.19179"
                        style={{ border: 0, width: '100%', height: '100%' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Miami Office Location"
                    ></iframe>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-3 bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="full-name">Full Name <span className="text-red-500">*</span></Label>
                            <Input id="full-name" type="text" placeholder="John Doe" required />
                        </div>
                        <div>
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" type="text" placeholder="Your Company Inc." />
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                            <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="service-interest">Service Interest</Label>
                        <select id="service-interest" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            <option>General Inquiry</option>
                            <option>Wireless Services</option>
                            <option>EV Charging</option>
                            <option>Professional Services</option>
                            <option>A&E Design</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="project-details">Project Details</Label>
                        <Textarea id="project-details" placeholder="Tell us about your project..." rows={5} />
                    </div>
                    <div>
                        <Button type="submit" size="lg" className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold">Submit</Button>
                    </div>
                </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;