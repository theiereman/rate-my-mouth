module Filterable
  extend ActiveSupport::Concern

  # model should have filter_by_ scopes and filtering_params method

  class_methods do
    def filter(filtering_params)
      results = where(nil)
      filtering_params.each do |key, value|
        results = results.send("filter_by_#{key}", value) unless value.blank?
      end
      results
    end
  end
end
