class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :msg_id, null: false
      t.string :msg_type, null: true
      t.string :text, null: true
      t.string :source, null: true
      t.string :agent, null: true
      t.string :serviceUrl, null: true
      t.string :user_client_id, null: true
      t.string :user_client_name, null: true
      t.string :bot_client_id, null: true
      t.string :bot_client_name, null: true
      t.string :channel_id, null: true
      t.string :conversation_id, null: true
      t.boolean :platform, default: false
      t.integer :orientation
      t.timestamp :time

      t.timestamps
    end
  end
end
