QUnit.module('input location integration tests', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.deferReadiness();
        });
    }
});

QUnit.test('send form data and check presentation', function() {

    Ember.run(function() {
        App.advanceReadiness();
    });

    // -- prepare some dummy data

    var STATUS = 'OK';
    var ADDRESS = 'Drehbahn';
    var REQUEST = {
        'address': ADDRESS
    };
    var RESULTS = [
        {
            formatted_address: 'Drehbahn, Hamburg, Germany',
            geometry: {
                location: {
                    lat: function() { return 42.1337 },
                    lng: function() { return 23.1337 }
                }
            }
        }
    ]

    var FOURSQUARE_RESPONSE = {
        meta: { code: 200 },
        response: {
            totalResults: 23,
            groups: [
                {
                    items: [
                        {
                            venue: { id: 1337 }
                        }
                    ]
                }
            ],
            venue: {
                id: '1337',
                name: 'Villa KunterBunt',
                location: {
                    address: 'Hamburger Berg 31',
                    postalCode: '20359',
                    city: 'Hamburg',
                    country: 'Germany'
                },
                url: 'http://TBD',
                contact: {
                    formattedPhone: 'TBD'
                },
                categories: [ {name: 'kleine gemuetliche Kneipe'} ]
            }

        }
    };

    // -- mock google maps api

    var geocodeStub = sinon.stub();
    geocodeStub.yields(RESULTS, STATUS);

    var googleMapsApiGetStub = sinon.stub();
    googleMapsApiGetStub.withArgs('geocoder').returns({ geocode: geocodeStub });
    googleMapsApiGetStub.withArgs('maps').returns({ GeocoderStatus: { OK: STATUS}});

    var locationController = getLocationController();
    locationController.set('googleMapsApi', {
        get: googleMapsApiGetStub
    });

    // -- mock amplify for foursquare api call

    var amplifyRequestStub = sinon.stub();
    amplifyRequestStub.yields(FOURSQUARE_RESPONSE);

    var amplifyProxy = Ember.ObjectProxy.create({
        content: {
            request: amplifyRequestStub
        }
    });


    var restaurantController = getRestaurantController();
    restaurantController.set('amplify', amplifyProxy);

    // -- test the "input - location determination - restaurant presentation" chain

    visit('/');
    fillIn('input[type="text"]', 'Drehbahn');
    click('button[type="submit"]');
    andThen(function() {

        // -- check location determination
        equal(find('h2:contains("You are here!")').length, 1, 'the location headline is not shown');
        equal(find('p:contains("Drehbahn, Hamburg, Germany")').length, 1, 'the location is not shown');

        // -- check restaurant presentation
        equal(find('h2:contains("You eat here!")').length, 1, 'the restaurant headline is not shown');
        equal(find('p:contains("kleine gemuetliche Kneipe")').length, 1, 'category is not shown');
        equal(find('strong:contains("Villa KunterBunt")').length, 1, 'name is not shown');
    });
});