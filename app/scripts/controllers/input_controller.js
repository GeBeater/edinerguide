App.InputController = Ember.Controller.extend({

    latitude: null,
    longitude: null,

    needs: ['location'],
    actions: {
        sendAddress: function(address) {
            this.get('controllers.location').send('receiveAddress', address);
        },
        detectLocation: function() {
            // TODO implementation
            // this.get('controllers.location').send('detectLocation');
        }
    }
});