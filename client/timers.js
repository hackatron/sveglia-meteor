Template.timers.timers = function () {
  return Timers.find({}, {sort: {expires_at: -1}});
};

Template.timer.expires_in = function () {
  var expires_in = (this.expires_at - Session.get('now').getTime());

  if(expires_in > 0) {
    return to_time(expires_in);
  }
  else {
    return 0
  }
}

Template.timers.parsed_date = function () {
  var parsed_date = Session.get('now') && Date.parse(Session.get('input_date'));

  if(parsed_date !== null && parsed_date !== undefined) {
    return parsed_date
  }
  else {
    return Session.get('now')
  }
}

Template.timers.events = {
  'click input.submit': function () {
    var expires_at = Date.parse(Session.get('input_date')).getTime();
    var name = $('input#name').val()
    Timers.insert({expires_at: expires_at, name: name});
  },

  'keyup input#date': function () {
    Session.set('input_date', $('input#date').val())
  }
};