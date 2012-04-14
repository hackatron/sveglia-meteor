Timers = new Meteor.Collection('timers');

var now = function() {
  var date = new Date();
  var now = date.getTime()/1000;
  return Math.floor(now)
}

var query = Timers.find()
var handle = query.observe({
  added: function(timer) {
    Meteor.call('start_timer', timer)
  }
})