import { parse } from 'url';
import micri, {
	MicriHandler,
	ServerResponse,
	Router
} from 'micri';
import myWay from 'my-way';
import { sendBadRequest } from '../../lib/errors';
import sendCors from '../../lib/cors';
import Opts from './types';
import get from './get';
import del from './del';
import list from './list';
import post from './post';

const { router, on, otherwise } = Router;

const parsePath = (hndl: MicriHandler): MicriHandler =>
	(req, res, opts) => {
		const url = parse(req.url || '/', true);
		const route = myWay('/api/v1/things/:id?', url.pathname || '');

		return hndl(req, res, {
			...(opts || {}),
			url,
			route
		});
	};

const server = micri(parsePath(router(
	on.get((_req: any, _res: any, opts: Opts) => opts?.route?.id, get),
	on.delete((_req: any, _res: any, opts: Opts) => opts.route?.id, del),
	on.get(() => true, list),
	on.post(() => true, post),
	on.options(() => true,
		(_req: any, res: ServerResponse) => sendCors(res, ['GET', 'POST', 'DELETE'])),
	otherwise((req, res) => sendBadRequest(req, res))
)));

// @ts-ignore
server.listen(3000);
