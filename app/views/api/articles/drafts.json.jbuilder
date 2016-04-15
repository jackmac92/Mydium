json.array! @articles do |article|
	json.extract! article, :id, :title, :subtitle, :body_stylized, :body_plain_text

	json.tags do
		json.array! article.tags do |tag|
			json.name tag.name
			json.id tag.id
		end
	end
	json.picture asset_url(article.picture.url)
end

