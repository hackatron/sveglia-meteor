Template.timer_templates.timer_templates = function () {
  return TimerTemplates.find({});
};

Template.timer_template.parsed_duration = function () {
  return to_time(this.duration)
}

Template.timer_templates.events = {
  'click input.create-template-timer': function () {
    //console.log(Session.get('input_date_duration'));

    var duration = Date.parse(Session.get('input_date_duration')).getTimeRounded();
    var name = $('#timer_template_form input#name').val()
    TimerTemplates.insert({duration: duration - (new Date()).getTimeRounded(), name: name});
  },

  'click input.create-timer': function (event) {
    var template = TimerTemplates.findOne($(event.target).attr('id'))
    var expires_at = template.duration + (new Date()).getTimeRounded();
    Timers.insert({expires_at: expires_at, name: template.name});
  },

  'keyup input#date': function () {
    Session.set('input_date_duration', $('#timer_template_form input#date').val())
  }
};