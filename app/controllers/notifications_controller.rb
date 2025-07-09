class NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications.includes(event: [ record: [ :recipe, :commentable ] ]).order(Arel.sql("read_at IS NULL DESC, created_at DESC"))
    @pagy, @notifications = pagy_countless(@notifications, page: params[:page])
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
