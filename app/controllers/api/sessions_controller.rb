class Api::SessionsController < Devise::SessionsController
  def create
    resource = User.find_for_database_authentication(email: params[:user][:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in :user, resource
      return render json: current_user
    end

    invalid_login_attempt
  end

  def destroy
  	sign_out current_user
  	render json: {}
  end


  protected

  def invalid_login_attempt
    set_flash_message(:alert, :invalid)
    render json: flash[:alert], status: 401
  end

  
end