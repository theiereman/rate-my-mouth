class AddValueToRatings < ActiveRecord::Migration[8.0]
  change_table :ratings do |t|
    t.float :value
  end
end
