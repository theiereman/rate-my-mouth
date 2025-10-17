class Users::RegistrationsController < Devise::RegistrationsController
  def new
    render inertia: "Public/Register"
  end

  def create
    build_resource(sign_up_params)
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        render inertia: "Recipes/Index"
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        render inertia: "Public/Login", props: {errors: resource.errors}
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      render inertia: "Public/Register", props: {errors: resource.errors}
    end
  end
end
