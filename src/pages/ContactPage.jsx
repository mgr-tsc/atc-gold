import React, { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import TurnstileVerification from '@/components/TurnstileVerification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

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

const serviceOptions = [
  'General Inquiry',
  'Wireless Services',
  'EV Charging',
  'Professional Services',
  'A&E Design',
];

const initialFormValues = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  serviceInterest: 'General Inquiry',
  projectDetails: '',
};

const fieldLimits = {
  fullName: 120,
  companyName: 160,
  email: 160,
  phone: 40,
  projectDetails: 1200,
};

function trimValue(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactForm(values) {
  const normalized = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, trimValue(value)])
  );
  const errors = {};

  if (!normalized.fullName) {
    errors.fullName = 'Full name is required.';
  }

  if (!normalized.email) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(normalized.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!normalized.phone) {
    errors.phone = 'Phone number is required.';
  }

  if (!serviceOptions.includes(normalized.serviceInterest)) {
    errors.serviceInterest = 'Choose a valid service interest.';
  }

  for (const [field, maxLength] of Object.entries(fieldLimits)) {
    if (normalized[field]?.length > maxLength) {
      errors[field] = `${field} must be ${maxLength} characters or less.`;
    }
  }

  return errors;
}

function ErrorMessage({ children }) {
  if (!children) return null;

  return <p className="mt-1 text-sm text-destructive">{children}</p>;
}

function ContactField({ id, label, required = false, error, children }) {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}

const ContactPage = () => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const validationErrors = useMemo(
    () => validateContactForm(formValues),
    [formValues]
  );
  const formReady = Object.keys(validationErrors).length === 0;
  const normalizedPayload = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(formValues).map(([key, value]) => [key, trimValue(value)])
      ),
    [formValues]
  );

  const resetTurnstile = useCallback(() => {
    setTurnstileToken('');
    setTurnstileResetKey((current) => current + 1);
  }, []);

  const updateField = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const markTouched = (field) => () => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
  };

  const fieldError = (field) =>
    touched[field] || submitAttempted ? validationErrors[field] : undefined;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitAttempted(true);

    if (!formReady) {
      return;
    }

    if (!turnstileToken) {
      toast({
        title: 'Security verification required',
        description: 'Complete the verification before submitting your message.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...normalizedPayload,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        let message = 'We could not send your message. Please try again.';

        try {
          const body = await response.json();
          if (typeof body?.error === 'string') {
            message = body.error;
          }
        } catch {
          // Keep the fallback when the API does not return JSON.
        }

        throw new Error(message);
      }

      setFormValues(initialFormValues);
      setTouched({});
      setSubmitAttempted(false);
      resetTurnstile();
      toast({
        title: 'Message sent',
        description: "Thank you for your message. We'll be in touch shortly.",
      });
    } catch (error) {
      resetTurnstile();
      toast({
        title: 'Submission failed',
        description:
          error instanceof Error
            ? error.message
            : 'We could not send your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | ATC GOLD CONSTRUCTION</title>
        <meta
          name="description"
          content="Let's build together. Contact ATC GOLD CONSTRUCTION for your next critical infrastructure project."
        />
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              Partner with ATC GOLD CONSTRUCTION to deliver projects that are:
            </h2>
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
              <h3 className="text-2xl font-bold text-primary mb-6">
                Contact Information
              </h3>
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
                    <a
                      href="tel:786-612-4565"
                      className="text-gray-600 hover:text-secondary"
                    >
                      786-612-4565
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="font-semibold text-lg">Email</p>
                    <a
                      href="mailto:Alejandro.Talavera@atcgoldllc.com"
                      className="text-gray-600 hover:text-secondary"
                    >
                      Alejandro.Talavera@atcgoldllc.com
                    </a>
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
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 bg-gray-50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <ContactField
                    id="full-name"
                    label="Full Name"
                    required
                    error={fieldError('fullName')}
                  >
                    <Input
                      id="full-name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Doe"
                      value={formValues.fullName}
                      onChange={updateField('fullName')}
                      onBlur={markTouched('fullName')}
                      aria-invalid={Boolean(fieldError('fullName'))}
                      disabled={isSubmitting}
                    />
                  </ContactField>
                  <ContactField
                    id="company-name"
                    label="Company Name"
                    error={fieldError('companyName')}
                  >
                    <Input
                      id="company-name"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your Company Inc."
                      value={formValues.companyName}
                      onChange={updateField('companyName')}
                      onBlur={markTouched('companyName')}
                      aria-invalid={Boolean(fieldError('companyName'))}
                      disabled={isSubmitting}
                    />
                  </ContactField>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <ContactField
                    id="email"
                    label="Email Address"
                    required
                    error={fieldError('email')}
                  >
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formValues.email}
                      onChange={updateField('email')}
                      onBlur={markTouched('email')}
                      aria-invalid={Boolean(fieldError('email'))}
                      disabled={isSubmitting}
                    />
                  </ContactField>
                  <ContactField
                    id="phone"
                    label="Phone Number"
                    required
                    error={fieldError('phone')}
                  >
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      value={formValues.phone}
                      onChange={updateField('phone')}
                      onBlur={markTouched('phone')}
                      aria-invalid={Boolean(fieldError('phone'))}
                      disabled={isSubmitting}
                    />
                  </ContactField>
                </div>
                <ContactField
                  id="service-interest"
                  label="Service Interest"
                  error={fieldError('serviceInterest')}
                >
                  <select
                    id="service-interest"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formValues.serviceInterest}
                    onChange={updateField('serviceInterest')}
                    onBlur={markTouched('serviceInterest')}
                    disabled={isSubmitting}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </ContactField>
                <ContactField
                  id="project-details"
                  label="Project Details"
                  error={fieldError('projectDetails')}
                >
                  <Textarea
                    id="project-details"
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={formValues.projectDetails}
                    onChange={updateField('projectDetails')}
                    onBlur={markTouched('projectDetails')}
                    aria-invalid={Boolean(fieldError('projectDetails'))}
                    disabled={isSubmitting}
                  />
                </ContactField>

                <div className="rounded-lg border bg-background p-4">
                  <p className="text-sm font-medium text-primary">
                    Security verification
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete this final check to enable submission.
                  </p>
                  <TurnstileVerification
                    enabled={formReady}
                    action="contact_form"
                    token={turnstileToken}
                    onTokenChange={setTurnstileToken}
                    resetSignal={turnstileResetKey}
                    lockedMessage="Complete the required contact fields to unlock verification."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold"
                  disabled={isSubmitting || !formReady || !turnstileToken}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;
