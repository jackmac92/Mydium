# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  User.destroy_all
  me = User.create(email:"jackmac79@gmail.com", password:"password")
  p2 = User.create(email:"buddy@gmail.com", password:"password")
  p3 = User.create(email:"guy@gmail.com", password:"password")
  p4 = User.create(email:"friend@gmail.com", password:"password")
  p5 = User.create(email:"pal@gmail.com", password:"password")

  Article.destroy_all
  me.articles.create(
    title:"10 Critical Skills You’ll Need to Succeed at Work in 2020",
    body: <<-BODY
      Which skills will be most in demand in the coming years? This infographic shows you how to set yourself up for success.
      Many factors and ingredients work together to create a recipe for success in work and in business. Perhaps, though, one of the most important ingredients to success is the ability to adapt as technology changes and new trends emerge in a fast-paced digital world.
      A new infographic shows that six key factors are driving the change were seeing right right now: extreme longevity, the rise of smart machines and systems, our computational world, new media ecology, superstructures organizations and the globally connected world.
      With all of these massive issues in play, what will the working landscape look like in five years? What skills will employees need to succeed?
      I’ll tell you one thing: they look nothing like the skills desired of workers in the industrial revolution, or even in the dot-com era.
      In 2020, the ability to come up with solutions, ideas and responses will be highly sought after and propel you to the front of the business line.
      New media literacy — the ability to critically asses and develop content by utilizing and leveraging new forms of media effectively — will be highly desirable in employees.
      Cross cultural competency, the ability to operate within different cultural settings, will be needed to thrive in work and business as it becomes increasingly global.
      A design mindset is also going to be key. If you’re able to represent and develop tasks and work processes that create desired outcomes, you’ll be in demand.
      And if you can’t work well with others in virtual environments, well… telecommuting isn’t just a trendy thing some hippy employers are offering. Virtual collaboration, the ability to work productively while driving engagement and demonstrating presence as a member of a virtual team, is the way business will increasingly be done.
      See more of the top ten skills you’ll need to succeed in 2020 (just five short years from now!):

    BODY
  )

  p2.articles.create(
    title: "Other article",
    body: <<-BODY
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    BODY
  )
end
