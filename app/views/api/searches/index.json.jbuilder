json.meta do
  json.total_pages @search_results.total_pages
  json.query params[:query]
  json.page @search_results.current_page
end

json.search_results do
  json.array! @search_results.map(&:searchable) do |search_result|
    case search_result
    when User
      json.partial! "api/users/user", user: search_result
    when Article
      json.partial! "api/articles/article", article: search_result, minified: true
    when Tag
      json.partial! "api/tags/tag", tag: search_result
    end
    json._type search_result.class.to_s
    json.resultId search_result.id + 10000
    
    # # Metaprogramming for general case
    # tableized = search_result.class.to_s.tableize
    # json.partial!(
    #   "api/#{tableized}/#{tableized.singularize}",
    #   tableized.singularize.to_sym => search_result
    # )
  end
end