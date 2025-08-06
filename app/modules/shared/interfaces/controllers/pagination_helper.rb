module Shared::Interfaces::Controllers::PaginationHelper
  extend ActiveSupport::Concern

  def extract_pagination_params
    {
      page: params[:page],
      limit: params[:limit]
    }
  end
end
