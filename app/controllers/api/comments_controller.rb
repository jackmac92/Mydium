class Api::CommentsController < ApplicationController
	include PublicActivity::StoreController
	
	def show
	end
	
	def create
		@comment = current_user.comments.new(comment_params)

		if @comment.save!
			render :show
		else
			render json: @comment.errors.full_messages
		end
		
	end

	def destroy
		@comment = Comment.find(params[:id])
		@comment.destroy
		render json: {}
	end

	private
	def comment_params
		params.require(:comment).permit(:body, :article_id)
	end
end
