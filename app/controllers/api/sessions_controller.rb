class SessionsController < Devise::SessionsController

  # See https://github.com/gonzalo-bulnes/simple_token_authentication/issues/27

  def create
    # Fetch params
    email = params[:session][:email] if params[:session]
    password = params[:session][:password] if params[:session]

    id = User.find_by(email: email).try(:id) if email.presence

    # Authentication
    user = User.find_by(email: email)

    if user
      if user.valid_password? password
        user.reset_authentication_token!
        # Note that the data which should be returned depends heavily of the API client needs.
        render status: 200, json: { email: user.email, authentication_token: user.authentication_token, id: id }
      else
        render status: 401, json: { message: 'Invalid email or password.' }
      end
    else
      render status: 401, json: { message: 'Invalid email or password.' }
    end
  end

  def destroy
    # Fetch params
    user = User.find_by(authentication_token: params[:user_token])

    if user.nil?
      render status: 404, json: { message: 'Invalid token.' }
    else
      user.authentication_token = nil
      user.save!
      render status: 204, json: nil
    end
  end

end