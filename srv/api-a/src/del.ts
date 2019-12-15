import { IncomingMessage, ServerResponse, send } from 'micri';
import { sendError } from '../../lib/errors';
import Opts from './types';

export default async function delHandler(req: IncomingMessage, res: ServerResponse, opts: Opts) {
	return sendError(req, res, 500, {
		code: 'internal_server_error',
		message: 'Failed to delete the thing'
	});
}
