class Api::AuthsController < ApplicationController 
  def show
    if user_signed_in?
      render json: current_user
    else
      render json: {message: "Not logged in"}, status: 401
    end
  end

end