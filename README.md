# Sveglia with Meteor

Sveglia is a simple application that lets you create timers to share with the world.

## Parts and components

### Server and client

sveglia.js defines code that runs on both the server and the client.
There are the Timers collection creation

	Timers = new Meteor.Collection('timers');
and a helper function to retrieve the current time

	var now = function() {
	  var date = new Date();
	  return Math.floor(date.getTime()/1000);
	}

### Server

The server code contains nothing :-)

### Client

##### Startup

As soon as the DOM is ready a timer starts and updates a Session variable called 'now' all the time.

	Meteor.startup(function(){
	  Meteor.setInterval(function() {
	    Session.set('now', now());
	  }, 0);
	})
	
##### Template variables and event handling

The first function returns the list of timers ordered by the expires_at attribute and assigns it to a certain template variable.

	Template.timers.timers = function () {
	  return Timers.find({}, {sort: {expires_at: -1}});
	};

The interesting thing is that this order is preserved when a new Timer is inserted into the collection because queries in Meteor are 'reactive' and you don't need any callback to update the DOM.
	
The other template variable is seconds_left.

	Template.timer.seconds_left = function () {
	  var seconds_left = this.expires_at - Session.get('now');
	  if(seconds_left > 0) {
	    return seconds_left
	  }
	  else {
	    return 0
	  }
	}

This function takes care of updating the template variable with the time left before the timer expiration date. Since the Session variable 'now' is reactive, every time it updates it also 'calls' again this function and therefore it updates the seconds_left.

Finally the last function handles the click event on the button. It simply inserts a new Timer in the collection with the specified expiration date.