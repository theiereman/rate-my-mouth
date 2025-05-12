Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: "users/sessions" }

  concern :commentable do
    resources :comments, only: [ :create, :update, :destroy ]
  end


  resources :users, only: [] do
    get "list", on: :collection
    resources :achievements, only: [ :index ]
  end

  get "my_profile", to: "users#my_profile"

  resources :recipes, concerns: [ :commentable ] do
    resources :ratings, only: [ :create ]
    get "search", on: :collection
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "recipes#index"

  # Route secrète pour les explorateurs de code source
  get "source_explorer/:secret_key", to: "source_explorer#unlock_secret", as: :source_explorer
end
