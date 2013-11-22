App.LocationFormComponent = Ember.Component.extend({
    // TODO
    // see http://emberjs.com/guides/controllers/#toc_storing-application-properties
    // maybe it is better to change to route and does not nest all templates (templates inside template)
    actions: {
        submit: function(location) {
            this.sendAction('action', location);
        }
    }
});