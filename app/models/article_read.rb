class ArticleRead < ActiveRecord::Base
  belongs_to :user
  belongs_to :article
  
  include PublicActivity::Model
  tracked owner: :user, recipient: :article

end
