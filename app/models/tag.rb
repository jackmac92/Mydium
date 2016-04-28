class Tag < ActiveRecord::Base
	validates :name, presence: true
	has_many :taggings, dependent: :destroy
	
	acts_as_followable

  include PgSearch
  multisearchable against: :name,
  								using: {
  									tsearch: {prefix: true, any_word: true},
  									trigram: {}
  								}

end
