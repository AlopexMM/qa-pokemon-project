#!/bin/bash

if [[ $(docker ps | grep playwright-tests) != "" ]]
then
    docker rmi $(docker images | grep playwright-tests | awk '{print $3}')
    echo "Image deleted"
else
echo "Nothing to delete"
exit 0
fi