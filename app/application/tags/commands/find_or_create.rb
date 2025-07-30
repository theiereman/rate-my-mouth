class Tags::Commands::FindOrCreate < CommandBase
  def initialize(tags:)
    @tags = tags
  end

  def call
    CommandResult.success(
      tags: @tags.map do |t|
        next if t["name"].blank?

        tag = Recipes::Models::Tag.where("lower(name) = ?", t["name"].downcase).first_or_initialize(name: t["name"])
        tag.save if tag.new_record?
        tag
      end.compact
    )
  end
end
