class Article < ActiveRecord::Base
  validates :body, :user_id, :title, presence: :true
  validates :published, inclusion:{in:[true, false]}

  belongs_to :user

  has_many :taggings

  has_many :tags, through: :taggings
end
