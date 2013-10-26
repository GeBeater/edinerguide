edinerguide
===========

A web based decision aid to find a restaurant close by a given location.

## Contribution

In order to ease the life of developers and prevent that the local machine
looks like a rubbish tip a Vagrantfile has beend added.

Using Vagrant to create a virtual development environment is quite simple by follow these steps:

1. Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
2. Install [Vagrant](http://downloads.vagrantup.com/)
3. Install [Vagrant-Berkshelf Plugin](https://github.com/riotgames/vagrant-berkshelf)
4. Install [Chef](http://www.opscode.com/chef/install/) (optional)

The setup is tested on an Ubuntu 12.04 LTS host system with the packages listed below:

* vagrant_1.3.5_x86_64.deb
* chef_11.6.2-1.ubuntu.12.04_amd64.deb
* virtualbox-4.3_4.3.0-89960~Ubuntu~precise_amd64.deb

## Application structure

The primary application- respectively project structure is created with [YEOMAN](http://yeoman.io/)
generator for ember Version 0.7.1 [generator-ember](https://github.com/yeoman/generator-ember).