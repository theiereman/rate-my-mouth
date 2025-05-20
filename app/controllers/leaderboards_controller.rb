class LeaderboardsController < ApplicationController
  def show
    @users = User.left_joins(:recipes).group(:id).all.order("COUNT(recipes.id) DESC").limit(10)

    render inertia: "Leaderboard/Show", props: {
      users: @users.map do |user|
        user.as_json(only: [ :id, :username ], methods: [ :number_of_recipes, :avatar_url ])
      end
    }
  end
end
