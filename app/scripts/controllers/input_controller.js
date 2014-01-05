App.InputController = Ember.Controller.extend({

    /**
     * An array of other controller objects available inside instances of this controller.
     *
     * @see http://emberjs.com/api/classes/Ember.Controller.html#property_needs
     */
    needs: ['location', 'error'],

    /**
     * Entry points to receive events from other components like templates or controller.
     */
    actions: {
        sendAddress: function(address) {
            this.get('controllers.error').send('resetError');
            this.get('controllers.location').send('receiveAddress', address);
        }
    }
});