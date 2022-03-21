"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// display submit form when user clicks 'navbar > submit'
function navSubmitStoryClick() {
  hidePageComponents()
  $allStoriesList.show()
  $submitForm.show()
}

$navSubmitStory.on('click', navSubmitStoryClick)

// display user's submitted stories on 'navbar > my stories' click
function navMyStories() {
  hidePageComponents()
  putUserStoriesOnPage()
  $myStories.show()
}

$navMyStories.on('click', navMyStories)

// display user profile when clicking 'navbar > username'
function navProfileClick() {
  hidePageComponents()
  $userProfile.show()
}

$navUserProfile.on('click', navProfileClick)

// display user's favorite stories when clicking 'navbar > favorites'
function navFavoritesClick() {
  hidePageComponents()
  putFavoritesListOnPage()
  $favoritedStories.show()
}

$navFavoriteStories.on('click', navFavoritesClick)