class Api::FavoritesController < ApplicationController
	include PublicActivity::StoreController
	def update
		current_user.toggle_like! Article.find(params[:article_id])
	end

end
