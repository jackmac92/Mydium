class Article < ActiveRecord::Base
  validates :body, :user_id, :title, presence: :true
  validates :published, inclusion:{in:[true, false]}

  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  has_many :bookmarks, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy

  acts_as_likeable
  acts_as_mentioner

end