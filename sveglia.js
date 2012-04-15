Timers = new Meteor.Collection('timers');

var now = function() {
  var date = new Date();
  return Math.floor(date.getTime()/1000);
}