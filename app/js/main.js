import $ from 'jquery'

var timer = 25
var breakDuration = 5
var sessionDuration = 25 
var maxBreakDuration = 30
var maxSessionDuration = 60
var timerStart
var gtime = '2222'
var startedAt
var currentTime = 0
var count
var displayTime
var sessionTime = 0
var displayMs
var breakTime = false

$('#go').click(function(e) {
  if ($('#go').text() === 'Go!') {
    myTimer()
    $('#go').text('Pause!')
  } else {
    $('#go').text('Go!')
    pause()
    // startedAt = Date.now()
  }
})

$('#breakInc').click(function(e) {
  breakUpdate(1)
})

$('#breakDec').click(function(e) {
  breakUpdate(-1)
})

$('#go').click(function(e) {
  var currentTime = new Date()

})

function breakUpdate (amount) {
  breakDuration += amount
  $('#breakLabel').text(breakDuration)
  $('#breakInc').prop('disabled', breakDuration === maxBreakDuration)
  $('#breakDec').prop('disabled', breakDuration === 1)
}

$('#sessionInc').click(function(e) {
  sessionUpdate(1)
})

$('#sessionDec').click(function(e) {
  sessionUpdate(-1)
})

function sessionUpdate (amount) {
  sessionDuration += amount
  $('#sessionLabel').text(sessionDuration)
  $('#sessionInc').prop('disabled', sessionDuration === maxSessionDuration)
  $('#sessionDec').prop('disabled', sessionDuration === 1)

}


function minToMs (min) {
  return min * 60000
}

function msToMinSecs(ms) {
  return {mins: Math.floor(ms / 60000 % 60),
          secs: Math.floor(ms / 1000 % 60)}
}

function myTimer (timerType) {
  startedAt = Date.now()
  if ( breakTime ) {
    console.log('break start')
    if (sessionTime === 0 ) sessionTime = minToMs(breakDuration)
     sessionTime = minToMs(breakDuration)
  } else {
    if (sessionTime === 0) sessionTime = minToMs(sessionDuration)
    console.log('session start')
  }
  count = setInterval(function() {
    displayMs = sessionTime - (Date.now() - startedAt)
    if (displayMs < 1) {
      window.clearInterval(count)
       // timerType === 'session' ? myTimer('break') : myTimer('session')
      breakTime = !breakTime
      sessionTime = 0
      myTimer()
    }

    displayTime = msToMinSecs(displayMs)
    // $('#timerLabel').text(displayTime.mins + ':' + (displayTime.secs < 10 ? '0' + displayTime.secs : displayTime.secs))
    $('#timerLabel').text(displayTime.mins + ':' + (displayTime.secs < 10 ? '0' + displayTime.secs : displayTime.secs))
  }, 1000)
}

function pause () {
  sessionTime = displayMs
  window.clearInterval(count)
}


// function ds () {
//   console.log('fff')
//   return msToMinSecs(Date.now())
// }

// class Timer {
//   constructor (time) {
//     this.time = time
//     this.t = msToMinSecs(time)
//   }

//   start (fn, count) {
//     $('#timerLabel').text(t.mins + ':' + t.secs)
//     this.timer = window.setTimeout(fn, this.time)
//     startedAt = Date.now()
//     this.fn = fn
//     this.count = setInterval(function() {
//       console.log('t:' + startedAt)
//       var n = msToMinSecs(currentTime - (Date.now() - startedAt))
//       $('#timerLabel').text(n.mins + ':' + n.secs)
//     }, 1000)
//     // $('#timerLabel').text(msToMinSecs(this.time-Date.now()))
//     gtime = this.time
//   }

//   pause () {
//     this.time = this.startedAt - new Date() 
//     window.clearTimeout(this.timer)
//   }

//   resume () {
//     this.startedAt = new Date()
//     this.timer = window.SetTimeout(this.fn, this.time)
//   }
// }
// var t = new Timer(currentTime)
// console.log(t)
// var f = function () {console.log('huzzah')}
// t.start(f)

// console.log (msToMinSecs(111000))
// console.log (msToMinSecs(Date.now()))

 
