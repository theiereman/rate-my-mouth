source "https://rubygems.org"

gem "rails", "~> 8.0.2"
gem "propshaft"
gem "sqlite3", ">= 2.1"
gem "puma", ">= 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[windows jruby]

gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false

gem "image_processing", "~> 1.2"

group :development, :test do
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"

  gem "brakeman", require: false

  gem "rubocop-rails-omakase", require: false
  gem "bullet"
end

group :development do
  gem "web-console"
  gem "letter_opener"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

gem "inertia_rails", "~> 3.15"

gem "vite_rails", "~> 3.0"

gem "devise", "~> 4.9"

# pagination
gem "pagy", "~> 43.2"

# S3 bucket storage for Active Storage
gem "aws-sdk-s3", require: false

gem "noticed", "~> 2.9"

gem "standard", ">= 1.35.1"
