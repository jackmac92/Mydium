json.array! @articles do |article|
  json.partial! 'article', article: article, minified: true
end