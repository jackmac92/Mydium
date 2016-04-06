# json.array! @articles do |article|
#   json.partial! 'article', article: article, minified: true
# end
json.meta do
	json.total_pages @articles.total_pages
	json.page @articles.current_page
end

json.articles do
	json.array! @articles do |article|
	  json.partial! 'article', article: article, minified: true
	end
end