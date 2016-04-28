class Api::ArticleReadsController < ApplicationController
	def create
		current_user.article_reads.create(article_id: params[:id])
		bookmark = current_user.bookmarks.find_by(article_id: params[:id])
		bookmark.destroy if bookmark
		render json: {}
	end
end
