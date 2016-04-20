class Api::LikesController < ApplicationController
  
  include PublicActivity::StoreController
  before_action :get_receiver
	
	def create
		current_user.like! @recipient
		@article = @recipient
		@is_mini = true
		render "api/articles/show"
	end

	def destroy
		current_user.unlike! @recipient
		@article = @recipient
		@is_mini = true
		render "api/articles/show"
	end

	private
	def get_receiver
		@recipient = params[:r_type].constantize.find(params[:id])
	end

end