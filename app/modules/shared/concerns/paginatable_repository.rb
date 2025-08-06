module Shared::Concerns::PaginatableRepository
  extend ActiveSupport::Concern

  included do
    include Pagy::Backend
  end

  def paginate_collection(collection, pagination_params)
    page = extract_page_param(pagination_params)
    limit = extract_limit_param(pagination_params)
    pagy(collection, page: page, limit: limit)
  end

  def extract_page_param(pagination_params)
    page = pagination_params[:page]&.to_i
    return 1 if page.blank? || page <= 0
    page
  end

  def extract_limit_param(pagination_params)
    limit = pagination_params[:limit]&.to_i
    return default_pagination_limit if limit.blank? || limit <= 0

    [limit, max_pagination_limit].min
  end

  def default_pagination_limit
    10
  end

  def max_pagination_limit
    50
  end
end
