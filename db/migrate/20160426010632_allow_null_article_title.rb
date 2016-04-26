class AllowNullArticleTitle < ActiveRecord::Migration
  def change
  	change_column :articles, :title, :string, null: true
  end
end
