#!/bin/bash
SOURCE_DIRECTORY=`dirname "$0"`
AWS_DEFAULT_PROFILE=softcraft
COMMAND=$1
if [ -z "$COMMAND" ]; then
  COMMAND=update-stack
fi
shift

STACK_NAME=lift-timer

aws cloudformation $COMMAND --stack-name $STACK_NAME --template-body file://$SOURCE_DIRECTORY/timer-stack.json --parameters $@
