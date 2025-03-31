Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions"
  }

  resources :recipes

  get "up" => "rails/health#show", as: :rails_health_check

  root "recipes#index"
end
