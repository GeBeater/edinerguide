edinerguide
===========

A web based decision aid to find a restaurant close by a given location.

## Contribution

In order to ease the life of developers and prevent that the local machine looks like a rubbish
tip a Vagrantfile has beend added.

Using Vagrant to create a virtual development environment is quite simple by follow these steps:

1. Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
2. Install [Vagrant](http://downloads.vagrantup.com/)
3. Install [Vagrant-Berkshelf Plugin](https://github.com/riotgames/vagrant-berkshelf)
4. Install [Chef](http://www.opscode.com/chef/install/) (optional)

#### Approved systems and package compounds

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

#### Preparation of the virtual environment

```bash
cd /tmp
git clone git@github.com:GeBeater/edinerguide.git
cd edinerguide
vagrant up

vagrant ssh
cd /vagrant
npm install
export PATH="./node_modules/.bin:$PATH"
sudo apt-get install git # WORKAROUND
bower install
sudo apt-get install ruby1.9.1-full # WORKAROUND
sudo gem install compass # TODO find a other solution
sudo ldconfig # TODO remove after WORKAROUND AND TODOS solved
grunt server
```

Now you can open [http://192.168.0.42:9000/](http://192.168.0.42:9000/) in your local browser. All
modifications on the application source code will be taken in realtime without manual browser refreshing.


## Application structure

The primary application- respectively project structure is created with [YEOMAN](http://yeoman.io/)
generator for ember Version 0.7.1 [generator-ember](https://github.com/yeoman/generator-ember).



## Miscellaneous remarks

[Markdown-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

