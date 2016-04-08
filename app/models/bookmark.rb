class Bookmark < ActiveRecord::Base
  belongs_to :user
  belongs_to :article
  # include PublicActivity::Model
  # tracked

end
