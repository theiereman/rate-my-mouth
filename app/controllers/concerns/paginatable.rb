module Paginatable
  extend ActiveSupport::Concern

  private

  def paginate_collection(collection, **options)
    limit = extract_limit_param
    pagy_options = options.merge(limit: limit)
    pagy(collection, **pagy_options)
  end

  def paginate_array(array, **options)
    limit = extract_limit_param
    pagy_options = options.merge(limit: limit)
    pagy_array(array, **pagy_options)
  end

  def extract_limit_param
    limit = params[:limit]&.to_i
    return nil if limit.blank? || limit <= 0

    [limit, max_pagination_limit].min
  end

  def max_pagination_limit
    50
  end
end
