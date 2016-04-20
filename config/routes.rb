Rails.application.routes.draw do
  root to: "static_pages#root"
	devise_for :users, controllers: {sessions: 'api/sessions', registrations: 'api/registrations', omniauth_callbacks: 'omniauth_callbacks'}

  namespace :api, defaults:{format: :json} do
    resources :articles, only:[:index, :create, :update, :show, :destroy]
    resource :auth, only:[:show]
    resource :user, only:[:update]
    resources :users, only:[:show]
    resources :comments, only:[:create, :destroy]
    resources :tags, only:[:index]
    resources :searches, only:[:index]
    resources :follows, only:[:create,:destroy]

    get '/articles/:id/publish', to: 'articles#publish'
    patch '/articles/:id/unpublish', to: 'articles#unpublish'
    patch '/articles/:id/autosave', to: 'articles#autosave'

    post '/likes', to: 'likes#create'
    delete '/likes', to: 'likes#destroy'

    post '/bookmarks', to: 'bookmarks#create'
    delete '/bookmarks', to: 'bookmarks#destroy'
    
    post '/follows', to: 'follows#create'
    delete '/follows', to: 'follows#destroy'

    get '/user/drafts', to: 'users#drafts' 
    get '/user/published', to: 'users#published' 
    
  end
end

# custom routes for drafts, mentions 