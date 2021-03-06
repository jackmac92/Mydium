Rails.application.routes.draw do
  root to: "static_pages#root"

  devise_for :users, controllers: {sessions: 'api/sessions', registrations: 'api/registrations', omniauth_callbacks: 'omniauth_callbacks'}

  namespace :api, defaults:{format: :json} do
    resources :articles, only:[:index, :create, :update, :show, :destroy]
    resource :auth, only:[:show]
    # resource :user, only:[:update]
    # resources :users, only:[:show]
    resources :comments, only:[:create, :destroy]
    resources :tags, only:[:index]
    resources :searches, only:[:index]

    resources :article_reads, only:[:create]

    get "/users/:id", to: 'users#show'
    patch "/user/:id", to: 'users#update'
    patch '/articles/:id/publish', to: 'articles#publish'
    patch '/articles/:id/unpublish', to: 'articles#unpublish'
    patch '/articles/:id/autosave', to: 'articles#autosave'
    patch '/articles/:id/picture', to: 'articles#set_picture'
    post '/articles/new_id', to: 'articles#autosave_id'

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