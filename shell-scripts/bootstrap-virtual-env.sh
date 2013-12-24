#!/usr/bin/env bash

sudo apt-get -q -y install libpng12-dev libfreetype6-dev libpng++-dev pngquant

sudo gem install compass

sudo ldconfig

echo 'export PATH="/vagrant/node_modules/.bin:$PATH"' >> /home/vagrant/.bashrc && source /home/vagrant/.bashrc

sudo su

echo 'export PATH="/vagrant/node_modules/.bin:$PATH"' >> /root/.bash_profile && source /root/.bash_profile

exit
