## Minimum Viable Product

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create and read articles
- [ ] Tag articles with multiple tags
- [ ] Apply complex styling to Articles while writing

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Article Model, API, and basic APIUtil (1.5 days)

**Objective:** Articles can be created, saved as drafts, posted, destroyed and read through
the API.

- [ ] create `Article` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for articles (`ArticlesController`)
- [ ] jBuilder views for articles
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Articles can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each article component, building out the flux loop as needed.
  - [ ] `ArticlesIndex`
  - [ ] `ArticleIndexItem`
  - [ ] `ArticleForm`
- [ ] save Article Draft to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Tags (1.5 days)

**Objective:** Articles can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for article
  - [ ] adding tags to article, (differentiate author vs reader tags?)
  - [ ] searching articles by tag
  - [ ] searching authors by tag
- [ ] Style new elements

### Phase 6: Following other users (0.5 days)
- [ ] create Follows model and join table
- build out API, Flux loop, and components for:
  - [ ] ArticlesIndex fetch followed authors


### Phase 7: Allow Complex Styling in Articles (0.5 days)

**objective:** Enable complex styling of articles.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through articles for blocks of text
- [ ] Pagination / infinite scroll for Articles Index

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
