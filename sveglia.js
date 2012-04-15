Timers = new Meteor.Collection('timers');

var time_with_zero = function (time_component) {
  return (time_component < 10 ? ('0' + time_component) : time_component)
}

var to_string = function(time_in_milliseconds) {
  var time_in_seconds = time_in_milliseconds/1000
  var hour = Math.floor(time_in_seconds/60/60%24);
  var min = Math.floor(time_in_seconds/60%60);
  var sec = Math.floor(time_in_seconds%60);
  return time_with_zero(hour) + ':' + time_with_zero(min) + ':' + time_with_zero(sec)
}