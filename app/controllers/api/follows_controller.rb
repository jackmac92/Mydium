class Api::FollowsController < ApplicationController

  include PublicActivity::StoreController
  before_action :get_receiver

	def create
		current_user.follow! @recipient
		render json: true
	end

	def destroy
		current_user.unfollow! @recipient
		render json: false
	end

	private
	def get_receiver
		@recipient = params[:r_type].constantize.find(params[:id])
	end

end
