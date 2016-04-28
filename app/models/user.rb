class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook, :google_oauth2]
  has_many :authorizations, dependent: :destroy

  #Paperclip
  has_attached_file :avatar, 
    styles: { medium: "300x300>", thumb: "100x100>" }, 
    default_url: "missing.png",
    processors: [:compression]

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  before_destroy :remove_social_activity

  has_many :articles, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :article_views, dependent: :destroy
  has_many :article_reads, dependent: :destroy
  
  has_many :viewed_articles, through: :article_views, source: :article
  has_many :read_articles, through: :article_reads, source: :article
  has_many :bookmarked_articles, through: :bookmarks, source: :article

  acts_as_liker
  acts_as_mentionable
  acts_as_follower
  acts_as_followable

  include PgSearch
  multisearchable against: [:username, :name, :email],
                  using: {
                    tsearch: {prefix: true, any_word: true},
                    trigram: {}
                  }


  def favorite_articles
    Article.where(id: likees(Article).map(&:id))
  end

  def followed_users
    User.where(id: followees(User).map(&:id))
  end

  def followed_tags
    Tag.where(id: followees(Tag).map(&:id))
  end

  def activity_list
    PublicActivity::Activity.where owner_type: "User", owner_id: self.id
  end

  def toggle_bookmark article_id
    bookmark = bookmarks.find_by(article_id: article_id)
    bookmark ? bookmark.destroy : bookmarks.create(article_id: article_id)
  end

  def recent_articles_excluding article_id
  	articles.where(published: true).order(:created_at).limit(5).where.not(id: article_id)
  end

  private

  def remove_social_activity
    Follow.where(follower_type: "User").where(follower_id: self.id).destroy_all
    Follow.where(followable_type: "User").where(followable_id: self.id).destroy_all
    Like.where(liker_type: "User").where(liker_id: self.id).destroy_all
    Mention.where(mentionable_type: "User").where(mentionable_id: self.id).destroy_all
  end

end