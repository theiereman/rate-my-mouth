class Shared::Application::UseCases::UseCaseBase
  def self.call(*args, **aargs, &block)
    new(*args, **aargs, &block).call
  end
end
