#!/bin/bash

# send a job to a randomly picked queue, and repeat $1 times

let repeats=1
typeset -i NUM_OF_QUEUES=$(cat 'conf/NUM_QUEUES')

if [[ "$1" =~ ^[0-9]+$ ]] && [ "$1" -gt "1" ]; then
  repeats=$1
fi

for i in `seq 1 $repeats`
do
  let rand=$((RANDOM%NUM_OF_QUEUES+1))
  echo "Send to queue $rand"
  node compiled/client.js $rand
  echo ""
done
