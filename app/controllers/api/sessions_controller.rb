class Api::SessionsController < Devise::SessionsController
	clear_respond_to
  respond_to :json
  def create  	
  	super
  	render json: current_user
  end

  def destroy
  	sign_out current_user
  	render json: {}
  end
end