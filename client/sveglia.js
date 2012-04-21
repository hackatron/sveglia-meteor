Meteor.startup(function(){
  Meteor.setInterval(function() {
    Session.set('now', new Date());
  }, 500);
})

var time_component = function (component, name) {
  return component + ' ' + (component > 1 ? name + 's' : name);
}

var to_time = function(time_in_milliseconds) {
  var t = Math.floor(time_in_milliseconds/1000);
  return [[60, "second"], [60, "minute"], [24, "hour"], [365, "day"], [1000, "year"]].map(function(part) {
    q = t % part[0];
    t = Math.floor(t/part[0]);
    return time_component(q, part[1]);
  }).reverse().join(', ');
}

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

Template.timer_templates.timer_templates = function () {
  return TimerTemplates.find({});
};

Template.timer_templates.parsed_date = function () {
  var parsed_date = Session.get('now') && Date.parse(Session.get('input_date_duration'));

  if(parsed_date !== null && parsed_date !== undefined) {
    return parsed_date
  }
  else {
    return Session.get('now')
  }
}

Template.timer_templates.events = {
  'click input.submit': function () {
    var duration = Date.parse(Session.get('input_date_duration')).getTime();
    var name = $('#timer_template_form input#name').val()
    TimerTemplates.insert({duration: duration, name: name});
  },

  'keyup input#date': function () {
    Session.set('input_date_duration', $('#timer_template_form input#date').val())
  }
};