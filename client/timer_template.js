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