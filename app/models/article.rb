class Article < ActiveRecord::Base
  validates :body, :user_id, :title, presence: :true
  validates :published, inclusion:{in:[true, false]}

  has_attached_file :picture, styles: { large: "800x800>", thumb: "100x100>" }, default_url: "missing.jpg"
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\Z/

  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  has_many :bookmarks, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :article_views
  has_many :users_who_viewed, through: :article_views, source: :user

  acts_as_likeable
  acts_as_mentioner

  def add_tag tag_name
    tag = Tag.where(name: tag_name)[0] || Tag.create(name: tag_name)
    taggings.create(tag_id: tag.id)
  end

  def self.popular
    Article.all.order(view_count: :desc).limit 5
  end

  def view_count
    article_views.count
  end

  def self.all_with_tag tag_name
    tag = Tag.where(name: tag_name)[0]
    where(id: Tagging.where(tag_id: tag.id).map(&:article_id))
  end

end