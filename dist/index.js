var element = document.getElementById('arena')
var DATA

function getPosts () {
  fetch('https://timur.lib.id/are@dev/?channel=camera-roll')
  .then(function (res) {
    return res.json()
  })
  .then(function (json) {
    DATA = json
    handlePosts()
  })
}

function handlePosts () {
  if (DATA.contents) {
    var num
    num = getRandomNumber(DATA.contents.length - 1)
    console.log(DATA.contents[num], 'trying....')
    if (DATA.contents[num].class === 'Image') createPost(DATA.contents[num], num, DATA.contents.length)
    else handlePosts()
  }
}

function createPost (content, currentNum, totalNum) {
  console.log(content, 'success')
  var img = element.querySelector('img')
  var title = element.querySelector('#title')
  var updated = element.querySelector('#updated')
  var source = element.querySelector('#source')
  var numCurrent = element.querySelector('#num-current')
  var numTotal = element.querySelector('#num-total')

  var updatedTime = content.updated_at

  element.classList.add('loaded')

  img.setAttribute('src', content.image.large.url)
  title.innerHTML = content.generated_title
  updated.innerHTML = updatedTime.substring(0, 16)
  source.innerHTML = 'are.na/block/' + content.id
  source.setAttribute('href', '//are.na/block/' + content.id)

  numCurrent.innerHTML = currentNum
  numTotal.innerHTML = totalNum
}

function getRandomNumber (max) {
  return Math.floor(Math.random() * (max - 0 + 1) + 0)
}

function init () {
  getPosts()
}

document.addEventListener('DOMContentLoaded', init)
