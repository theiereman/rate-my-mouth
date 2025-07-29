class ServiceResult
  attr_reader :success, :data, :errors

  def initialize(success:, data: nil, errors: nil)
    @success = success
    @data = data
    @errors = errors
  end

  def self.success(data = nil)
    new(success: true, data: data)
  end

  def self.failure(errors = {})
    if errors.is_a?(String)
      errors = {global: errors}
    end
    new(success: false, errors: errors)
  end

  def success?
    success
  end
end
