#!/bin/sh

# wait-for.sh - wait for a service to be available

host="$1"
port="$2"
shift 2
cmd="$@"

while ! nc -z $host $port; do
  echo "Waiting for $host:$port..."
  sleep 1
done

echo "$host:$port is available, executing command: $cmd"
exec $cmd
