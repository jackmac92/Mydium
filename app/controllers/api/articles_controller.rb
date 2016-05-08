class Api::ArticlesController < ApplicationController
  include PublicActivity::StoreController
  def index
    
    case params[:article_type]
    when "popular"
      @articles = Article.includes(:tags, :comments, :user).popular.page(params[:page]).per(5)
    when "user_bookmarks"
      @articles = current_user.bookmarked_articles.includes(:tags, :comments, :user).page(params[:page]).per(5)
    when "tag"
      @articles = Article.includes(:tags, :comments, :user).all_with_tag(params[:tag]).page(params[:page]).per(5)
    else
      @articles = Article.includes(:tags, :comments, :user).viewable.page(params[:page]).per(3)
    end
  end
  
  def show
    @article = Article.includes(:tags, :user, comments: :user).find(params[:id])
    unless @article.published
      unless current_user.id == @article.user.id
        render json: "Cannot view others unpublished articles", status: 401
      end
    end
  end

  def create
    @article = current_user.articles.new(article_params)
    if @article.valid?
      @article.save!
      unless params[:idSet] == "true"
        render :show
      else
        render json: {id:@article.id}
      end
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def update
    @article = Article.find(params[:id])
    if @article.update(article_params)
      @article.publish! if @article.published
      render :show
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def set_picture
    @article = Article.find(params[:id])
    if @article.update(picture: params[:picture])
      render "api/articles/picture"
    else
      render json: "Error setting picture"
    end
  end

  def autosave
    @article = Article.find(params[:id])
    params[:article][:tag_ids].map!(&:to_i) if params[:article][:tag_ids]
    if @article.update(article_params)
      render json: {}
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def autosave_id
    @article = current_user.articles.create(article_params)
    render json: @article.id
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
    @articles = current_user.articles.where published: false
    render 'api/articles/drafts'
  end

  private
  def article_params
    params.require(:article).permit(:title, :subtitle, :picture, :body_plain_text, :body_stylized, :published, tag_ids: [])
  end
end
