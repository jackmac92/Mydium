class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.references :user, index: true, foreign_key: true
      t.references :article, index: true, foreign_key: true
      t.boolean :complete, default: :false

      t.timestamps null: false
    end
  end
end