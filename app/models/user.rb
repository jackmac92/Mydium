class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many :articles, dependent: :destroy

  has_many :comments, dependent: :destroy
  
  has_many :favorites

  has_many :bookmarks

  has_many :followers, className: "Follows", foreign_key: :followee_id

  has_many :followed_users, className: "Follows", foreign_key: :follower_id


  def recent_articles_excluding article_id
  	articles.order(:created_at).limit(5).where.not(id: article_id)
  end
end
