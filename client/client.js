Meteor.startup(function(){
  Meteor.setInterval(function() {
    Session.set('now', now());
  }, 0);
})

Template.timers.timers = function () {
  return Timers.find({}, {sort: {expires_at: -1}});
};

Template.timer.seconds_left = function () {
  var seconds_left = this.expires_at - Session.get('now');
  if(seconds_left > 0) {
    return seconds_left
  }
  else {
    return 0
  }
}

Template.timers.events = {
  'click .submit': function () {
    var input = parseFloat($('input.expires_at').val());
    var name = $('input.name').val()
    var expires_at = input + now();
    Timers.insert({expires_at: expires_at, name: name});
  }
};