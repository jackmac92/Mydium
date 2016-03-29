class Api::ArticlesController < ApplicationController

  def index
    @articles = Article.all
  end
  def show
    @article = Article.find(params[:id])
  end

  def create
    @article = Article.new(article_params)
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
