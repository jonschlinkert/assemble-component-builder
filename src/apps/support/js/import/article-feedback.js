let ArticleFeedback = (function() {

	function _beforeSending($current) {
		$current.closest('.article-feedback').find('.af-questions').addClass('is-hidden');
		$current.closest('.article-feedback').find('.af-loading-container').addClass('is-active');
	};

	function _successState($current) {
		$current.closest('.article-feedback').find('.af-loading-container').removeClass('is-active');
		$current.closest('.article-feedback').find('.af-success-text').addClass('is-active');
	};

	function _errorState($current) {
		$current.closest('.article-feedback').find('.af-loading-container').removeClass('is-active');
		$current.closest('.article-feedback').find('.af-error-text').addClass('is-active');
	};

	/**
	 * sends the feedback data to the api
	 *
	 * @param  {Object} $current the button used to vote
	 * @param  {Object} data    the feedback data to send
	 */
	function _sendVote($current, data) {
		$.ajax({
			url: apAEM.config.supportEndpoint + 'help2/faq/vote/',
			type: 'POST',
			data: data,
			beforeSend: function() {
				_beforeSending($current);
			},
			success: function() {
				_successState($current);
			},
			error: function() {
				_errorState($current);
			}
		});
	};

	/**
	 * creates the object of data required to POST to the api
	 *
	 * @param  {Object} 	$current jQuery selector of the
	 * @param  {Boolean} 	vote    if the feedback is positive or negative
	 */
	function _buildBaseData($current, vote) {
		var articleID       = $current.closest('.expandable-block').attr('id'),
		    articleNumber   = $current.closest('.expandable-block').data('articleNumber'),
		    articleQuestion = $current.closest('.expandable-block').find('.expandable-block-trigger').text(),
		    feedbaceComment = $current.find('.af-form-textarea').val(),
		    sessionId       = cookie.get('helpUUID'),

		data = {
			articleNumber: articleID,
			comment:       feedbaceComment || '',
			id:            articleID,
			question:      articleQuestion,
			sessionId:     sessionId,
			thumbsUp:      vote
		};

		data = JSON.stringify(data);

		_sendVote($current, data);
		_reset($current);
	};


	function _reset($current) {
		$current.closest('.article-feedback')
						.removeClass('is-active')
						.find('.af-form-negative')
						.removeClass('is-active');
		$current.closest('.article-feedback')
						.find('.af-negative')
						.removeClass('is-active');
	}; 



	/**
	 * creates a class to manage submitting votes on articles
	 *
	 * @param {String} bindingClass the class on the wrapping element.
	 */
	class ArticleFeedback {
		constructor() {
			this.bindingClass = '.support-faq-results';
		}

		/**
		 * sets up the event bindings required to mange this functionality work.
		 */
		init() {
			$(this.bindingClass).on('click','.af-positive', function() {
				var $this = $(this);
				_buildBaseData($this, true);
			});

			// set up various event bindings.
			$(this.bindingClass).on('click','.af-negative', function() {
				var $this = $(this);

				// show form.
				$this.closest('.article-feedback')
							.addClass('is-active')
							.find('.af-form-negative')
							.addClass('is-active');

				$this
			});

			$(this.bindingClass).on('submit', 'form', function(e) {
				e.preventDefault();

				var $this = $(this),
				    textArea = $this.find('.af-form-textarea');

				if (textArea.val()) {
					_buildBaseData($this, false);
				} else {
					textArea.closest('.form-group')
							.addClass('has-error')
							.find('.af-form-error')
							.addClass('is-active');
				}

			});

			$(this.bindingClass).on('click', '.af-form-cancel', function(e) {

				e.preventDefault();
				e.stopPropagation();

				_reset($(this));
			});

		}
	}

	return ArticleFeedback;
})();

export default ArticleFeedback;
