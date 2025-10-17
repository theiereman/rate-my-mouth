class AuthFailure < Devise::FailureApp
  def http_auth?
    if request.inertia?
      false
    else
      super
    end
  end
end
