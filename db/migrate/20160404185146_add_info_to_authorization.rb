class AddInfoToAuthorization < ActiveRecord::Migration
  def change
  	add_column :authorizations, :token, :string
  	add_column :authorizations, :secret, :string
  	add_column :authorizations, :link, :string
  	add_column :authorizations, :name, :string
  end
end
