import SupportApi from './support-api'

let SupportSearch = (function() {

	let getSupportArticles;

	/**
	 * makes the ajax call to fetch the articles from the webservice
	 */
	function _fetch(endpoint, updateUi) {
		getSupportArticles = new SupportApi(endpoint, updateUi);
		getSupportArticles.getData();
	};

	/**
	 * creates a class to manage ajax calls to the support articles api.
	 *
	 * @param {String} searchTerm The term to search for
	 */
	class SupportSearch {
		constructor(searchTerm) {
			searchTerm = searchTerm || '';
			this.endpoint = apAEM.config.supportEndpoint + 'help2/faq/search/' + searchTerm + '/200';
		}

		/**
		 * sets up the event binding on the form to tie into the fetching functionality of the
		 * class
		 */
		bindSearch() {
			$('.support-search-form').on('submit', function(e) {
				e.preventDefault();
				let searchTerm = $(this).find('.ssf-input').val().replace(/ /g,'%20');
				this.endpoint = apAEM.config.supportEndpoint + 'help2/faq/search/' + searchTerm + '/200';
				_fetch(this.endpoint);
			});
		}
	}

	return SupportSearch;
}());

export default SupportSearch
