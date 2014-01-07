edinerguide
===========

A web based decision aid to find a restaurant close by a given location.

![CODESHIP status](https://www.codeship.io/projects/ea774840-2784-0131-e141-3a7953958826/status)

[![Coverage Status](https://coveralls.io/repos/GeBeater/edinerguide/badge.png)](https://coveralls.io/r/GeBeater/edinerguide)
[![Dependency Status](https://www.versioneye.com/user/projects/52c9c3e7ec1375d831000095/badge.png)](https://www.versioneye.com/user/projects/52c9c3e7ec1375d831000095)

## Contribution

### Virtual Development Environment

In order to ease the life of developers and prevent that the local machine looks like a rubbish
tip a Vagrantfile has beend added.

Using Vagrant to create a virtual development environment is quite simple by follow these steps:

1. Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
2. Install [Vagrant](http://downloads.vagrantup.com/)
3. Install [Vagrant-Berkshelf Plugin](https://github.com/riotgames/vagrant-berkshelf)
4. Install [Chef](http://www.opscode.com/chef/install/)

#### Approved OS Versions and Package Compounds

The virtual environment setup are tested on the systems listed below. All
packages are downloaded from the source and not installed via system package manager.

| Operation System | Package                                             |
| ---------------- | --------------------------------------------------- |
| Ubuntu 12.04 LTS | virtualbox-4.3_4.3.0-89960~Ubuntu~precise_amd64.deb |
|                  | vagrant_1.3.5_x86_64.deb                            |
|                  | chef_11.6.2-1.ubuntu.12.04_amd64.deb                |
| Ubuntu 12.10     | virtualbox-4.3_4.3.2-90405~Ubuntu~quantal_amd64.deb |
|                  | vagrant_1.3.5_x86_64.deb                            |
|                  | chef_11.8.0-1.ubuntu.12.04_amd64.deb                |

#### Preparation of the Virtual Environment

```bash
cd /tmp
git clone git@github.com:GeBeater/edinerguide.git
cd edinerguide
vagrant up
vagrant ssh
cd /vagrant
npm install
bower install
grunt server
```

The application should now be accessible from the guest machine with a browser via
[http://localhost:9000/](http://localhost:9000/). All changes on the application source
code will be taken in soon without manual browser refreshing.

## Application Architecture

### Scaffold

The application based on [ember.js](http://emberjs.com/). The scaffold was created with
[YEOMAN](http://yeoman.io/) using [generator-ember](https://github.com/yeoman/generator-ember)
v 0.7.1.

### Third Party APIs or Libraries

The application uses the [foursquare API](https://developer.foursquare.com/) to search restaurants
in a circuit of given coordinates. Latter are determined via
[Google Maps JavaScript API v3](https://developers.google.com/maps/documentation/javascript/)
which also used to provide a complete human-readable location. The HTML5
[Geolocation API](http://dev.w3.org/geo/api/spec-source.html) to detect the users location coming soon.

## Continuous Integration and Deployment

[Codeship](https://www.codeship.io/) is used for continuous integration and deployment which
execute the tests run and the creation of the build package via [grunt](http://gruntjs.com/)
the used as task runner. The creation of a tagged version is realised by a [shell script](shell-scripts/codeship-deployment.sh)
which also uses [GitHub Release API](http://developer.github.com/v3/repos/releases/) to archive
the software. This script also deploy the software to a [GitHub Page](http://pages.github.com/)
and sync the master branch with the current, deployed software.

## Tests

[Karma](http://karma-runner.github.io/) is used as a test runner which placed into the grunt
task runner. [QUnit](http://qunitjs.com/) is the testing framework for the unit as well as
integration tests. [Sinon.JS](http://sinonjs.org/) is used to create spies, stubs and mocks.

```bash
cd /tmp
git clone git@github.com:GeBeater/edinerguide.git
cd edinerguide
vagrant up
vagrant ssh
cd /vagrant
npm install
bower install
grunt test
```

## License

MIT License

