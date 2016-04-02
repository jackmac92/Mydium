class Article < ActiveRecord::Base
  validates :body, :user_id, :title, presence: :true
  validates :published, inclusion:{in:[true, false]}

  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  has_many :comments, dependent: :destroy

end