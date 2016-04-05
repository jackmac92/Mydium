class Api::ArticlesController < ApplicationController

  def index
    case params[:article_type]
    when "popular"
      @articles = Article.all.shuffle.sample 7
    when "user_bookmarks"
      @articles = current_user.bookmarked_articles
    when "tag"
      @articles = Article.all_with_tag params[:tag]
    else
      @articles = Article.all.order(created_at: :desc)
    end
    @articles
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
    
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    render :show
  end

  private
  def article_params
    params.require(:article).permit(:title,:body,:published)
  end
end
