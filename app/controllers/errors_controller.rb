class ErrorsController < ApplicationController
  def show
    status = params[:code] || 500
    render inertia: "ErrorPage", props: {status:}, status: status
  end
end
