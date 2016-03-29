# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Articles

- `GET /api/articles`
  - Articles index/search
  - accepts `tag_name` query param to list articles by tag
  - accepts pagination params (if I get there)
- `POST /api/articles`
- `GET /api/articles/:id`
	-includes article comments
- `PATCH /api/articles/:id`
- `DELETE /api/articles/:id`

### Tags

- An article's tags will be included in the article show template
- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/articles/:article_id/tags`: add tag to note by name
  - if article doesn't already exist, it will be created
- `DELETE /api/articles/:article_id/tags/:tag_name`: remove tag from note by
  name
