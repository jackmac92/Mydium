class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows, id: false do |t|
    	t.integer :follower_id, null: false
    	t.integer :followee_id, null: false
    end
    add_index :follows, [:follower_id, :followee_id], unique: true
  end
end
