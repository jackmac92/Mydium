class Api::BookmarksController < ApplicationController

  include PublicActivity::StoreController

	def create
		current_user.bookmarks.create(article_id: params[:article_id])
		@is_mini = true
		@article = Article.find(params[:article_id])
		render "api/articles/show"
	end

	def destroy
		current_user.bookmarks.find_by(article_id: params[:article_id]).destroy
		@is_mini = true
		@article = Article.find(params[:article_id])
		render "api/articles/show"
	end

end
