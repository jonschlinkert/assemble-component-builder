import Handlebars from 'handlebars/runtime';
import templates  from '../../handlebars/templates';

const SupportApi = (function() {
	let $spinner = $('.spinner-container');
	let $container = $('.support-faq-results');
	let activeClass = 'is-active';
	let articleWrapperClass = '.support-faq-articles';
	let summaryClass = '.support-faq-summary';
	let pagerClass = '.support-faq-next';

	let pageLimit = 10;
	let paginationThreshold = 15;

	/**
	 * @var {Array} this acts as a cache to store the latest set of support articles fetched from the api.
	 */
	let resultData;

	/**
	 * turn the $spinner on.
	 */
	function _beforeSending(updateUi) {
		if(updateUi) {
			$spinner.addClass(activeClass);
		}
	};

	/**
	 * update the ui with the html built from the data returned by the service.
	 *
	 * @param  {Object}  data      The raw data returned by the webservice call
	 * @param  {Boolean} updateUi  Tells us if a UI update should occur after the call.
	 */
	function _updateResults(data, updateUi) {
		// kill the loading $spinner.
		$spinner.removeClass(activeClass);

		if(data.faq) {
			// this total gets reused in _loadNextPage
			data.faq.total = data.faq.results.length;

			// there is a business rule where we show all results at load if there are 15 or less,
			//   or else paginate 10 at a time.
			if( data.faq.results.length > paginationThreshold ) {
				data.faq.next = pageLimit;
				data.faq.numRemaining = data.faq.results.length - pageLimit;
				data.faq.results = data.faq.results.slice(0, pageLimit);
			}

			// extra information for the summary.
			data.faq.currentlyVisible = data.faq.results.length;

			if(updateUi) {
				// set up the support content wrapper.
				let htmlContent = templates.supportWrapper(data);
				$container.html(htmlContent);

				// insert the articles, pager button and summary.
				_insertArticles(data);
			}
		}
	};

	/**
	 * update the ui in the case that the ajax call fails.
	 */
	function _errorMessage() {
		// kill the loading spinner.
		$spinner.removeClass(activeClass);

		// compile and insert the html content.
		let htmlContent = templates.supportError();
		$container.html(htmlContent);
	};

	/**
	 * manages loading more results from the cache and getting them rendered
	 *
	 * @param  {Number} firstResultIndex the index of the next result
	 */
	function _loadNextPage(firstResultIndex) {
		let nextResultIndex = firstResultIndex + pageLimit;
		let thisResultSet = resultData.slice(firstResultIndex, nextResultIndex);
		let numRemainingResults = resultData.slice(nextResultIndex).length;
		let currentlyVisible = resultData.slice(0, nextResultIndex).length;

		// setup the object to render.
		let data = {
			faq: {
				total: resultData.length,
				next: (numRemainingResults) ? nextResultIndex : false,
				numRemaining: numRemainingResults,
				results: thisResultSet,
				currentlyVisible: currentlyVisible
			}
		};

		_insertArticles(data);
	}

	/**
	 * handles the actual updating of the ui, adding new results and refreshing
	 *   the "load more" button
	 *
	 * @param  {Object}  data 		the dataset to be rendered.
	 */
	function _insertArticles(data) {
		// remove and insert updated summary information.
		$(summaryClass).remove();
		let htmlSummary = templates.supportSummary(data);
		$(articleWrapperClass).prepend(htmlSummary);

		// compile and insert the html content.
		let htmlResults = templates.supportArticle(data);
		$(articleWrapperClass).append(htmlResults);

		// attempt to create a new pagination button.
		let htmlPager = templates.supportPager(data);
		$(articleWrapperClass).append(htmlPager);

		// bind the pagination even again.
		$(pagerClass).on('click', _paginationEvent);
	}

	/**
	 * this function is fired when the "load more" button is pressed. it unbinds itself then
	 * requests for the next set of articles to be inserted into the DOM.
	 */
	function _paginationEvent() {
		// prevent the event firing again and remove the button.
		$(this).off('click', _paginationEvent)
		       .remove();

		// request more results from the cache.
		let nextResult = $(this).data('next');
		_loadNextPage(nextResult);
		return false;
	}

	/**
	 * creates a class to manage ajax calls to the support articles api and the rendering
	 *   of support content.
	 *
	 * @memberOf ExpandableFaqs
	 * @memberOf SupportArticleList
	 * @memberOf SupportSearch
	 *
	 * @param {String}  endpoint     The url which a call will be made to
	 * @param {String}  type         Is this a GET or POST request? Defaults to GET
	 * @param {Object}  postData     The data to send to the server if we're making a POST request
	 */
	class SupportApi {
		constructor(endpoint, type = 'GET', postData = {}) {
			this.endpoint = endpoint;
			this.type = type;
			this.postData = postData;
		}

		/**
		 * make the ajax call to the webservice.
		 */
		getData() {
			let updateUi = this.type === 'GET';
			let requestObject = {
				url: this.endpoint,
				type: this.type,
				beforeSend: () => {
					_beforeSending(updateUi)
				},
				success: data => {
					if(data.faq)
						resultData = data.faq.results;

					_updateResults(data, updateUi);
				},
				error: _errorMessage
			};

			// if it's going to be a POST and there is data to send then add it to the request!
			if(this.type === 'POST' && Object.keys(this.postData).length) {
				requestObject.data = this.postData;
			}

			// fire off the ajax call.
			$.ajax(requestObject);
		}
	}

	return SupportApi;
}());

export default SupportApi
