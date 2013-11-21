App.LocationFormComponent = Ember.Component.extend({
    actions: {
        submit: function(location) {
            this.sendAction('action', location);
        }
    }
});