const RESEND_EMAILS_ENDPOINT = 'https://api.resend.com/emails';
const TURNSTILE_SITEVERIFY_ENDPOINT =
	'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const jsonHeaders = {
	'content-type': 'application/json; charset=UTF-8',
};

const states = [
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

const workCategories = [
	'Wireless Work',
	'Fiber Work',
	'Energy & Sustainability',
	'Professional Services',
	'Construction Services',
	'Supplier',
];

const detailedServices = [
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

const specialStatuses = [
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

const carriers = [
	'Verizon',
	'AT&T',
	'T-Mobile',
	'Comcast (Xfinity)',
	'Dish Networks',
	'Other',
	'None of the above',
];

const crewCounts = ['0', '1-5', '6-10', '11-20', '21+'];

const contactServiceInterests = [
	'General Inquiry',
	'Wireless Services',
	'EV Charging',
	'Professional Services',
	'A&E Design',
];

const selectOptions = {
	physicalState: states.filter((state) => state !== 'All States'),
	billingState: states.filter((state) => state !== 'All States'),
	mainWorkCategories: workCategories,
	detailedServices,
	authorizedStates: states,
	specialStatuses,
	carrierExperience: carriers,
	inHouseCrews: crewCounts,
	subcontractorCrews: crewCounts,
	hasContractorLicenses: ['Yes', 'No'],
};

const vendorFieldLimits = {
	companyLegalName: 160,
	officePhone: 40,
	website: 160,
	atcContact: 120,
	physicalStreet: 180,
	physicalCity: 100,
	physicalZip: 20,
	billingStreet: 180,
	billingCity: 100,
	billingZip: 20,
	primaryFirstName: 80,
	primaryLastName: 80,
	primaryEmail: 160,
	primaryPhone: 40,
	accountingFirstName: 80,
	accountingLastName: 80,
	accountingEmail: 160,
	accountingPhone: 40,
	safetyFirstName: 80,
	safetyLastName: 80,
	safetyEmail: 160,
	safetyPhone: 40,
	licenseDetails: 1800,
	additionalNotes: 1200,
};

const contactFieldLimits = {
	fullName: 120,
	companyName: 160,
	email: 160,
	phone: 40,
	projectDetails: 1200,
};

function json(data, init = {}) {
	return Response.json(data, {
		...init,
		headers: {
			...jsonHeaders,
			...init.headers,
		},
	});
}

function escapeHtml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function normalizeString(value) {
	return typeof value === 'string' ? value.trim() : '';
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

function normalizeArray(value) {
	return Array.isArray(value)
		? value.filter((item) => typeof item === 'string').map((item) => item.trim())
		: [];
}

function normalizeTurnstileToken(value) {
	return typeof value === 'string' ? value.trim() : '';
}

function formatList(value) {
	return value.length ? value.join(', ') : 'Not provided';
}

function requireString(errors, lead, field, label) {
	if (!lead[field]) {
		errors[field] = `${label} is required.`;
	}
}

function requireArray(errors, lead, field, label) {
	if (!lead[field].length) {
		errors[field] = `${label} is required.`;
	}
}

function validateOption(errors, lead, field, label) {
	if (!selectOptions[field].includes(lead[field])) {
		errors[field] = `Choose a valid ${label}.`;
	}
}

function validateArrayOptions(errors, lead, field, label) {
	const allowedOptions = new Set(selectOptions[field]);
	const invalidValues = lead[field].filter((value) => !allowedOptions.has(value));

	if (invalidValues.length) {
		errors[field] = `Choose valid ${label} values.`;
	}
}

function validatePopupLead(input) {
	if (!input || typeof input !== 'object' || Array.isArray(input)) {
		return {
			error: 'Expected a vendor onboarding payload.',
		};
	}

	const lead = {
		turnstileToken: normalizeTurnstileToken(input.turnstileToken),
		companyLegalName: normalizeString(input.companyLegalName),
		officePhone: normalizeString(input.officePhone),
		website: normalizeString(input.website),
		atcContact: normalizeString(input.atcContact),
		physicalStreet: normalizeString(input.physicalStreet),
		physicalCity: normalizeString(input.physicalCity),
		physicalState: normalizeString(input.physicalState),
		physicalZip: normalizeString(input.physicalZip),
		billingSameAsPhysical: input.billingSameAsPhysical !== false,
		billingStreet: normalizeString(input.billingStreet),
		billingCity: normalizeString(input.billingCity),
		billingState: normalizeString(input.billingState),
		billingZip: normalizeString(input.billingZip),
		primaryFirstName: normalizeString(input.primaryFirstName),
		primaryLastName: normalizeString(input.primaryLastName),
		primaryEmail: normalizeString(input.primaryEmail),
		primaryPhone: normalizeString(input.primaryPhone),
		accountingSameAsPrimary: input.accountingSameAsPrimary !== false,
		accountingFirstName: normalizeString(input.accountingFirstName),
		accountingLastName: normalizeString(input.accountingLastName),
		accountingEmail: normalizeString(input.accountingEmail),
		accountingPhone: normalizeString(input.accountingPhone),
		safetySameAsPrimary: input.safetySameAsPrimary !== false,
		safetyFirstName: normalizeString(input.safetyFirstName),
		safetyLastName: normalizeString(input.safetyLastName),
		safetyEmail: normalizeString(input.safetyEmail),
		safetyPhone: normalizeString(input.safetyPhone),
		mainWorkCategories: normalizeArray(input.mainWorkCategories),
		detailedServices: normalizeArray(input.detailedServices),
		authorizedStates: normalizeArray(input.authorizedStates),
		specialStatuses: normalizeArray(input.specialStatuses),
		carrierExperience: normalizeArray(input.carrierExperience),
		inHouseCrews: normalizeString(input.inHouseCrews),
		subcontractorCrews: normalizeString(input.subcontractorCrews),
		hasContractorLicenses: normalizeString(input.hasContractorLicenses),
		licenseDetails: normalizeString(input.licenseDetails),
		additionalNotes: normalizeString(input.additionalNotes),
	};

	const errors = {};

	if (!lead.turnstileToken) {
		errors.turnstileToken = 'Security verification is required.';
	} else if (lead.turnstileToken.length > 2048) {
		errors.turnstileToken = 'Security verification token is invalid.';
	}

	requireString(errors, lead, 'companyLegalName', 'Legal company name');
	requireString(errors, lead, 'officePhone', 'Office phone');
	requireString(errors, lead, 'website', 'Company website');
	requireString(errors, lead, 'physicalStreet', 'Physical street');
	requireString(errors, lead, 'physicalCity', 'Physical city');
	requireString(errors, lead, 'physicalState', 'Physical state');
	requireString(errors, lead, 'physicalZip', 'Physical zip');
	requireString(errors, lead, 'primaryFirstName', 'Primary contact first name');
	requireString(errors, lead, 'primaryLastName', 'Primary contact last name');
	requireString(errors, lead, 'primaryEmail', 'Primary contact email');
	requireString(errors, lead, 'primaryPhone', 'Primary contact phone');
	requireString(errors, lead, 'inHouseCrews', 'In-house crew count');
	requireString(errors, lead, 'subcontractorCrews', 'Subcontractor crew count');
	requireString(errors, lead, 'hasContractorLicenses', 'Contractor license answer');
	requireArray(errors, lead, 'mainWorkCategories', 'Main work category');
	requireArray(errors, lead, 'detailedServices', 'Detailed service');
	requireArray(errors, lead, 'authorizedStates', 'Authorized state/territory');
	requireArray(errors, lead, 'specialStatuses', 'Special business status');
	requireArray(errors, lead, 'carrierExperience', 'Carrier experience');

	if (lead.website && !isValidWebsite(lead.website)) {
		errors.website = 'Enter a valid website.';
	}

	if (lead.primaryEmail && !isValidEmail(lead.primaryEmail)) {
		errors.primaryEmail = 'Enter a valid primary contact email.';
	}

	if (!selectOptions.physicalState.includes(lead.physicalState)) {
		errors.physicalState = 'Choose a valid physical state.';
	}

	if (!lead.billingSameAsPhysical) {
		requireString(errors, lead, 'billingStreet', 'Billing street');
		requireString(errors, lead, 'billingCity', 'Billing city');
		requireString(errors, lead, 'billingState', 'Billing state');
		requireString(errors, lead, 'billingZip', 'Billing zip');
		if (!selectOptions.billingState.includes(lead.billingState)) {
			errors.billingState = 'Choose a valid billing state.';
		}
	}

	if (!lead.accountingSameAsPrimary) {
		requireString(errors, lead, 'accountingFirstName', 'Accounting first name');
		requireString(errors, lead, 'accountingLastName', 'Accounting last name');
		requireString(errors, lead, 'accountingEmail', 'Accounting email');
		requireString(errors, lead, 'accountingPhone', 'Accounting phone');
		if (lead.accountingEmail && !isValidEmail(lead.accountingEmail)) {
			errors.accountingEmail = 'Enter a valid accounting contact email.';
		}
	}

	if (!lead.safetySameAsPrimary) {
		requireString(errors, lead, 'safetyFirstName', 'Safety first name');
		requireString(errors, lead, 'safetyLastName', 'Safety last name');
		requireString(errors, lead, 'safetyEmail', 'Safety email');
		requireString(errors, lead, 'safetyPhone', 'Safety phone');
		if (lead.safetyEmail && !isValidEmail(lead.safetyEmail)) {
			errors.safetyEmail = 'Enter a valid safety contact email.';
		}
	}

	validateArrayOptions(errors, lead, 'mainWorkCategories', 'main work category');
	validateArrayOptions(errors, lead, 'detailedServices', 'service');
	validateArrayOptions(errors, lead, 'authorizedStates', 'authorized state');
	validateArrayOptions(errors, lead, 'specialStatuses', 'special business status');
	validateArrayOptions(errors, lead, 'carrierExperience', 'carrier experience');
	validateOption(errors, lead, 'inHouseCrews', 'in-house crew count');
	validateOption(errors, lead, 'subcontractorCrews', 'subcontractor crew count');
	validateOption(errors, lead, 'hasContractorLicenses', 'contractor license answer');

	if (lead.hasContractorLicenses === 'Yes') {
		requireString(errors, lead, 'licenseDetails', 'Contractor license details');
	}

	for (const [field, maxLength] of Object.entries(vendorFieldLimits)) {
		if (lead[field].length > maxLength) {
			errors[field] = `${field} must be ${maxLength} characters or less.`;
		}
	}

	if (Object.keys(errors).length > 0) {
		return {
			error: 'Please correct the highlighted fields.',
			fields: errors,
		};
	}

	return { lead };
}

function validateContactRequest(input) {
	if (!input || typeof input !== 'object' || Array.isArray(input)) {
		return {
			error: 'Expected a contact form payload.',
		};
	}

	const contact = {
		turnstileToken: normalizeTurnstileToken(input.turnstileToken),
		fullName: normalizeString(input.fullName),
		companyName: normalizeString(input.companyName),
		email: normalizeString(input.email),
		phone: normalizeString(input.phone),
		serviceInterest:
			normalizeString(input.serviceInterest) || contactServiceInterests[0],
		projectDetails: normalizeString(input.projectDetails),
	};

	const errors = {};

	if (!contact.turnstileToken) {
		errors.turnstileToken = 'Security verification is required.';
	} else if (contact.turnstileToken.length > 2048) {
		errors.turnstileToken = 'Security verification token is invalid.';
	}

	requireString(errors, contact, 'fullName', 'Full name');
	requireString(errors, contact, 'email', 'Email address');
	requireString(errors, contact, 'phone', 'Phone number');

	if (contact.email && !isValidEmail(contact.email)) {
		errors.email = 'Enter a valid email address.';
	}

	if (!contactServiceInterests.includes(contact.serviceInterest)) {
		errors.serviceInterest = 'Choose a valid service interest.';
	}

	for (const [field, maxLength] of Object.entries(contactFieldLimits)) {
		if (contact[field].length > maxLength) {
			errors[field] = `${field} must be ${maxLength} characters or less.`;
		}
	}

	if (Object.keys(errors).length > 0) {
		return {
			error: 'Please correct the highlighted fields.',
			fields: errors,
		};
	}

	return { contact };
}

function formatLeadText(lead) {
	return [
		'Vendor onboarding request',
		'',
		'Company',
		`Legal name: ${lead.companyLegalName}`,
		`Office phone: ${lead.officePhone}`,
		`Website: ${lead.website}`,
		`Known ATC contact/referral: ${lead.atcContact || 'Not provided'}`,
		'',
		'Locations',
		`Physical address: ${lead.physicalStreet}, ${lead.physicalCity}, ${lead.physicalState} ${lead.physicalZip}`,
		lead.billingSameAsPhysical
			? 'Billing address: Same as physical address'
			: `Billing address: ${lead.billingStreet}, ${lead.billingCity}, ${lead.billingState} ${lead.billingZip}`,
		'',
		'Primary contact',
		`Name: ${lead.primaryFirstName} ${lead.primaryLastName}`,
		`Email: ${lead.primaryEmail}`,
		`Phone: ${lead.primaryPhone}`,
		'',
		'Accounting contact',
		lead.accountingSameAsPrimary
			? 'Same as primary contact'
			: `Name: ${lead.accountingFirstName} ${lead.accountingLastName}\nEmail: ${lead.accountingEmail}\nPhone: ${lead.accountingPhone}`,
		'',
		'Safety contact',
		lead.safetySameAsPrimary
			? 'Same as primary contact'
			: `Name: ${lead.safetyFirstName} ${lead.safetyLastName}\nEmail: ${lead.safetyEmail}\nPhone: ${lead.safetyPhone}`,
		'',
		'Capabilities',
		`Main work categories: ${formatList(lead.mainWorkCategories)}`,
		`Services: ${formatList(lead.detailedServices)}`,
		`Authorized states/territories: ${formatList(lead.authorizedStates)}`,
		`Special business status: ${formatList(lead.specialStatuses)}`,
		`Carrier experience: ${formatList(lead.carrierExperience)}`,
		`In-house crews: ${lead.inHouseCrews}`,
		`Subcontractor crews: ${lead.subcontractorCrews}`,
		'',
		'Licensing',
		`State-issued contractor licenses: ${lead.hasContractorLicenses}`,
		`License details: ${lead.licenseDetails || 'Not provided'}`,
		'',
		'Additional notes',
		lead.additionalNotes || 'Not provided',
	].join('\n');
}

function formatLeadHtml(lead) {
	const sections = [
		{
			title: 'Company',
			rows: [
				['Legal name', lead.companyLegalName],
				['Office phone', lead.officePhone],
				['Website', lead.website],
				['Known ATC contact/referral', lead.atcContact || 'Not provided'],
			],
		},
		{
			title: 'Locations',
			rows: [
				[
					'Physical address',
					`${lead.physicalStreet}, ${lead.physicalCity}, ${lead.physicalState} ${lead.physicalZip}`,
				],
				[
					'Billing address',
					lead.billingSameAsPhysical
						? 'Same as physical address'
						: `${lead.billingStreet}, ${lead.billingCity}, ${lead.billingState} ${lead.billingZip}`,
				],
			],
		},
		{
			title: 'Contacts',
			rows: [
				[
					'Primary',
					`${lead.primaryFirstName} ${lead.primaryLastName}<br>${lead.primaryEmail}<br>${lead.primaryPhone}`,
				],
				[
					'Accounting',
					lead.accountingSameAsPrimary
						? 'Same as primary contact'
						: `${lead.accountingFirstName} ${lead.accountingLastName}<br>${lead.accountingEmail}<br>${lead.accountingPhone}`,
				],
				[
					'Safety',
					lead.safetySameAsPrimary
						? 'Same as primary contact'
						: `${lead.safetyFirstName} ${lead.safetyLastName}<br>${lead.safetyEmail}<br>${lead.safetyPhone}`,
				],
			],
		},
		{
			title: 'Capabilities',
			rows: [
				['Main work categories', formatList(lead.mainWorkCategories)],
				['Services', formatList(lead.detailedServices)],
				['Authorized states/territories', formatList(lead.authorizedStates)],
				['Special business status', formatList(lead.specialStatuses)],
				['Carrier experience', formatList(lead.carrierExperience)],
				['In-house crews', lead.inHouseCrews],
				['Subcontractor crews', lead.subcontractorCrews],
			],
		},
		{
			title: 'Licensing & Notes',
			rows: [
				['State-issued contractor licenses', lead.hasContractorLicenses],
				['License details', lead.licenseDetails || 'Not provided'],
				['Additional notes', lead.additionalNotes || 'Not provided'],
			],
		},
	];

	return `
		<h1>Vendor onboarding request</h1>
		${sections
			.map(
				(section) => `
					<h2>${escapeHtml(section.title)}</h2>
					<table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
						${section.rows
							.map(
								([label, value]) => `
									<tr>
										<th align="left" style="border-bottom: 1px solid #ddd; vertical-align: top;">${escapeHtml(label)}</th>
										<td style="border-bottom: 1px solid #ddd;">${escapeHtml(value).replace(/&lt;br&gt;/g, '<br>')}</td>
									</tr>
								`
							)
							.join('')}
					</table>
				`
			)
			.join('')}
		`;
}

function formatContactText(contact) {
	return [
		'Website contact request',
		'',
		`Full name: ${contact.fullName}`,
		`Company: ${contact.companyName || 'Not provided'}`,
		`Email: ${contact.email}`,
		`Phone: ${contact.phone}`,
		`Service interest: ${contact.serviceInterest}`,
		'',
		'Project details',
		contact.projectDetails || 'Not provided',
	].join('\n');
}

function formatContactHtml(contact) {
	const rows = [
		['Full name', contact.fullName],
		['Company', contact.companyName || 'Not provided'],
		['Email', contact.email],
		['Phone', contact.phone],
		['Service interest', contact.serviceInterest],
		['Project details', contact.projectDetails || 'Not provided'],
	];

	return `
		<h1>Website contact request</h1>
		<table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
			${rows
				.map(
					([label, value]) => `
						<tr>
							<th align="left" style="border-bottom: 1px solid #ddd; vertical-align: top;">${escapeHtml(label)}</th>
							<td style="border-bottom: 1px solid #ddd;">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
						</tr>
					`
				)
				.join('')}
		</table>
	`;
}

function getAllowedTurnstileHostnames(env) {
	return normalizeString(env.TURNSTILE_ALLOWED_HOSTNAMES)
		.split(',')
		.map((hostname) => hostname.trim().toLowerCase())
		.filter(Boolean);
}

async function verifyTurnstileToken(token, request, env, expectedAction) {
	if (!env.TURNSTILE_SECRET_KEY) {
		return {
			ok: false,
			status: 500,
			error: 'TURNSTILE_SECRET_KEY is not configured.',
		};
	}

	const remoteip = request.headers.get('CF-Connecting-IP') || undefined;
	const payload = {
		secret: env.TURNSTILE_SECRET_KEY,
		response: token,
		idempotency_key: crypto.randomUUID(),
	};

	if (remoteip) {
		payload.remoteip = remoteip;
	}

	let response;

	try {
		response = await fetch(TURNSTILE_SITEVERIFY_ENDPOINT, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
	} catch {
		return {
			ok: false,
			status: 502,
			error: 'Security verification could not be completed.',
		};
	}

	let body;

	try {
		body = await response.json();
	} catch {
		return {
			ok: false,
			status: 502,
			error: 'Security verification returned an invalid response.',
		};
	}

	if (!response.ok || !body.success) {
		return {
			ok: false,
			status: 400,
			error: 'Security verification failed. Please try again.',
			codes: body['error-codes'],
		};
	}

	if (expectedAction && body.action !== expectedAction) {
		return {
			ok: false,
			status: 400,
			error: 'Security verification did not match this form.',
		};
	}

	const allowedHostnames = getAllowedTurnstileHostnames(env);

	if (
		allowedHostnames.length > 0 &&
		!allowedHostnames.includes(normalizeString(body.hostname).toLowerCase())
	) {
		return {
			ok: false,
			status: 400,
			error: 'Security verification did not match this website.',
		};
	}

	return {
		ok: true,
	};
}

async function sendEmail(request, env) {
	let body;

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Request body must be valid JSON.' }, { status: 400 });
	}

	const validation = validateContactRequest(body);

	if (validation.error) {
		return json(validation, { status: 400 });
	}

	const turnstileVerification = await verifyTurnstileToken(
		validation.contact.turnstileToken,
		request,
		env,
		'contact_form'
	);

	if (!turnstileVerification.ok) {
		return json(
			{
				error: turnstileVerification.error,
				codes: turnstileVerification.codes,
			},
			{ status: turnstileVerification.status }
		);
	}

	if (!env.RESEND_API_KEY) {
		return json({ error: 'RESEND_API_KEY is not configured.' }, { status: 500 });
	}

	if (!env.TO_EMAIL) {
		return json({ error: 'TO_EMAIL is not configured.' }, { status: 500 });
	}

	if (!env.FROM_EMAIL) {
		return json({ error: 'FROM_EMAIL is not configured.' }, { status: 500 });
	}

	const { contact } = validation;
	const emailPayload = {
		from: env.FROM_EMAIL,
		to: env.TO_EMAIL,
		reply_to: contact.email,
		subject: `Website contact request from ${contact.fullName}`,
		text: formatContactText(contact),
		html: formatContactHtml(contact),
	};

	const resendResponse = await fetch(RESEND_EMAILS_ENDPOINT, {
		method: 'POST',
		headers: {
			authorization: `Bearer ${env.RESEND_API_KEY}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify(emailPayload),
	});

	if (!resendResponse.ok) {
		return json(
			{ error: 'We could not send your message. Please try again.' },
			{ status: 502 }
		);
	}

	const responseText = await resendResponse.text();
	let responseBody;

	try {
		responseBody = responseText ? JSON.parse(responseText) : {};
	} catch {
		responseBody = {};
	}

	return json({ ok: true, id: responseBody?.id }, { status: 200 });
}

async function sendPopupLead(request, env) {
	let body;

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Request body must be valid JSON.' }, { status: 400 });
	}

	const validation = validatePopupLead(body);

	if (validation.error) {
		return json(validation, { status: 400 });
	}

	const turnstileVerification = await verifyTurnstileToken(
		validation.lead.turnstileToken,
		request,
		env,
		'vendor_onboarding'
	);

	if (!turnstileVerification.ok) {
		return json(
			{
				error: turnstileVerification.error,
				codes: turnstileVerification.codes,
			},
			{ status: turnstileVerification.status }
		);
	}

	if (!env.RESEND_API_KEY) {
		return json({ error: 'RESEND_API_KEY is not configured.' }, { status: 500 });
	}

	if (!env.TO_EMAIL) {
		return json({ error: 'TO_EMAIL is not configured.' }, { status: 500 });
	}

	if (!env.FROM_EMAIL) {
		return json({ error: 'FROM_EMAIL is not configured.' }, { status: 500 });
	}

	const { lead } = validation;
	const emailPayload = {
		from: env.FROM_EMAIL,
		to: env.TO_EMAIL,
		reply_to: lead.primaryEmail,
		subject: `Vendor onboarding request from ${lead.companyLegalName}`,
		text: formatLeadText(lead),
		html: formatLeadHtml(lead),
	};

	const resendResponse = await fetch(RESEND_EMAILS_ENDPOINT, {
		method: 'POST',
		headers: {
			authorization: `Bearer ${env.RESEND_API_KEY}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify(emailPayload),
	});

	if (!resendResponse.ok) {
		return json(
			{ error: 'We could not send your onboarding request. Please try again.' },
			{ status: 502 }
		);
	}

	const responseText = await resendResponse.text();
	let responseBody;

	try {
		responseBody = responseText ? JSON.parse(responseText) : {};
	} catch {
		responseBody = {};
	}

	return json({ ok: true, id: responseBody?.id }, { status: 200 });
}

function getTurnstileConfig(env) {
	if (!env.TURNSTILE_SITE_KEY) {
		return json(
			{ error: 'TURNSTILE_SITE_KEY is not configured.' },
			{ status: 500 }
		);
	}

	return json({ siteKey: env.TURNSTILE_SITE_KEY });
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (!url.pathname.startsWith('/api/')) {
			return json({ error: 'Not found.' }, { status: 404 });
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					allow: 'GET, POST, OPTIONS',
				},
			});
		}

		if (url.pathname === '/api/turnstile-config' && request.method === 'GET') {
			return getTurnstileConfig(env);
		}

		if (url.pathname === '/api/send-email' && request.method === 'POST') {
			return sendEmail(request, env);
		}

		if (url.pathname === '/api/popup-lead' && request.method === 'POST') {
			return sendPopupLead(request, env);
		}

		return json({ error: 'Not found.' }, { status: 404 });
	},
};
