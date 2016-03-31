Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults:{format: :json} do
		devise_for :users, controllers: {sessions: 'api/sessions', registrations: 'api/registrations'}
    resources :articles, only:[:index, :create, :update, :show, :destroy]
    resource :auth, only:[:show]
  end
end
