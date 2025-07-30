class Tags::Queries::ByIds < QueryBase
  def initialize(params)
    @params = params
  end

  def call
    ids = @params[:ids]&.split(",")&.map(&:to_i) || []
    Tags::Models::Tag.where(id: ids)
  end
end
