class Api::TagsController < ApplicationController
	def index
    @featured_tags = Tag.all.shuffle[0..10]
    @user_tags = current_user.followed_tags if current_user
    @all_tags = Tag.all
  end

  # def create
  #   @tag = Tag.new(tag_params)
  #   if @tag.valid?
  #     @tag.save!
  #     render :show
  #   else
  #     render json: @tag.errors.full_messages, status: 422
  #   end
  # end

  # def update
  #   @tag = Tag.find(params[:id])
  #   if @tag.update(tag_params)
  #     render :show
  #   else
  #     render json: @tag.errors.full_messages, status: 422
  #   end
  # end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    render :show
  end

  private
  def tag_params
    params.require(:tag).permit(:name,:body,:published)
  end

end