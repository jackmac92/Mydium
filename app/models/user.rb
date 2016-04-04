class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable
  has_many :authorizations, dependent: :destroy

  #Paperclip
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many :articles, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_articles, through: :bookmarks, source: :article

  acts_as_liker
  acts_as_mentionable
  acts_as_follower
  acts_as_followable

  # attr_accessible :email, :name, :password, :password_confirmation, :remember_me
  
  def recent_articles_excluding article_id
  	articles.order(:created_at).limit(5).where.not(id: article_id)
  end
end
