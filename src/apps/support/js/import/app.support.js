import ArticleFeedback    from './article-feedback'
import ExpandableFaqs     from './expandable-faq'
import SupportArticleList from './support-article-list'
import SupportSearch      from './support-search'

function supportInit() {
	let $wrapper = $('.support-faq-results');

	if( $wrapper.length ) {
		let articleFeedback = new ArticleFeedback
		articleFeedback.init()

		let supportArticles = new SupportArticleList
		supportArticles.fetch()

		let supportSearch = new SupportSearch
		supportSearch.bindSearch()

		let expandableFaqs = new ExpandableFaqs
		expandableFaqs.bindFaqs()
	}
}

export default supportInit
