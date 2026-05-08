const RESEND_EMAILS_ENDPOINT = 'https://api.resend.com/emails';

const jsonHeaders = {
	'content-type': 'application/json; charset=UTF-8',
};

const allowedEmailFields = [
	'from',
	'to',
	'cc',
	'bcc',
	'reply_to',
	'subject',
	'html',
	'text',
	'headers',
	'attachments',
	'tags',
	'scheduled_at',
];

function json(data, init = {}) {
	return Response.json(data, {
		...init,
		headers: {
			...jsonHeaders,
			...init.headers,
		},
	});
}

function isSendEmailRequest(value) {
	return (
		value &&
		typeof value === 'object' &&
		typeof value.from === 'string' &&
		(typeof value.to === 'string' || Array.isArray(value.to)) &&
		typeof value.subject === 'string' &&
		(typeof value.html === 'string' || typeof value.text === 'string')
	);
}

function pickEmailPayload(input) {
	return Object.fromEntries(
		allowedEmailFields
			.filter((field) => input[field] !== undefined)
			.map((field) => [field, input[field]])
	);
}

async function sendEmail(request, env) {
	if (!env.RESEND_API_KEY) {
		return json({ error: 'RESEND_API_KEY is not configured.' }, { status: 500 });
	}

	let body;

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Request body must be valid JSON.' }, { status: 400 });
	}

	if (!isSendEmailRequest(body)) {
		return json(
			{
				error:
					'Expected a Resend email payload with from, to, subject, and html or text.',
			},
			{ status: 400 }
		);
	}

	const resendResponse = await fetch(RESEND_EMAILS_ENDPOINT, {
		method: 'POST',
		headers: {
			authorization: `Bearer ${env.RESEND_API_KEY}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify(pickEmailPayload(body)),
	});

	const responseText = await resendResponse.text();
	let responseBody;

	try {
		responseBody = responseText ? JSON.parse(responseText) : null;
	} catch {
		responseBody = { message: responseText };
	}

	return json(responseBody, { status: resendResponse.status });
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
					allow: 'POST, OPTIONS',
				},
			});
		}

		if (url.pathname === '/api/send-email' && request.method === 'POST') {
			return sendEmail(request, env);
		}

		return json({ error: 'Not found.' }, { status: 404 });
	},
};
