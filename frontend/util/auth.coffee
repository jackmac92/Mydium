SessionActions = require '../actions/session'

AuthUtil =

  createNewUser: (userForm, callback) ->
    $.ajax
      type: "POST"
      url: "users/"
      dataType: "json"
      data: {user: userForm}
      success: (currentUser) ->
        SessionActions.currentUserReceived currentUser
        callback && callback()
      error: (e) ->
        console.log "Done gone wrong when making new user"
        console.log e

  logOutUser: (callback) ->
    $.ajax
      type: "DELETE"
      url: "users/sign_out"
      dataType: "json"
      success: ->
        SessionActions.logout()
        callback && callback()

  logInUser: (userCredentials, callback) ->
    $.ajax
      type: "POST"
      url: "users/sign_in"
      dataType: "json"
      data: {user: userCredentials}
      success: (currentUser) ->
        SessionActions.currentUserReceived currentUser
        callback && callback()
      error: (e) ->
        console.log "Done gone wrong when loggin in"
        console.log e
    

  fetchCurrentUser: (completion) ->
    $.ajax
      type: "GET"
      url: "api/auth"
      dataType: "json"
      success: (currentUser, textStatus, xhr) ->
        unless xhr.status == 204
          SessionActions.currentUserReceived currentUser 
      complete: ->
        completion && completion()
      error: ->
        console.log "Done gone wrong tryna fetch current user"

module.exports = AuthUtil