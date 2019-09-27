#!/bin/bash
URL='https://itunes.apple.com/search?term=Downgrooves&limit=100'
PATH='/var/www/downgrooves.com/public_html/assets/'
FILENAME='itunes.json'
cd $PATH
/usr/bin/sudo /usr/bin/wget -O $FILENAME $URL
