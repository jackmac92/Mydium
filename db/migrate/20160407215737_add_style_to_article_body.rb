class AddStyleToArticleBody < ActiveRecord::Migration
  def change
  	remove_column :articles, :body, :text
  	add_column :articles, :body_stylized, :text
  	add_column :articles, :body_plain_text, :text
  end
end