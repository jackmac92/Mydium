# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  Tag.destroy_all
  User.destroy_all
  me = User.create(email:"jackmac79@gmail.com", password:"password", name:"Jack McCown", username:"jackmac", avatar:Faker::Avatar.image)

  40.times do
    name = Faker::Name.name
    User.create email:Faker::Internet.email(name), password:"password", avatar:Faker::Avatar.image, name:name, username:Faker::Internet.user_name(name)
  end
  article_pics = []
  pathtoimages = 'app/assets/images' 
  Dir.foreach(pathtoimages) do |pic|
    if pic.split('.')[0] != 'missing' && pic.split('.')[0] != 'logo' && pic[0] != "."
      article_pics << "app/assets/images/#{pic}"
    end
  end

  Article.destroy_all
  tags = %w(tech fashion startups culture art stocks foreign finance celebrity politics DIY offbeat funny satire design business economcis UX life)

  25.times do
    article = User.all.sample.articles.create!(title:Faker::StarWars.quote, subtitle:Faker::Hipster.sentence , body_plain_text:Faker::Hipster.paragraphs(20+rand(35)).join("\n\n"), picture:File.open(article_pics.pop))
    time = Time.now - rand(12).hours - rand(8).days - rand(60).minutes
    article.update! created_at: (time - 1.hour)
    if rand(8) >= 2
      article.publish! 
      article.update! published_at: time 
      8.times do
        User.all.sample.comments.create(body:Faker::Hacker.say_something_smart, article_id:article.id)
      end
    end
    tags.sample(5).each do |tag|
      article.add_tag(tag)
    end
    6.times do
      User.all.sample.bookmarks.create(article_id: article.id)
    end

  end

  
  
  User.all.each do |user|
    7.times do
      user.like!(Article.viewable.sample)
      user.follow!(User.all.sample)
      user.follow!(Tag.all.sample)
      Article.all.sample.mention! user
    end
    (5 + rand(8)).times do
      user.article_views.create(article_id: Article.all.sample.id)
    end
  end


end