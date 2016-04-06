class AddInfoToArticle < ActiveRecord::Migration
  def change
		add_column :articles, :subtitle, :string
		add_column :articles, :published_at, :datetime 
		
  end
end
