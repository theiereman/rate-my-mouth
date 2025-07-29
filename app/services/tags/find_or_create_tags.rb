class Tags::FindOrCreateTags < ApplicationService
  def initialize(tags:)
    @tags = tags
  end

  def call
    ServiceResult.success(
      tags: @tags.map do |t|
        next if t["name"].blank?

        tag = Tag.where("lower(name) = ?", t["name"].downcase).first_or_initialize(name: t["name"])
        tag.save if tag.new_record?
        tag
      end.compact
    )
  end
end
