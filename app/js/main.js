import $ from 'jquery'

var breakDuration = 5
var sessionDuration = 25
var maxBreakDuration = 30
var maxSessionDuration = 60
var startedAt
var count
var displayTime
var sessionTime = 0
var displayMs
var breakTime = false
var notification

window.Notification.requestPermission()

$('#go').click(function (e) {
  if ($('#go').text() === 'Go!') {
    myTimer()
    $('#go').text('Pause!')
  } else {
    $('#go').text('Go!')
    pause()
  }
})

$('#breakInc').click(function (e) {
  breakUpdate(1)
})

$('#breakDec').click(function (e) {
  breakUpdate(-1)
})

$('#sessionInc').click(function (e) {
  sessionUpdate(1)
})

$('#sessionDec').click(function (e) {
  sessionUpdate(-1)
})

function sessionUpdate (amount) {
  sessionDuration += amount
  $('#sessionLabel').text(sessionDuration)
  $('#sessionInc').prop('disabled', sessionDuration === maxSessionDuration)
  $('#sessionDec').prop('disabled', sessionDuration === 1)
}

function breakUpdate (amount) {
  breakDuration += amount
  $('#breakLabel').text(breakDuration)
  $('#breakInc').prop('disabled', breakDuration === maxBreakDuration)
  $('#breakDec').prop('disabled', breakDuration === 1)
}

function minToMs (min) {
  return min * 60000
}

function msToMinSecs (ms) {
  return {mins: Math.floor(ms / 60000 % 60),
          secs: Math.floor(ms / 1000 % 60)}
}

function myTimer (timerType) {
  startedAt = Date.now()
  if (breakTime) {
    
    if (sessionTime === 0) sessionTime = minToMs(breakDuration)
    sessionTime = minToMs(breakDuration)
  } else {
    if (sessionTime === 0) sessionTime = minToMs(sessionDuration)
    // var notification = new window.Notification('Pomodoro Timer', {body: 'Start Working'})
    notification = new window.Notification('Pomodoro Timer', {body: 'Start Working'})
  }
  count = setInterval(function () {
    displayMs = sessionTime - (Date.now() - startedAt)
    if (displayMs < 1) {
      window.clearInterval(count)
      breakTime = !breakTime
      sessionTime = 0
      playSound()
      myTimer()
    }

    displayTime = msToMinSecs(displayMs)
    $('#timerLabel').text(displayTime.mins + ':' + (displayTime.secs < 10 ? '0' + displayTime.secs : displayTime.secs))
  }, 1000)
}

function pause () {
  sessionTime = displayMs
  window.clearInterval(count)
}

function playSound () {
  document.getElementById('audio').play()
}
