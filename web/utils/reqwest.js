import reqwest from 'reqwest-without-xhr2';
import {APP_REQUEST_DEBUG,APP_DEBUG_HOST,APP_BASE_HOST} from 'config';

export default function (options) {

	if (APP_REQUEST_DEBUG && options.debug === true) {
		
		options.url = APP_DEBUG_HOST + options.url;
		
	} else
		options.url = APP_BASE_HOST + options.url;

	return reqwest(options);
}
