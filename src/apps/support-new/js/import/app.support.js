import SupportArticleList from './support-article-list'

function supportInit() {
	let $wrapper = $('.support-faq-results');

	if( $wrapper.length ) {
		let supportArticles = new SupportArticleList
		supportArticles.fetch()
	}
}

export default supportInit
