class LeaderboardsController < ApplicationController
  def show
    @users = case params[:type]
    when "recipes"
      Users::Models::User.includes(:avatar_attachment).left_joins(:recipes).group(:id).all.order("COUNT(recipes.id) DESC").limit(10)
    when "comments"
      Users::Models::User.includes(:avatar_attachment).left_joins(:comments).group(:id).all.order("COUNT(comments.id) DESC").limit(10)
    when "ratings"
      Users::Models::User.includes(:avatar_attachment).left_joins(:ratings).group(:id).all.order("COUNT(ratings.id) DESC").limit(10)
    else
      Users::Models::User.includes(:avatar_attachment).left_joins(:recipes).group(:id).all.order("COUNT(recipes.id) DESC").limit(10)
    end

    render inertia: "Leaderboard/Show", props: {
      users: @users.map do |user|
        user.as_json(only: [:id, :username, :title, :recipes_count, :comments_count, :ratings_count], methods: [:avatar_url])
      end,
      type: params[:type] || "recipes"
    }
  end
end
