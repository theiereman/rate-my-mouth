Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords"
  }

  resources :users, only: [:index, :show, :update] do
    resources :achievements, only: [:index]
    patch "update_avatar", on: :member
  end

  patch "select_achievement_as_title", to: "achievements#select_achievement_as_title", as: :select_achievement_as_title

  get "my_profile", to: "users#my_profile", as: :my_profile

  get "notifications", to: "notifications#index", as: :notifications
  post "notifications/mark_as_read", to: "notifications#mark_as_read", as: :mark_notifications_as_read

  resources :recipes do
    resources :ratings, only: [:index, :create]
    resources :comments, only: [:index, :create, :update, :destroy]
    resources :notes, only: [] do
      get "show_for_user", on: :collection
      patch "update_for_user", on: :collection
    end
  end

  resources :tags, only: [:index, :create]

  resource :leaderboard, only: [:show]
  resolve("Leaderboard") { [:leaderboard] }

  get "up" => "rails/health#show", :as => :rails_health_check

  root "recipes#index"

  # Route secrète pour les explorateurs de code source
  get "source_explorer/:secret_key", to: "source_explorer#unlock_secret", as: :source_explorer
end
