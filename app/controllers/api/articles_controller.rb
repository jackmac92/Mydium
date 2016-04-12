class Api::ArticlesController < ApplicationController
  include PublicActivity::StoreController
  def index
    case params[:article_type]
    when "popular"
      @articles = Article.popular.page(params[:page]).per(5)
    when "user_bookmarks"
      @articles = current_user.bookmarked_articles.page(params[:page]).per(5)
    when "tag"
      @articles = Article.all_with_tag params[:tag].page(params[:page]).per(5)
    else
      @articles = Article.order(published_at: :desc).page(params[:page]).per(5)
    end
  end
  
  def show
    @article = Article.find(params[:id])
  end

  def create
    @article = current_user.articles.new(article_params)
    if @article.valid?
      @article.save!
      render :show
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      render :show
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def publish
    @article = Article.find(params[:id])
    @article.publish!
    render json: {}
  end

  def unpublish
    @article = Article.find(params[:id])
    @article.unpublish!
    render json: {}
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    render :show
  end

  private
  def article_params
    params.require(:article).permit(:title, :subtitle, :picture, :body_plain_text,:body_stylized, :published)
  end
end
