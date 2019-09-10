cd ~/Dropbox/Site/repo
dpkg-scanpackages -m ./ /dev/null | bzip2 -9c >packages_private.bz2
dpkg-scanpackages -m deb_public /dev/null | bzip2 -9c >packages_public.bz2
