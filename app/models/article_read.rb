class ArticleRead < ActiveRecord::Base
  belongs_to :user
  belongs_to :article
  before_create :check_for_bookmark
  include PublicActivity::Model
  tracked owner: :user, recipient: :article

  def check_for_bookmark
  	debugger
  	bookmark = current_user.bookmarks.find_by(article_id: article_id) 
  	if bookmark
  		bookmark.destroy
  	end
  end
end
