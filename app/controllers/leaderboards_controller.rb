class LeaderboardsController < ApplicationController
  def show
    case params[:type]
    when "recipes"
      @users = User.left_joins(:recipes).group(:id).all.order("COUNT(recipes.id) DESC").limit(10)
    when "comments"
      @users = User.left_joins(:comments).group(:id).all.order("COUNT(comments.id) DESC").limit(10)
    when "ratings"
      @users = User.left_joins(:ratings).group(:id).all.order("COUNT(ratings.id) DESC").limit(10)
    else
      @users = User.left_joins(:recipes).group(:id).all.order("COUNT(recipes.id) DESC").limit(10)
    end

    render inertia: "Leaderboard/Show", props: {
      users: @users.map do |user|
        user.as_json(only: [ :id, :username, :title ], methods: [ :number_of_comments, :number_of_ratings, :number_of_recipes, :avatar_url ])
      end,
      type: params[:type] || "recipes"
    }
  end
end
