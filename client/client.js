Meteor.startup(function(){
  Meteor.setInterval(function() {
    Session.set('now', Date.now().getTime());
  }, 100);
})

Template.timers.timers = function () {
  return Timers.find({}, {sort: {expires_at: -1}});
};

Template.timer.expires_in = function () {
  var expires_in = (this.expires_at - Session.get('now'));

  if(expires_in > 0) {
    return to_string(expires_in);
  }
  else {
    return 0
  }
}

Template.timers.parsed_date = function () {
  var parsed_date = Session.get('parsed_date');

  if(parsed_date !== null && parsed_date !== undefined) {
    return parsed_date
  }
  else {
    return Date.now()
  }
}

Template.timers.events = {
  'click input.submit': function () {
    var expires_at = Session.get('parsed_date').getTime();
    console.log(expires_at)
    var name = $('input#name').val()
    Timers.insert({expires_at: expires_at, name: name});
  },

  'keyup input#date': function () {
    Session.set('parsed_date', Date.parse($('input#date').val()))
  }
};