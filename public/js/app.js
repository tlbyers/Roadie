var webAuth = new auth0.WebAuth({
    domain: "roadie.auth0.com",
    clientID: "RwcedO9FuaceFDfE9dS2pDlSmtdiS2nF",
    redirectUri: "http://localhost:3000/",
    audience: 'https://’ + “roadie.auth0.com” + ‘/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

 hideBeforeLoginScreen();
  handleAuthentication();
  initHandlers();

 function hideBeforeLoginScreen() {
    $("#after-login-screen").hide();
    $("#user-about-me").hide();
    $("#user-post").hide();
    $("#survey-btns-div").hide();
  }

  

 function showAfterLoginScreen() {
    $("#welcome-screen").hide();
    $("#after-login-screen").show();
    $("#user-about-me").show();
    $("#user-post").show();
    $("#survey-btns-div").show();
    // $(‘html’).css({
    //   “backgroundImage”: “none”,
    //   “backgroundColor”: “#8da8ce ”
    // });
  }

 function initHandlers() {
    // buttons and event listeners
    $('.btn-login')(function (event) {
      event.preventDefault();
      webAuth.authorize();
    });
    $('btn-logout').click(logout);
    $("#submit-new-post").on("click", submitNewPost);
    $("#submit-new-about").on("click", submitAboutUser);
    $(".button-coollapse").sideNav();
  }

 function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('expires_at', expiresAt);
  }

 // return to blank screen?
  // render a blank page
  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
   displayButtons();
  }

 // checks to verify user is logged in? Maybe do this before any
  // calls to the server
  function isAuthenticated() {
    // Check whether the current time is past the
    // access token’s expiry time
   var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

 function displayButtons() {
    if (isAuthenticated()) {
      $('.btn-login').css('display', 'none');
      $('.btn-logout').css('display', 'inline-block');
      $('#login-status').text('You are Logged in!');
    }else {
      $('.btn-login').css('display', 'inline-block');
      $('.btn-logout').css('display', 'none');
      $('.btn-login-status').text('Please login to continue');
    }
  }

 function handleAuthentication() {
    // wrap function around this
    webAuth.parseHash(window.location.hash, function (err, authResult) {
      if (err) {
        // amend message to screen telling user to login or re-login since their token expired!!
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      } else if (authResult && authResult.accessToken && authResult.idToken) {

        window.location.hash = '';
        setSession(authResult);
        $('btn-login').css('display','none');
        // toggle showing login/logout depending on if the user is authenticated or not
        displayButtons();

       webAuth.client.userInfo(authResult.accessToken, function (err, user) {
          console.log(user);
          var newUser = {
            email: user.email,
            name: user.name,
            nickname: user.nickname,
            picture: user.picture,
            last_login: user.updated_at,
          }

         // send recieved user Object to database after authentication via auth0
          postUserDB(newUser);
        });
      }
    });
  }