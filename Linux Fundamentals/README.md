# Linux Fundamentals

This section contains the tasks and commands covered as part of my Linux fundamentals practice.

---

## Task 1: Soft Links and Hard Links

### Soft Link (Symbolic Link)

A soft link, also called a symbolic link, acts as a reference to another file or directory. It has its own inode and stores the path of the target.

**Creating a soft link:**

```bash
ln -s original.txt softlink.txt
```

**Removing a soft link:**

```bash
rm softlink.txt
```

### Hard Link

A hard link is an additional reference to the same underlying file data. The original file and the hard link share the same inode.

**Creating a hard link:**

```bash
ln original.txt hardlink.txt
```

**Removing a hard link:**

```bash
rm hardlink.txt
```

### Soft Link vs Hard Link

| Soft Link                                | Hard Link                                              |
| ---------------------------------------- | ------------------------------------------------------ |
| Uses a separate inode                    | Shares the inode with the original                     |
| Stores a reference to the target path    | Directly references the same file data                 |
| Becomes invalid if the target is removed | Continues to work even if the original name is removed |
| Can generally point to directories       | Generally created for files                            |

---

## Task 2: `adduser` and `useradd`

### `adduser`

`adduser` is a more user-friendly, interactive utility for creating users. It is commonly used on Ubuntu-based systems.

```bash
sudo adduser username
```

It guides the user through the account creation process and handles several default settings automatically.

### `useradd`

`useradd` is a lower-level command that allows more manual control over how a new user account is configured.

```bash
sudo useradd username
```

### Which One to Use on Ubuntu?

For normal interactive user creation, `adduser` is generally more convenient because it provides prompts and takes care of common account setup automatically.

### Creating and Checking a Test User

I created a test account using:

```bash
sudo adduser devopstest
```

The account can then be checked using:

```bash
id devopstest
getent passwd devopstest
```

These commands can be used to confirm that the user account exists and retrieve its account information.

---

## Task 3: Working with `journalctl`

`journalctl` is a command-line utility used to access and inspect logs maintained by the systemd journal.

### Check the Installed Version

```bash
journalctl --version
```

### Display the Latest 20 Log Entries

```bash
journalctl -n 20
```

### Display Logs from the Current Boot

```bash
journalctl -b -n 20
```

### Check Logs for a Particular Service

```bash
sudo journalctl -u systemd-journald.service -n 20
```

### Display Logs from the Previous Hour

```bash
journalctl --since "1 hour ago"
```

### Display Error-Level Messages

```bash
journalctl -p err -n 20
```

These options make it easier to filter system logs and troubleshoot services or other system-level issues.

---

## Task 4: Linux Networking Command Cheat Sheet

### Viewing IP Information

```bash
ip addr
ip addr show
```

These commands display the IP addresses and related information associated with network interfaces.

### Checking Network Interfaces

```bash
ip link
ip -s link
```

`ip link` displays available network interfaces, while `ip -s link` also provides interface statistics.

### Checking the Routing Table

```bash
ip route
ip route get 8.8.8.8
```

The first command displays the system's routing table. The second can be used to determine which route would be selected for a particular destination.

### Multicast Information

```bash
ip maddr
```

Displays multicast addresses associated with the network interfaces.

### Neighbor / ARP Information

```bash
ip neigh
```

Shows the system's neighbor table, including ARP-related information.

### Getting Command Help

```bash
ip help
ip addr help
ip link help
ip neigh help
```

These commands provide help for the `ip` utility and its different subcommands.

### Viewing Socket Information

```bash
ss -a
ss -n
ss -p
```

`ss` is used to inspect active sockets and network connections.

### Additional Networking Utilities

```bash
arping
ethtool
```

`arping` can be used to send ARP requests and test connectivity at the ARP level.

`ethtool` provides information about network interfaces and can also be used to configure certain interface settings.

### Common `net-tools` Alternatives

| Older Command        | Modern Alternative      |
| -------------------- | ----------------------- |
| `ifconfig -a`        | `ip addr`               |
| `ifconfig eth0 up`   | `ip link set eth0 up`   |
| `ifconfig eth0 down` | `ip link set eth0 down` |
| `route`              | `ip route`              |
| `arp -a`             | `ip neigh`              |
| `netstat`            | `ss`                    |
| `netstat -g`         | `ip maddr`              |

---

## Conclusion

Through these tasks, I practiced some of the basic Linux concepts and commands, including:

* Creating and managing soft and hard links
* Creating and verifying Linux users
* Working with systemd logs using `journalctl`
* Inspecting network interfaces, IP addresses, routes, and sockets
* Understanding modern alternatives to older networking commands
