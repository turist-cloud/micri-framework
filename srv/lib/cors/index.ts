import { ServerResponse } from 'micri';

/**
 * Send CORS headers.
 * @param res is the server response object.
 * @param methods is an array of allowed methods.
 * @param headers is an array of allowed headers.
 */
export default function sendCors(res: ServerResponse, methods: string[], headers: string[] = []) {
	res.writeHead(204, {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': [...methods, 'OPTIONS'].join(', '),
		'Access-Control-Allow-Headers': headers.join(', '),
		'Vary': 'Accept-Encoding, Origin',
		'Access-Control-Max-Age': '3600'
	});
	res.end();
}
