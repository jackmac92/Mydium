Rails.application.routes.draw do
  root to: "static_pages#root"
	devise_for :users, controllers: {sessions: 'api/sessions', registrations: 'api/registrations', omniauth_callbacks: 'omniauth_callbacks'}

  namespace :api, defaults:{format: :json} do
    resources :articles, only:[:index, :create, :update, :show, :destroy]
    resource :auth, only:[:show]
    resources :users, only:[:show]
    resources :comments, only:[:create, :destroy]
    resources :tags, only:[:index]
  end
end
