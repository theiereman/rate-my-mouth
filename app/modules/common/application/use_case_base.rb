class Common::Application::UseCaseBase
  def self.call(*args, &block)
    new(*args, &block).call
  end
end
