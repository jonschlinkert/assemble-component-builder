let Helpers = (function() {
	class Helpers {

		constructor() {
		}

		/**
		 * inspects the search portion of the url and provides the keys in a simple object, or
		 * it will return false if the search portion doesn't contain anything.
		 *
		 * @return {Object} contains key/value pairs for each set in window.location.search
		 */
		urlSearch() {
			if( window.location.search.length ) {
				// break the search into an array to make it easy to dig through
				let search = window.location.search.slice(1),
				    searchArr = search.split('&'),
				    searchData = {};

				for (let i = 0; i < searchArr.length; i++) {
					let values = searchArr[i].split('=');
					searchData[values[0]] = values[1];
				}

				return searchData;
			}

			// if there is nothing in the search portion of the url, return false.
			return false;
		}
	}

	return Helpers;
})();

export default Helpers;
