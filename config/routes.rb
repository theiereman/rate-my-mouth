Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }

  concern :commentable do
    resources :comments, only: [ :create, :update, :destroy ]
  end

  resources :users, only: [ :show, :update ] do
    get "list", on: :collection
    resources :achievements, only: [ :index ]
    patch "update_avatar", on: :member
  end

  get "my_profile", to: "users#my_profile", as: :my_profile

  resources :recipes, concerns: [ :commentable ] do
    resources :ratings, only: [ :create ]
  end

  resources :tags, only: [ :index, :create ]

  resource :leaderboard, only: [ :show ]
  resolve("Leaderboard") { [ :leaderboard ] }

  get "up" => "rails/health#show", as: :rails_health_check

  root "recipes#index"

  # Route secrète pour les explorateurs de code source
  get "source_explorer/:secret_key", to: "source_explorer#unlock_secret", as: :source_explorer
end
