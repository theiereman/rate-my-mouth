module Paginatable
  extend ActiveSupport::Concern

  private

  def paginate_collection(collection, **options)
    limit = extract_limit_param

    pp "== LIMIT == #{limit}"

    pagy_options = options.merge(limit: limit) if limit.present?
    pagy(:offset, collection, **pagy_options)
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
