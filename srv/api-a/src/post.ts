import { IncomingMessage, ServerResponse, send } from 'micri';
import { sendError } from '../../lib/errors';
import Opts from './types';

export default async function postHandler(req: IncomingMessage, res: ServerResponse, opts: Opts) {
	if (!opts?.route?.id) {
		return sendError(req, res, 404, {
			code: 'not_found',
			message: 'Things not found'
		});
	}

	send(res, 201, {
		id: opts.route.id
	});
}
