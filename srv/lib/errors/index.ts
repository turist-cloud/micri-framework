import { STATUS_CODES } from 'http';
import { send, IncomingMessage, ServerResponse } from 'micri';
import { ErrorObject } from 'ajv';
import { parseAll } from '@hapi/accept';

export interface MyError {
	code: string;
	message: string;
	[x: string]: any;
};

export function sendError(req: IncomingMessage, res: ServerResponse, statusCode: number, error: MyError) {
	let types = ['*/*'];

	if (!error.code) {
		throw new Error('Error "code" is missing');
	}

	if (!error.message) {
		throw new Error('Error "message" is missing');
	}

	try {
		const parsed = parseAll(req.headers);
		types = parsed.mediaTypes;
	} catch (err) {
		console.error(err);
	}

	if (types.includes('text/html')) {
		return send(res, statusCode, `
<html>
<h2>${STATUS_CODES[statusCode] || 'Internal Server Error'}</h2>
<p>${error.message}</p>
`);
	} else if (types.includes('*/*')) {
		return send(res, statusCode, {
			error
		});
	} else if (types.includes('text/plain')) {
		return send(res, statusCode, error.message)
	} else {
		return send(res, statusCode, {
			error
		});
	}
}

export function sendBadRequest(req: IncomingMessage, res: ServerResponse) {
	sendError(req, res, 400, {
		code: 'bad_request',
		message: 'Invalid request method or path'
	});
}
