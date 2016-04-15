class Tagging < ActiveRecord::Base
  belongs_to :tag
  belongs_to :article

  include PublicActivity::Model
	tracked owner: :tag, recipient: :article

end
