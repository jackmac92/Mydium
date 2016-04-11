class Article < ActiveRecord::Base
  validates :body_plain_text, :user_id, :title, presence: :true
  validates :published, inclusion:{in:[true, false]}

  has_attached_file :picture, styles: { large: "800x800>", thumb: "100x100>" }, default_url: "missing.jpg"
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\Z/

  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  has_many :bookmarks, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :article_views, dependent: :destroy
  has_many :users_who_viewed, through: :article_views, source: :user

  scope :popular, -> { 
    select("articles.*, count(article_views.id) AS views_count").
    joins(:article_views).
    group("articles.id").
    order("views_count DESC")
  }

  acts_as_likeable
  acts_as_mentioner

  include PgSearch
  multisearchable against: [:title, :subtitle, :body_plain_text],
                    :if => :published

  include PublicActivity::Model
  tracked

  def add_tag tag_name
    tag = Tag.where(name: tag_name)[0] || Tag.create(name: tag_name)
    taggings.create(tag_id: tag.id)
  end

  def scan_for_mentions!
    body_plain_text
      .split
      .select { |word| word[0] == "@" && User.any?(username: word[1..-1])}
      .each { |user| mention! user }
  end

  def publish!
    self.published = true
    self.published_at = Time.now
    scan_for_mentions!
    self.save!
  end
  def unpublish!
    published = false
    published_at = nil
    save!
  end

  def view_count
    article_views.count
  end

  def favorite_count
    likers(User).count
  end

  def self.all_with_tag tag_name
    tag = Tag.where(name: tag_name)[0]
    where(id: Tagging.where(tag_id: tag.id).map(&:article_id))
  end

end