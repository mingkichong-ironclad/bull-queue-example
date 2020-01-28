#!/bin/bash

# send a job to a randomly picked queue, and repeat $1 times

let repeats=1
let NUM_OF_QUEUES=3

if [[ "$1" =~ ^[0-9]+$ ]] && [ "$1" -gt "1" ]; then
  repeats=$1
fi

for i in `seq 1 $repeats`
do
  let rand=$((RANDOM%NUM_OF_QUEUES+1))
  echo "Send to queue $rand"
  curl -L http://localhost:3000/jobs/$rand
  echo ""
done
