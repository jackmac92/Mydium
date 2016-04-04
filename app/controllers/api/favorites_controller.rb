class Api::FavoritesController < ApplicationController
	def update
		current_user.toggle_like! Article.find(params[:article_id])
	end

end
