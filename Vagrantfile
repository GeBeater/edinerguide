# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Enable or disable berkshelf vagrant plugin.
  config.berkshelf.enabled = true

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "debian-7.3.0-amd64"

  # Bootstrap virtual environment
  config.vm.provision :shell, :path => "shell-scripts/bootstrap-virtual-env.sh"

  # The url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system.
  config.vm.box_url = "http://vagrantboxes.gebeat.info/debian-7.3.0-amd64.box"

  # Define a forwarded port to allow access from the host machine to
  # the web-server running on the guest machine.
  config.vm.network "forwarded_port", guest: 9000, host: 9000
  config.vm.network "forwarded_port", guest: 35729, host: 35729

  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  config.vm.provision :chef_solo do |chef|
    chef.log_level = :debug

    chef.add_recipe "apt::default"

    chef.add_recipe "nodejs::install_from_binary"
    chef.add_recipe "nodejs::npm"
    chef.add_recipe "phantomjs"

    # You may also specify custom JSON attributes:
    chef.json = {
    }
  end

end
