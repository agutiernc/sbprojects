"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser)

  return $(`
      <li id="${story.storyId}">
        ${showDeleteBtn ? deleteBtn() : ''}
        ${showStar ? starHTML(story, currentUser) : ''}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function deleteBtn() {
  return `
    <span class='delete-btn'>
      <i class="fas fa-trash-alt"></i>
    </span>
  `
}

function starHTML(story, user) {
  const isFavorite = user.isFavorite(story)
  const starToggle = isFavorite ? 'fas' : 'far'

  return `
    <span class='star'>
    <i class="${starToggle} fa-star"></i>
    </span>
  `
}

async function submitNewStory(evt) {
  evt.preventDefault()

  // get input values
  const author = $('#author').val()
  const title = $('#title').val()
  const url = $('#url').val()

  const username = currentUser.username
  const storyInfo = { author, title, url, username }

  const story = await storyList.addStory(currentUser, storyInfo)

  $allStoriesList.prepend( generateStoryMarkup(story) )

  // after submit, reset input and hide form
  $submitForm.trigger('reset')
  $submitForm.slideUp('slow')
}

$submitForm.on('submit', submitNewStory)

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putUserStoriesOnPage() {
  $myStories.empty()

  if (currentUser.ownStories.length === 0) {
   $myStories.append('<p>No stories added by user yet!</p>')
  } else {
    for (let story of currentUser.ownStories) {
      $myStories.append( generateStoryMarkup(story, true) )
    }
  }

  $myStories.show()
}

function putFavoritesListOnPage() {
  $favoritedStories.empty()

  if (currentUser.favorites.length === 0) {
    $favoritedStories.append('<p>No favorites added!</p>')
  } else {
    for (let fav of currentUser.favorites) {
      $favoritedStories.append(generateStoryMarkup(fav))
    }
  }

  $favoritedStories.show()
}

async function toggleStoryFavorite(evt) {
  const storyId = $(evt.target).closest('li').attr('id')
  const story = storyList.stories.find(s => s.storyId === storyId)

  if ($(evt.target).hasClass('fas')) {
    await currentUser.removeFavorite(story)

    $(evt.target).closest('i').toggleClass('fas far')
  } else {
    await currentUser.addFavorite(story)

    $(evt.target).closest('i').toggleClass('fas far')
  }
}

$storiesLists.on('click', '.star', toggleStoryFavorite)

async function deleteStory(evt) {
  // target story to delete
  const storyId = $(evt.target).closest('li').attr('id')

  // delete story from server
  await storyList.removeStory(currentUser, storyId)

  // repopulate user's story list
  putUserStoriesOnPage()
}

$myStories.on('click', '.delete-btn', deleteStory)