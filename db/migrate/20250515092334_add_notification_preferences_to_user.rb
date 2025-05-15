class AddNotificationPreferencesToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :notification_preference, :boolean, default: true, null: false
  end
end
