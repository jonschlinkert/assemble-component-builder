import SupportApi from './support-api'
import Helpers    from '../../../commun/apps.helpers'

let SupportArticleList = (function() {
	let helpers = new Helpers();

	/**
	 * works out which endpoint should be used to fetch the support data. by default he most
	 * popular articles will be shown. the search portion of the url is inspected to decide
	 * if there is a more apporpriate endpoint to use alternatively.
	 *
	 * @return {String} the endpoint to fetch data from
	 */
	function _findEndpoint() {
		let basePath = apAEM.config.supportEndpoint + 'help2/faq/';
		let endpoint = basePath + 'popular/';
		let searchData = helpers.urlSearch();

		// if there is a search parameter in the url, inspect it.
		if( searchData ) {
			if(searchData.a) {
				// specific article
				endpoint = basePath + 'search_for_article/' + searchData.a;
			} else if(searchData.c) {
				// specific category
				endpoint = basePath + 'context/' + searchData.c;
			} else if(searchData.s) {
				// keyword search
				endpoint = basePath + 'search_for/' + searchData.s;
			}
		}

		return endpoint;
	}

	/**
	 * create a class to manage the loading of support article content on pageload.
	 *
	 * @param {String} template The filename of the template to interpolate
	 */
	class SupportArticleList {
		constructor() {
		}

		/**
		 * works out what the endpoint to use should be, then fires of the request for data
		 */
		fetch() {
			let endpoint = _findEndpoint();
			let getSupportArticles = new SupportApi(endpoint);
			getSupportArticles.getData();
		};
	}

	return SupportArticleList;
}());

export default SupportArticleList;
