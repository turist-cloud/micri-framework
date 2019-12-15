import { IncomingMessage, ServerResponse } from 'micri';
import { sendError } from '../../lib/errors';
import Opts from './types';

export default async function getHandler(req: IncomingMessage, res: ServerResponse, opts: Opts) {
	if (!opts?.route?.id) {
		return sendError(req, res, 404, {
			code: 'not_found',
			message: 'Things not found'
		});
	}

	res.setHeader('ETag', 'abc');
	return {
		id: opts.route.id
	};
}
