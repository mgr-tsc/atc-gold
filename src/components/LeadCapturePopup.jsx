import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import TurnstileVerification from '@/components/TurnstileVerification';
import { useToast } from '@/components/ui/use-toast';

const POPUP_COOKIE_NAME = 'atc_gold_popup_handled';
const POPUP_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const POPUP_DELAY_MS = 5000;

const STEPS = [
  {
    title: 'Company',
    description: 'Start with your legal business identity and referral contact.',
  },
  {
    title: 'Locations',
    description: 'Tell us where your primary operation and billing address are.',
  },
  {
    title: 'Contacts',
    description: 'Identify the people we should work with during onboarding.',
  },
  {
    title: 'Capabilities',
    description: 'Share the work you perform, service areas, and crew capacity.',
  },
  {
    title: 'Review',
    description: 'Confirm licensing details and send your onboarding request.',
  },
];

const STATES = [
  'All States',
  'AL - Alabama',
  'AK - Alaska',
  'AZ - Arizona',
  'AR - Arkansas',
  'AS - American Samoa',
  'CA - California',
  'CO - Colorado',
  'CT - Connecticut',
  'DE - Delaware',
  'DC - District of Columbia',
  'FL - Florida',
  'GA - Georgia',
  'GU - Guam',
  'HI - Hawaii',
  'ID - Idaho',
  'IL - Illinois',
  'IN - Indiana',
  'IA - Iowa',
  'KS - Kansas',
  'KY - Kentucky',
  'LA - Louisiana',
  'ME - Maine',
  'MD - Maryland',
  'MA - Massachusetts',
  'MI - Michigan',
  'MN - Minnesota',
  'MS - Mississippi',
  'MO - Missouri',
  'MT - Montana',
  'NE - Nebraska',
  'NV - Nevada',
  'NH - New Hampshire',
  'NJ - New Jersey',
  'NM - New Mexico',
  'NY - New York',
  'NC - North Carolina',
  'ND - North Dakota',
  'MP - Northern Mariana Islands',
  'OH - Ohio',
  'OK - Oklahoma',
  'OR - Oregon',
  'PA - Pennsylvania',
  'PR - Puerto Rico',
  'RI - Rhode Island',
  'SC - South Carolina',
  'SD - South Dakota',
  'TN - Tennessee',
  'TX - Texas',
  'UT - Utah',
  'VT - Vermont',
  'VA - Virginia',
  'VI - Virgin Islands',
  'WA - Washington',
  'WV - West Virginia',
  'WI - Wisconsin',
  'WY - Wyoming',
];

const WORK_CATEGORIES = [
  'Wireless Work',
  'Fiber Work',
  'Energy & Sustainability',
  'Professional Services',
  'Construction Services',
  'Supplier',
];

const DETAILED_SERVICES = [
  'Architecture & Engineering (A&E)',
  'Civil Construction',
  'Concrete',
  'Crane Services',
  'DAS / Small Cell Deployment',
  'Directional Boring',
  'Drilled Foundations',
  'Electric Vehicle (EV) Charging',
  'Electrical & Power Installation',
  'Equipment Rental',
  'Excavation & Trenching',
  'Fiber Aerial Construction',
  'Fiber Cable Installer',
  'Fiber Engineering',
  'Fiber Outside Plant (OSP) Construction',
  'Fiber Technician/Splicer',
  'Fiber Underground Construction',
  'Inspection Services',
  'Locate Services',
  'Logistics',
  'Materials & Equipment Suppliers',
  'New Site Build - Collocation',
  'Plumbing',
  'Professional Services (General)',
  'Site Acquisition Services',
  'Solar Install/Maintenance',
  'Staffing',
  'Steel Fabrication',
  'Surveyor',
  'Tower Climbing & Structural Work',
  'Tower Demo',
  'Tower Equipment Upgrades',
  'Tower Stacking',
  'Welding',
  'Other',
];

const SPECIAL_STATUSES = [
  'Minority-owned business (MBE)',
  'Women-owned business (WBE)',
  'Veteran-owned business (VOB)',
  'Service-disabled veteran-owned business (SDVOB)',
  'Military spouse-owned business',
  'Small business',
  'Disadvantaged business enterprise (DBE)',
  'Historically Underutilized Business Zone (HUBZone)',
  'None of the above',
];

const CARRIERS = [
  'Verizon',
  'AT&T',
  'T-Mobile',
  'Comcast (Xfinity)',
  'Dish Networks',
  'Other',
  'None of the above',
];

const CREW_COUNTS = ['0', '1-5', '6-10', '11-20', '21+'];

const initialFormValues = {
  companyLegalName: '',
  officePhone: '',
  website: '',
  atcContact: '',
  physicalStreet: '',
  physicalCity: '',
  physicalState: '',
  physicalZip: '',
  billingSameAsPhysical: true,
  billingStreet: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  primaryFirstName: '',
  primaryLastName: '',
  primaryEmail: '',
  primaryPhone: '',
  accountingSameAsPrimary: true,
  accountingFirstName: '',
  accountingLastName: '',
  accountingEmail: '',
  accountingPhone: '',
  safetySameAsPrimary: true,
  safetyFirstName: '',
  safetyLastName: '',
  safetyEmail: '',
  safetyPhone: '',
  mainWorkCategories: [],
  detailedServices: [],
  authorizedStates: [],
  specialStatuses: [],
  carrierExperience: [],
  inHouseCrews: '',
  subcontractorCrews: '',
  hasContractorLicenses: 'No',
  licenseDetails: '',
  additionalNotes: '',
};

function hasPopupCookie() {
  return document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith(`${POPUP_COOKIE_NAME}=`));
}

function setPopupCookie() {
  document.cookie = `${POPUP_COOKIE_NAME}=1; Max-Age=${POPUP_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWebsite(value) {
  try {
    const candidate = value.includes('://') ? value : `https://${value}`;
    const url = new URL(candidate);
    return Boolean(url.hostname.includes('.'));
  } catch {
    return false;
  }
}

function isRequired(value) {
  return value.trim().length > 0;
}

function trimValue(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function validateFields(values, stepIndex) {
  const errors = {};
  const addRequired = (field, label) => {
    if (!isRequired(values[field])) {
      errors[field] = `${label} is required.`;
    }
  };
  const addMax = (field, label, maxLength) => {
    if (values[field].trim().length > maxLength) {
      errors[field] = `${label} must be ${maxLength} characters or less.`;
    }
  };
  const addArrayRequired = (field, label) => {
    if (!values[field].length) {
      errors[field] = `${label} is required.`;
    }
  };

  const validateCompany = () => {
    addRequired('companyLegalName', 'Legal company name');
    addRequired('officePhone', 'Office phone');
    addRequired('website', 'Company website');
    if (values.website && !isValidWebsite(values.website.trim())) {
      errors.website = 'Enter a valid website.';
    }
    addMax('companyLegalName', 'Legal company name', 160);
    addMax('officePhone', 'Office phone', 40);
    addMax('website', 'Company website', 160);
    addMax('atcContact', 'ATC contact/referral', 120);
  };

  const validateLocations = () => {
    addRequired('physicalStreet', 'Physical street');
    addRequired('physicalCity', 'Physical city');
    addRequired('physicalState', 'Physical state');
    addRequired('physicalZip', 'Physical zip');
    addMax('physicalStreet', 'Physical street', 180);
    addMax('physicalCity', 'Physical city', 100);
    addMax('physicalZip', 'Physical zip', 20);

    if (!values.billingSameAsPhysical) {
      addRequired('billingStreet', 'Billing street');
      addRequired('billingCity', 'Billing city');
      addRequired('billingState', 'Billing state');
      addRequired('billingZip', 'Billing zip');
      addMax('billingStreet', 'Billing street', 180);
      addMax('billingCity', 'Billing city', 100);
      addMax('billingZip', 'Billing zip', 20);
    }
  };

  const validateContactSet = (prefix, label) => {
    addRequired(`${prefix}FirstName`, `${label} first name`);
    addRequired(`${prefix}LastName`, `${label} last name`);
    addRequired(`${prefix}Email`, `${label} email`);
    addRequired(`${prefix}Phone`, `${label} phone`);

    if (values[`${prefix}Email`] && !isValidEmail(values[`${prefix}Email`].trim())) {
      errors[`${prefix}Email`] = `Enter a valid ${label.toLowerCase()} email.`;
    }

    addMax(`${prefix}FirstName`, `${label} first name`, 80);
    addMax(`${prefix}LastName`, `${label} last name`, 80);
    addMax(`${prefix}Email`, `${label} email`, 160);
    addMax(`${prefix}Phone`, `${label} phone`, 40);
  };

  const validateContacts = () => {
    validateContactSet('primary', 'Primary contact');
    if (!values.accountingSameAsPrimary) {
      validateContactSet('accounting', 'Accounting contact');
    }
    if (!values.safetySameAsPrimary) {
      validateContactSet('safety', 'Safety contact');
    }
  };

  const validateCapabilities = () => {
    addArrayRequired('mainWorkCategories', 'Main work category');
    addArrayRequired('detailedServices', 'Detailed service');
    addArrayRequired('authorizedStates', 'Authorized state/territory');
    addArrayRequired('specialStatuses', 'Special business status');
    addArrayRequired('carrierExperience', 'Carrier experience');
    addRequired('inHouseCrews', 'In-house crew count');
    addRequired('subcontractorCrews', 'Subcontractor crew count');
  };

  const validateLicensing = () => {
    addRequired('hasContractorLicenses', 'Contractor license answer');
    if (values.hasContractorLicenses === 'Yes') {
      addRequired('licenseDetails', 'Contractor license details');
    }
    addMax('licenseDetails', 'Contractor license details', 1800);
    addMax('additionalNotes', 'Additional notes', 1200);
  };

  if (stepIndex === 0 || stepIndex === 'all') validateCompany();
  if (stepIndex === 1 || stepIndex === 'all') validateLocations();
  if (stepIndex === 2 || stepIndex === 'all') validateContacts();
  if (stepIndex === 3 || stepIndex === 'all') validateCapabilities();
  if (stepIndex === 4 || stepIndex === 'all') validateLicensing();

  return errors;
}

function ErrorMessage({ children }) {
  if (!children) return null;

  return <p className="mt-1 text-sm text-destructive">{children}</p>;
}

function Field({ id, label, required = false, error, children }) {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-md border bg-gray-50 p-3">
      <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-primary">{value || 'Not provided'}</p>
    </div>
  );
}

export default function LeadCapturePopup() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const normalizedPayload = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(formValues).map(([key, value]) => [
          key,
          Array.isArray(value) ? value : trimValue(value),
        ])
      ),
    [formValues]
  );

  useEffect(() => {
    if (hasPopupCookie()) return undefined;

    const timer = window.setTimeout(() => {
      if (!hasPopupCookie()) {
        setOpen(true);
      }
    }, POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const updateField = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const updateValue = (field, value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const toggleArrayValue = (field, value, exclusiveValues = []) => {
    setFormValues((current) => {
      const currentValues = current[field];
      let nextValues;

      if (exclusiveValues.includes(value)) {
        nextValues = currentValues.includes(value) ? [] : [value];
      } else {
        nextValues = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [
              ...currentValues.filter((item) => !exclusiveValues.includes(item)),
              value,
            ];
      }

      return {
        ...current,
        [field]: nextValues,
      };
    });

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen && open) {
      setPopupCookie();
    }

    setOpen(nextOpen);
  };

  const resetTurnstile = useCallback(() => {
    setTurnstileToken('');
    setTurnstileResetKey((current) => current + 1);
  }, []);

  const goToNextStep = () => {
    const nextErrors = validateFields(formValues, stepIndex);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStepIndex((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const goToPreviousStep = () => {
    setErrors({});
    resetTurnstile();
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const resetForm = () => {
    setFormValues(initialFormValues);
    setErrors({});
    setStepIndex(0);
    resetTurnstile();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = validateFields(formValues, 'all');
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidStep = [0, 1, 2, 3, 4].find(
        (index) => Object.keys(validateFields(formValues, index)).length > 0
      );
      setStepIndex(firstInvalidStep ?? 0);
      return;
    }

    if (!turnstileToken) {
      toast({
        title: 'Security verification required',
        description: 'Complete the verification before submitting your request.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/popup-lead', {
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
        let message = 'We could not send your onboarding request. Please try again.';

        try {
          const body = await response.json();
          if (typeof body?.error === 'string') {
            message = body.error;
          }
        } catch {
          // Keep the user-facing fallback when the API does not return JSON.
        }

        throw new Error(message);
      }

      setPopupCookie();
      setOpen(false);
      resetForm();
      toast({
        title: 'Onboarding request sent',
        description: "Thank you. We'll review your information and follow up.",
      });
    } catch (error) {
      resetTurnstile();
      toast({
        title: 'Submission failed',
        description:
          error instanceof Error
            ? error.message
            : 'We could not send your onboarding request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTextField = ({
    id,
    field,
    label,
    required = false,
    type = 'text',
    autoComplete,
    placeholder,
  }) => (
    <Field id={id} label={label} required={required} error={errors[field]}>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={formValues[field]}
        onChange={updateField(field)}
        aria-invalid={Boolean(errors[field])}
        disabled={isSubmitting}
      />
    </Field>
  );

  const renderSelectField = ({ id, field, label, required = false, options }) => (
    <Field id={id} label={label} required={required} error={errors[field]}>
      <Select
        value={formValues[field]}
        onValueChange={(value) => updateValue(field, value)}
        disabled={isSubmitting}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select one" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );

  const renderCheckboxGroup = ({
    field,
    label,
    options,
    required = false,
    columns = 'sm:grid-cols-2',
    exclusiveValues = [],
  }) => (
    <div>
      <p className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </p>
      <div className={`mt-3 grid gap-2 ${columns}`}>
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-10 items-start gap-3 rounded-md border p-3 text-sm leading-snug hover:bg-gray-50"
          >
            <Checkbox
              checked={formValues[field].includes(option)}
              onCheckedChange={() =>
                toggleArrayValue(field, option, exclusiveValues)
              }
              disabled={isSubmitting}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <ErrorMessage>{errors[field]}</ErrorMessage>
    </div>
  );

  const renderSameAsToggle = (field, label) => (
    <label className="flex items-center gap-3 rounded-md border bg-gray-50 p-3 text-sm">
      <Checkbox
        checked={formValues[field]}
        onCheckedChange={(checked) => updateValue(field, Boolean(checked))}
        disabled={isSubmitting}
      />
      <span>{label}</span>
    </label>
  );

  const renderCrewRadio = (field, label) => (
    <div>
      <p className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </p>
      <RadioGroup
        className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5"
        value={formValues[field]}
        onValueChange={(value) => updateValue(field, value)}
        disabled={isSubmitting}
      >
        {CREW_COUNTS.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 rounded-md border p-3 text-sm hover:bg-gray-50"
          >
            <RadioGroupItem value={option} />
            <span>{option}</span>
          </label>
        ))}
      </RadioGroup>
      <ErrorMessage>{errors[field]}</ErrorMessage>
    </div>
  );

  const currentStep = STEPS[stepIndex];
  const isFinalStep = stepIndex === STEPS.length - 1;
  const reviewReady = useMemo(
    () => Object.keys(validateFields(formValues, 'all')).length === 0,
    [formValues]
  );
  const primaryContactName = `${formValues.primaryFirstName} ${formValues.primaryLastName}`.trim();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">
            Vendor Onboarding Request
          </DialogTitle>
          <DialogDescription>
            Share your company profile so ATC GOLD CONSTRUCTION can review fit
            and follow up with next steps.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Step {stepIndex + 1} of {STEPS.length}
            </span>
            <span>{currentStep.title}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-secondary transition-all"
              style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <h3 className="text-xl font-semibold text-primary">{currentStep.title}</h3>
            <p className="text-sm text-muted-foreground">{currentStep.description}</p>
          </div>

          {stepIndex === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {renderTextField({
                id: 'vendor-company-legal-name',
                field: 'companyLegalName',
                label: 'Legal company name',
                required: true,
                autoComplete: 'organization',
              })}
              {renderTextField({
                id: 'vendor-office-phone',
                field: 'officePhone',
                label: 'Office phone',
                required: true,
                type: 'tel',
                autoComplete: 'tel',
                placeholder: '(555) 123-4567',
              })}
              {renderTextField({
                id: 'vendor-website',
                field: 'website',
                label: 'Company website',
                required: true,
                type: 'url',
                autoComplete: 'url',
                placeholder: 'example.com',
              })}
              {renderTextField({
                id: 'vendor-atc-contact',
                field: 'atcContact',
                label: 'Known ATC contact or referral',
                placeholder: 'Name or source',
              })}
            </div>
          )}

          {stepIndex === 1 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {renderTextField({
                    id: 'vendor-physical-street',
                    field: 'physicalStreet',
                    label: 'Physical street address',
                    required: true,
                    autoComplete: 'street-address',
                  })}
                </div>
                {renderTextField({
                  id: 'vendor-physical-city',
                  field: 'physicalCity',
                  label: 'Physical city',
                  required: true,
                  autoComplete: 'address-level2',
                })}
                {renderSelectField({
                  id: 'vendor-physical-state',
                  field: 'physicalState',
                  label: 'Physical state',
                  required: true,
                  options: STATES.filter((state) => state !== 'All States'),
                })}
                {renderTextField({
                  id: 'vendor-physical-zip',
                  field: 'physicalZip',
                  label: 'Physical zip code',
                  required: true,
                  autoComplete: 'postal-code',
                })}
              </div>

              {renderSameAsToggle(
                'billingSameAsPhysical',
                'Billing/mailing address is the same as physical address'
              )}

              {!formValues.billingSameAsPhysical && (
                <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    {renderTextField({
                      id: 'vendor-billing-street',
                      field: 'billingStreet',
                      label: 'Billing street address',
                      required: true,
                    })}
                  </div>
                  {renderTextField({
                    id: 'vendor-billing-city',
                    field: 'billingCity',
                    label: 'Billing city',
                    required: true,
                  })}
                  {renderSelectField({
                    id: 'vendor-billing-state',
                    field: 'billingState',
                    label: 'Billing state',
                    required: true,
                    options: STATES.filter((state) => state !== 'All States'),
                  })}
                  {renderTextField({
                    id: 'vendor-billing-zip',
                    field: 'billingZip',
                    label: 'Billing zip code',
                    required: true,
                  })}
                </div>
              )}
            </div>
          )}

          {stepIndex === 2 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {renderTextField({
                  id: 'vendor-primary-first-name',
                  field: 'primaryFirstName',
                  label: 'Primary contact first name',
                  required: true,
                  autoComplete: 'given-name',
                })}
                {renderTextField({
                  id: 'vendor-primary-last-name',
                  field: 'primaryLastName',
                  label: 'Primary contact last name',
                  required: true,
                  autoComplete: 'family-name',
                })}
                {renderTextField({
                  id: 'vendor-primary-email',
                  field: 'primaryEmail',
                  label: 'Primary contact email',
                  required: true,
                  type: 'email',
                  autoComplete: 'email',
                })}
                {renderTextField({
                  id: 'vendor-primary-phone',
                  field: 'primaryPhone',
                  label: 'Primary contact phone',
                  required: true,
                  type: 'tel',
                  autoComplete: 'tel',
                })}
              </div>

              {renderSameAsToggle(
                'accountingSameAsPrimary',
                'Accounting contact is the same as primary contact'
              )}

              {!formValues.accountingSameAsPrimary && (
                <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
                  {renderTextField({
                    id: 'vendor-accounting-first-name',
                    field: 'accountingFirstName',
                    label: 'Accounting first name',
                    required: true,
                  })}
                  {renderTextField({
                    id: 'vendor-accounting-last-name',
                    field: 'accountingLastName',
                    label: 'Accounting last name',
                    required: true,
                  })}
                  {renderTextField({
                    id: 'vendor-accounting-email',
                    field: 'accountingEmail',
                    label: 'Accounting email',
                    required: true,
                    type: 'email',
                  })}
                  {renderTextField({
                    id: 'vendor-accounting-phone',
                    field: 'accountingPhone',
                    label: 'Accounting phone',
                    required: true,
                    type: 'tel',
                  })}
                </div>
              )}

              {renderSameAsToggle(
                'safetySameAsPrimary',
                'Safety contact is the same as primary contact'
              )}

              {!formValues.safetySameAsPrimary && (
                <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
                  {renderTextField({
                    id: 'vendor-safety-first-name',
                    field: 'safetyFirstName',
                    label: 'Safety first name',
                    required: true,
                  })}
                  {renderTextField({
                    id: 'vendor-safety-last-name',
                    field: 'safetyLastName',
                    label: 'Safety last name',
                    required: true,
                  })}
                  {renderTextField({
                    id: 'vendor-safety-email',
                    field: 'safetyEmail',
                    label: 'Safety email',
                    required: true,
                    type: 'email',
                  })}
                  {renderTextField({
                    id: 'vendor-safety-phone',
                    field: 'safetyPhone',
                    label: 'Safety phone',
                    required: true,
                    type: 'tel',
                  })}
                </div>
              )}
            </div>
          )}

          {stepIndex === 3 && (
            <div className="space-y-6">
              {renderCheckboxGroup({
                field: 'mainWorkCategories',
                label: 'Main type of work your company offers',
                options: WORK_CATEGORIES,
                required: true,
              })}
              {renderCheckboxGroup({
                field: 'detailedServices',
                label: 'Services your company provides',
                options: DETAILED_SERVICES,
                required: true,
              })}
              {renderCheckboxGroup({
                field: 'authorizedStates',
                label: 'States/territories where you are authorized to operate',
                options: STATES,
                required: true,
                columns: 'sm:grid-cols-3',
                exclusiveValues: ['All States'],
              })}
              {renderCheckboxGroup({
                field: 'specialStatuses',
                label: 'Special status business type',
                options: SPECIAL_STATUSES,
                required: true,
                exclusiveValues: ['None of the above'],
              })}
              {renderCheckboxGroup({
                field: 'carrierExperience',
                label: 'Carriers you have done work for',
                options: CARRIERS,
                required: true,
                exclusiveValues: ['None of the above'],
              })}
              <div className="grid gap-5 sm:grid-cols-2">
                {renderCrewRadio('inHouseCrews', 'In-house crews')}
                {renderCrewRadio('subcontractorCrews', 'Subcontractor crews')}
              </div>
            </div>
          )}

          {stepIndex === 4 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium">
                  Does your company hold state-issued contractor licenses?{' '}
                  <span className="text-destructive">*</span>
                </p>
                <RadioGroup
                  className="mt-3 grid gap-2 sm:grid-cols-2"
                  value={formValues.hasContractorLicenses}
                  onValueChange={(value) =>
                    updateValue('hasContractorLicenses', value)
                  }
                  disabled={isSubmitting}
                >
                  {['Yes', 'No'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 rounded-md border p-3 text-sm hover:bg-gray-50"
                    >
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
                <ErrorMessage>{errors.hasContractorLicenses}</ErrorMessage>
              </div>

              {formValues.hasContractorLicenses === 'Yes' && (
                <Field
                  id="vendor-license-details"
                  label="Contractor license details"
                  required
                  error={errors.licenseDetails}
                >
                  <Textarea
                    id="vendor-license-details"
                    rows={5}
                    placeholder="State | License name | License number"
                    value={formValues.licenseDetails}
                    onChange={updateField('licenseDetails')}
                    aria-invalid={Boolean(errors.licenseDetails)}
                    disabled={isSubmitting}
                  />
                </Field>
              )}

              <Field
                id="vendor-additional-notes"
                label="Additional notes"
                error={errors.additionalNotes}
              >
                <Textarea
                  id="vendor-additional-notes"
                  rows={4}
                  placeholder="Share anything else that helps us evaluate your capabilities."
                  value={formValues.additionalNotes}
                  onChange={updateField('additionalNotes')}
                  aria-invalid={Boolean(errors.additionalNotes)}
                  disabled={isSubmitting}
                />
              </Field>

              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryItem label="Company" value={formValues.companyLegalName} />
                <SummaryItem label="Primary contact" value={primaryContactName} />
                <SummaryItem label="Primary email" value={formValues.primaryEmail} />
                <SummaryItem
                  label="Main work"
                  value={formValues.mainWorkCategories.join(', ')}
                />
                <SummaryItem
                  label="Authorized states"
                  value={formValues.authorizedStates.join(', ')}
                />
                <SummaryItem
                  label="Crew capacity"
                  value={`In-house: ${formValues.inHouseCrews || 'N/A'} | Subcontractor: ${formValues.subcontractorCrews || 'N/A'}`}
                />
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium text-primary">
                  Security verification
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete this final check to enable submission.
                </p>
                <TurnstileVerification
                  enabled={open && isFinalStep && reviewReady}
                  action="vendor_onboarding"
                  token={turnstileToken}
                  onTokenChange={setTurnstileToken}
                  resetSignal={turnstileResetKey}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={stepIndex === 0 || isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {isFinalStep ? (
              <Button
                type="submit"
                className="bg-secondary text-primary font-bold hover:bg-secondary/90"
                disabled={isSubmitting || !turnstileToken}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Submit request
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                className="bg-secondary text-primary font-bold hover:bg-secondary/90"
                onClick={goToNextStep}
                disabled={isSubmitting}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
