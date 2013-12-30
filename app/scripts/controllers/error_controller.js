App.ErrorController = Ember.Controller.extend({

    /**
     * Used to toggle the error (template) visibility.
     */
    isEmpty: true,

    error: null,

    actions: {
        receiveError: function(error) {
            this.set('error', error);
            this.set('isEmpty', false);
        },
        resetError: function() {
            this.set('error', null);
            this.set('isEmpty', true);
        }
    }
});