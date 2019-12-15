import { UrlWithParsedQuery } from 'url';

export default interface Opts {
	url: UrlWithParsedQuery;
	route: null | {
		id?: string;
	};
}
