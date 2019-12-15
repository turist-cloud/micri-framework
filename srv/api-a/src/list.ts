import { IncomingMessage, ServerResponse, send } from 'micri';
import { RateLimit } from 'async-sema';
import LRU from 'lru-cache';
import ms from 'ms';
import { sendError } from '../../lib/errors';
import createPromiseCache from '../../lib/promise-cache';
import Opts from './types';

const rl = RateLimit(10);

async function buildResponse(_userId: string) {
	const keys = Array.from(Array(100).keys());

	return Promise.all(keys.map(async (key) => {
		await rl();

		return await new Promise((resolve) => {
			// Something slow and expensive here
			setTimeout(() => resolve(`${key}`), ms('10ms'));
		});
	}));
}

const cache = new LRU({
	max: 5,
	maxAge: ms('2m')
});
const buildResponseCached = createPromiseCache(cache, buildResponse);

export default function getHandler(req: IncomingMessage, res: ServerResponse, opts: Opts) {
	// Normally this would come from opts
	const userId = '123';

	console.log(cache);

	buildResponseCached(userId)
		.then((things: string[]) => send(res, 200, { things }))
		.catch((err: Error) => {
			return sendError(req, res, 500, {
				code: 'internal_server_error',
				message: 'Failed to list the deployments'
			});
		});
}
