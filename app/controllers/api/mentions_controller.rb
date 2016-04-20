class Api::MentionsController < ApplicationController
  include PublicActivity::StoreController
  before_action :get_receiver
	def create
		current_user.mention! @recipient
	end
	def destroy
		current_user.unmention! @recipient
	end
	private
	def get_receiver
		@recipient = params[:r_type].constantize.find(params[:id])
	end
end
