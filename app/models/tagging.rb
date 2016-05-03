class Tagging < ActiveRecord::Base
	validates :tag_id, :article_id, presence: true
  belongs_to :tag
  belongs_to :article

  include PublicActivity::Model
	tracked owner: :tag, recipient: :article

end
