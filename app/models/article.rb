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

  def add_tag tag_name
    tag = Tag.where(name: tag_name)[0] || Tag.create(name: tag_name)
    taggings.create(tag_id: tag.id)
  end

  def self.all_with_tag tag_name
    tag = Tag.where(name: tag_name)[0]
    where(id: Tagging.where(tag_id: tag.id).map(&:article_id))
  end

end