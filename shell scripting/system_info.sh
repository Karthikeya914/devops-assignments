
#!/bin/bash

date_now=$(date)
machine_name=$(hostname)
logged_user=$(whoami)

echo "Date and Time: $date_now"
echo "Machine Name: $machine_name"
echo "Logged-in User: $logged_user"

echo "Disk Space Information:"
df -h

echo "Current Processes:"
ps

read -p "What is your name? " name
echo "Welcome, $name!"

mkdir -p system_info

ps > system_info/processes.txt

echo "Process details have been stored in system_info/processes.txt"

