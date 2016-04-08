# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  PublicActivity.enabled = false
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
  # me.articles.create(
  #   title:"10 Critical Skills You’ll Need to Succeed at Work in 2020",
  #   body: <<-BODY 
  #   Which skills will be most in demand in the coming years? This infographic shows you how to set yourself up for success. Many factors and ingredients work together to create a recipe for success in work and in business. Perhaps, though, one of the most important ingredients to success is the ability to adapt as technology changes and new trends emerge in a fast-paced digital world. A new infographic shows that six key factors are driving the change were seeing right right now: extreme longevity, the rise of smart machines and systems, our computational world, new media ecology, superstructures organizations and the globally connected world. With all of these massive issues in play, what will the working landscape look like in five years? What skills will employees need to succeed? I’ll tell you one thing: they look nothing like the skills desired of workers in the industrial revolution, or even in the dot-com era. In 2020, the ability to come up with solutions, ideas and responses will be highly sought after and propel you to the front of the business line. New media literacy — the ability to critically asses and develop content by utilizing and leveraging new forms of media effectively — will be highly desirable in employees. Cross cultural competency, the ability to operate within different cultural settings, will be needed to thrive in work and business as it becomes increasingly global. A design mindset is also going to be key. If you’re able to represent and develop tasks and work processes that create desired outcomes, you’ll be in demand. And if you can’t work well with others in virtual environments, well… telecommuting isn’t just a trendy thing some hippy employers are offering. Virtual collaboration, the ability to work productively while driving engagement and demonstrating presence as a member of a virtual team, is the way business will increasingly be done. See more of the top ten skills you’ll need to succeed in 2020 (just five short years from now!):
  #   BODY
  # )

  # p2.articles.create(
  #   title: "Other article",
  #   body: <<-BODY
  #     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  #   BODY
  # )
  tags = %w(tech fashion startups culture art stocks foreign finance celebrity politics DIY offbeat funny satire design business economcis UX life)



  20.times do
    article = User.all.sample.articles.create!(title:Faker::StarWars.quote, subtitle:Faker::Hipster.sentence , body_plain_text:Faker::Hipster.paragraphs(20+rand(35)).join("\n\n"), picture:File.open(article_pics.pop))
    tags.sample(5).each do |tag|
      article.add_tag(tag)
    end

    6.times do
      User.all.sample.bookmarks.create(article_id: article.id)
    end

    8.times do
      User.all.sample.comments.create(body:Faker::Hacker.say_something_smart, article_id:article.id)
    end
  end

  
  
  User.all.each do |user|
    7.times do
      user.like!(Article.all.sample)
      user.follow!(User.all.sample)
      user.follow!(Tag.all.sample)
      Article.all.sample.mention! user
    end
    user.articles.each { |a| a.publish! if rand(4) > 1 }
    (5 + rand(8)).times do
      user.article_views.create(article_id: Article.all.sample.id)
    end
  end


end