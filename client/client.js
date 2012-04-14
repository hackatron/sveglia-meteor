Meteor.startup(function() {
  Timers.find().forEach(function(timer) {
    if(timer.time_left >= 0) {
      Meteor.call('start_timer', timer)
    }
  })

  var query = Timers.find()
  var handle = query.observe({
    added: function(timer) {
      Meteor.call('start_timer', timer)
    }
  })
})

Template.timers.timers = function () {
  return Timers.find({}, {sort: {time_left: 1}});
};

Template.timer.seconds_left = function () {
  return this.time_left
}

Template.timers.events = {
  'click .submit': function () {
    var input = parseFloat($('input.expiration_date').val());
    var expires_at = input + now()
    Timers.insert({expires_at: expires_at});
  }
};