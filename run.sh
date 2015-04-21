#!/bin/sh


pkill -f 'babel-node'
pkill -f 'SimpleHTTPServer'
pkill -f 'grunt'

babel-node app/server &
grunt &
/usr/bin/python -m SimpleHTTPServer &
