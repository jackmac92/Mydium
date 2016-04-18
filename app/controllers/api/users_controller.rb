class Api::UsersController < ApplicationController
	include PublicActivity::StoreController
	def show
		@user = User.find params[:id]
	end

	def drafts
		@articles = current_user.articles.where published: false
		render 'api/articles/drafts'
	end

	def tags
		@tags = current_user.followed_tags
		render 'api/tags/user_tags'
	end

	def update
		case params[:receiver]
		when "article"
			@article = Article.find params[:id]
			@is_mini = true # To reduce json render
			case params[:user_action]
			when "toggle_favorite"
				current_user.toggle_like! @article
			when "toggle_bookmark"
				current_user.toggle_bookmark params[:id]
			end
			render 'api/articles/show'
			return
		when "tag"
			case params[:tag_action]
			when "follow"
				@tag = Tag.find params[:id]
				current_user.follow! @tag
			when "unfollow"
				@tag = Tag.find params[:id]
				current_user.unfollow! @tag
			end
			@tags = current_user.followed_tags
			render 'api/tags/user_tags'
			return
		when "user"
			@user = User.find params[:id]
			case params[:user_action]
			when "toggle_follow"
				current_user.toggle_follow! @user
				render json: {}
				return
			end
		end
	end
end
