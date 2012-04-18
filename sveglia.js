Timers = new Meteor.Collection('timers');

var time_component = function (component) {
  return (component < 10 ? ('0' + component) : component)
}

var to_time = function(time_in_milliseconds) {
  var time_in_seconds = time_in_milliseconds/1000;
  var hour = Math.floor(time_in_seconds/60/60%24);
  var min = Math.floor(time_in_seconds/60%60);
  var sec = Math.floor(time_in_seconds%60);
  return time_component(hour) + ':' + time_component(min) + ':' + time_component(sec)
}