class AddIndexToArticles < ActiveRecord::Migration
  def change
  	add_index :articles, [:title, :id], unique: true
  end
end
