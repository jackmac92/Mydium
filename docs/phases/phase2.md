# Phase 2: Flux Architecture and Article CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* ArticlesIndex
  - ArticlesIndexItem
* ArticleForm

### Stores
* Article

### Actions
* ApiActions.receiveAllArticles -> triggered by ApiUtil
* ApiActions.receiveSingleArticle
* ApiActions.deleteArticle
* ArticleActions.fetchAllArticles -> triggers ApiUtil
* ArticleActions.fetchSingleArticle 
* ArticleActions.createArticle
* ArticleActions.editArticle 
* ArticleActions.publishArticle 
* ArticleActions.destroyArticle

### ApiUtil
* ApiUtil.fetchAllArticles
* ApiUtil.fetchSingleArticle
* ApiUtil.createArticle
* ApiUtil.editArticle
* ApiUtil.destroyArticle

## Gems/Libraries
* Flux Dispatcher (npm)
* Twitter Bootstrap
