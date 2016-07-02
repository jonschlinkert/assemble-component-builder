import SupportApi from './support-api'

let ExpandableFaqs = (function() {

	/**
	 * allows us to determine if an article is open or closed.
	 * @param  {Object} $trigger current the jQuery selector of the article header.
	 */
	function _checkState($trigger) {
		let expanded = $trigger.attr('aria-expanded');
		if (expanded === 'true') {
			_setState($trigger, true);
		} else {
			_setState($trigger, false);
		}
	};

	/**
	 * does the actual opening and closing of the support article.
	 *
	 * @param {Object} $trigger 		current the jQuery selector of the article header.
	 * @param {Boolean} expanded 		set the article to open or closed.
	 */
	function _setState(trigger, expanded) {
		let parentBlock  = trigger.closest('.expandable-block--support');
		let contentBlock = parentBlock.find('.expandable-block-content--support');

		if (expanded === true) {
			var closingHeight = contentBlock.height();

			trigger.attr('aria-expanded', 'false')
			       .attr('data-category', 'accordion navigation closed');

			contentBlock.height(closingHeight)
			            .addClass('is-animated-height')
			            .height(0);

			parentBlock.removeClass('is-open');

			setTimeout(function(){
				contentBlock.removeClass('is-animated-height')
							.addClass('is-hidden');
			}, 300);
		} else if (typeof contentBlock[0] !== 'undefined') {
			trigger.attr('aria-expanded', 'true')
			       .attr('data-category', 'accordion navigation open');

			contentBlock.addClass('is-animated-height')
			            .removeClass('is-hidden')
			            .height(contentBlock[0].scrollHeight);

			parentBlock.addClass('is-open');

			setTimeout(function() {
				contentBlock.removeClass('is-animated-height')
							.height('');
			}, 300);
		}

		if(expanded === false) {
			_sendRead(trigger);
		}
	};

	/**
	 * sends a request to the api to track that the article has been opened or closed.
	 *
	 * @param  {Object} current the jQuery selector of the article header.
	 */
	function _sendRead(current) {
		let articleNumber = current.closest('.expandable-block--support').data('articlenumber'),
		    data = JSON.stringify(articleNumber),
		    endpoint = apAEM.config.supportEndpoint + 'help2/faq/read/',
		    getSupportArticles = new SupportApi(endpoint, 'POST', data);

		getSupportArticles.getData();
	};

	/**
	 * creates a class to manage the opening and closing of supporting articles as an accorian
	 *
	 * @param  {String}  container       the class on the wrapping element.
	 * @param  {String}  headerBlock     the class on the header element.
	 */
	class ExpandableFaqs {
		constructor() {
			this.container = '.support-faq-results';
			this.headerBlock = '.expandable-block--support-header';
		}

		/**
		 * sets up the binding on the header of the article component.
		 */
		bindFaqs() {
			$(this.container).on('click', this.headerBlock, function(event) {
				event.preventDefault();
				let $trigger = $(event.target);
				_checkState($trigger);
			});
		}
	}

	return ExpandableFaqs;
})();

export default ExpandableFaqs;
