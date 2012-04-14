Timers = new Meteor.Collection('timers');

var now = function() {
  var date = new Date();
  var now = date.getTime()/1000;
  return Math.floor(now)
}

Meteor.methods({
  start_timer: function(timer) {
    var time_left = timer.expires_at - now();

    var interval = Meteor.setInterval(function () {
      time_left -= 1;
      Timers.update(timer._id, {$set: {time_left: time_left}});

      if (time_left === 0 || time_left < 0) {
        Meteor.clearInterval(interval);
        Timers.update(timer._id, {$set: {time_left: 0}});
      }
    }, 1000);
  }
})