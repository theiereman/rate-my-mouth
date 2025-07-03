Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords"
  }

  concern :commentable do
    resources :comments, only: [ :create, :update, :destroy ]
  end

  resources :users, only: [ :index, :show, :update ] do
    resources :achievements, only: [ :index ]
    patch "update_avatar", on: :member
  end

  patch "select_achievement_as_title", to: "achievements#select_achievement_as_title", as: :select_achievement_as_title

  get "my_profile", to: "users#my_profile", as: :my_profile

  get "notifications", to: "user_notifications#index", as: :notifications
  post "notifications/mark_as_read", to: "user_notifications#mark_as_read", as: :mark_notifications_as_read

  resources :recipes, concerns: [ :commentable ] do
    resources :ratings, only: [ :create ]
    resources :notes, only: [] do
      get "show_for_user", on: :collection
      patch "update_for_user", on: :collection
    end
  end

  resources :tags, only: [ :index, :create ]

  resource :leaderboard, only: [ :show ]
  resolve("Leaderboard") { [ :leaderboard ] }

  get "up" => "rails/health#show", as: :rails_health_check

  root "recipes#index"

  # Route secrète pour les explorateurs de code source
  get "source_explorer/:secret_key", to: "source_explorer#unlock_secret", as: :source_explorer
end
