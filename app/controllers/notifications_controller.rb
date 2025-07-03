class NotificationsController < ApplicationController
  include Paginatable

  def index
    @notifications = current_user.notifications.order(created_at: :desc)
    @pagy, @notifications = paginate_collection(@notifications)
    @presented_notifications = @notifications.map { |notification| NotificationPresenter.new(notification).to_h }

    render json: {
      notifications: @presented_notifications,
      pagy: pagy_metadata(@pagy)
    }
  end

  def mark_as_read
    notification_ids = params[:notification_ids]
    p notification_ids
    notifications = current_user.notifications.where(id: notification_ids).where(read_at: nil)
    p notifications
    notifications.each(&:mark_as_read!)
    render json: { success: true }
  rescue => e
    render json: { success: false, message: e.message }, status: :unprocessable_entity
  end

  def mark_all_as_read
    current_user.notifications.mark_all_as_read!
    render json: { success: true, message: "All notifications marked as read" }
  rescue => e
    render json: { success: false, message: e.message }, status: :unprocessable_entity
  end
end
