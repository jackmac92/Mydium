Rails.application.routes.draw do
  root to: "static_pages#root"
	devise_for :users, controllers: {sessions: 'api/sessions', registrations: 'api/registrations'}

  namespace :api, defaults:{format: :json} do
    resources :articles, only:[:index, :create, :update, :show, :destroy]
    resource :auth, only:[:show,:create,:destroy]
  end
end
