class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :article
  
  acts_as_mentioner
  acts_as_mentionable

  include PublicActivity::Model
  tracked
end
