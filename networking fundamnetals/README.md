# Networking Homework

## Task 1 — Networking Commands Practice

I practiced the networking commands and explored their basic usage on macOS. I also observed how some commands behave differently compared with Linux-based systems.

---

# Task 2 — Networking Commands

## 1. ping google.com

### Command

```bash
ping google.com
```

### Output

```text
PING google.com (142.250.206.110): 56 data bytes

Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
64 bytes from 142.250.206.110: icmp_seq=0 ttl=119 time=2450.605 ms
64 bytes from 142.250.206.110: icmp_seq=1 ttl=119 time=1441.284 ms
64 bytes from 142.250.206.110: icmp_seq=2 ttl=119 time=435.061 ms
64 bytes from 142.250.206.110: icmp_seq=3 ttl=119 time=106.977 ms
64 bytes from 142.250.206.110: icmp_seq=4 ttl=119 time=156.077 ms
64 bytes from 142.250.206.110: icmp_seq=5 ttl=119 time=19.805 ms
64 bytes from 142.250.206.110: icmp_seq=6 ttl=119 time=103.581 ms
64 bytes from 142.250.206.110: icmp_seq=7 ttl=119 time=121.530 ms
64 bytes from 142.250.206.110: icmp_seq=8 ttl=119 time=137.083 ms
64 bytes from 142.250.206.110: icmp_seq=9 ttl=119 time=474.976 ms
64 bytes from 142.250.206.110: icmp_seq=10 ttl=119 time=19.699 ms
64 bytes from 142.250.206.110: icmp_seq=11 ttl=119 time=302.357 ms
64 bytes from 142.250.206.110: icmp_seq=12 ttl=119 time=26.982 ms
64 bytes from 142.250.206.110: icmp_seq=13 ttl=119 time=38.916 ms

--- google.com ping statistics ---
14 packets transmitted, 14 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 19.699/416.781/2450.605/667.634 ms
```

### Explanation

The `ping` command checks network connectivity by sending ICMP packets to the specified host and measuring the response time.

---

## 2. traceroute google.com

### Command

```bash
traceroute google.com
```

### Output

```text
traceroute to google.com (142.250.206.110), 64 hops max, 40 byte packets
 1  wifi.height8tech.com (100.128.160.1)  23.621 ms  8.485 ms  8.379 ms
 2  114.79.130.29.dvois.com (114.79.130.29)  22.259 ms  27.163 ms  26.790 ms
 3  72.14.208.165 (72.14.208.165)  44.065 ms  21.572 ms  22.616 ms
 4  192.178.110.123 (192.178.110.123)  26.860 ms
     192.178.110.221 (192.178.110.221)  22.604 ms
     192.178.110.123 (192.178.110.123)  28.017 ms
 5  142.250.210.183 (142.250.210.183)  21.890 ms  35.595 ms  21.651 ms
 6  lcboma-az-in-f14.1e100.net (142.250.206.110)  96.627 ms  21.569 ms  24.935 ms
```

### Explanation

The `traceroute` command displays the path taken by network packets from the computer to the destination and shows the intermediate network hops.

---

## 3. netstat -tuln

### Command

```bash
netstat -tuln
```

### Output

```text
Active LOCAL (UNIX) domain sockets

Address  Type   Recv-Q Send-Q  Inode  Conn  Refs  Nextref Addr

f17a9f29d28c563 stream 0 0 0 83a1a11d53b8fde1 0 0
83a1a11d53b8fde1 stream 0 0 0 f17a9f29d28c563 0 0

4d8c9f38f4e3a881 stream 0 0 0 a558a6a76c1069b2 0 0
a558a6a76c1069b2 stream 0 0 0 4d8c9f38f4e3a881 0 0

...
```

### Explanation

On macOS, `netstat -tuln` produced information about local UNIX domain sockets instead of the Linux-style TCP and UDP listening socket table.

---

## 4. telnet google.com 80

### Command

```bash
telnet google.com 80
```

### Output

```text
zsh: command not found: telnet
```

### Alternative Command

Since Telnet was not available on my macOS system, I used `nc` (Netcat) to test the TCP connection:

```bash
nc -vz google.com 80
```

### Output

```text
Connection to google.com port 80 [tcp/http] succeeded!
```

### Explanation

The `nc` command successfully verified that a TCP connection could be established to Google's port 80. It provides the same basic connectivity test intended by the Telnet command.

---

## 5. sudo tcpdump -i en0 host google.com

### Command

```bash
sudo tcpdump -i en0 host google.com
```

### Output

```text
tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on en0, link-type EN10MB (Ethernet), snapshot length 524288 bytes
^C
0 packets captured
3056 packets received by filter
0 packets dropped by kernel
```

### Explanation

The `tcpdump` command captures network packets matching the specified filter. On my Mac, `en0` was used instead of `eth0` because `en0` is the active network interface.

---

## 6. nslookup google.com

### Command

```bash
nslookup google.com
```

### Output

```text
Server:         100.128.160.1
Address:        100.128.160.1#53

Non-authoritative answer:

Name:   google.com
Address: 142.250.205.206
```

### Explanation

The `nslookup` command performs a DNS lookup and displays the IP address associated with the specified domain name.

---

## 7. dig google.com

### Command

```bash
dig google.com
```

### Output

```text
; <<>> DiG 9.10.6 <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 33832
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 4, ADDITIONAL: 4

;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             251     IN      A       142.250.205.206

;; AUTHORITY SECTION:
google.com.             137432  IN      NS      ns1.google.com.
google.com.             137432  IN      NS      ns3.google.com.
google.com.             137432  IN      NS      ns2.google.com.
google.com.             137432  IN      NS      ns4.google.com.

;; ADDITIONAL SECTION:
ns1.google.com.         332536  IN      A       216.239.32.10
ns3.google.com.         325274  IN      A       216.239.36.10
ns2.google.com.         149365  IN      A       216.239.34.10
ns4.google.com.         267340  IN      A       216.239.38.10

;; Query time: 16 msec
;; SERVER: 100.128.160.1#53(100.128.160.1)
;; WHEN: Fri Sep 04 22:19:46 IST 2026
;; MSG SIZE  rcvd: 180
```

### Explanation

The `dig` command performs DNS queries and provides detailed information about the DNS response, including the returned address, name servers, DNS server, and query time.

---

## 8. curl -I https://www.google.com

### Command

```bash
curl -I https://www.google.com
```

### Output

```text
HTTP/2 200
content-type: text/html; charset=ISO-8859-1
content-security-policy-report-only: object-src 'none';base-uri 'self';script-src ...
accept-ch: Sec-CH-Prefers-Color-Scheme
p3p: CP="This is not a P3P policy! See g.co/p3phelp for more info."
date: Fri, 04 Sep 2026 16:49:53 GMT
server: gws
x-xss-protection: 0
x-frame-options: SAMEORIGIN
expires: Fri, 04 Sep 2026 16:49:53 GMT
cache-control: private
set-cookie: [REDACTED]
alt-svc: h3=":443"; ma=2592000
```

### Explanation

The `curl -I` command requests only the HTTP headers from the specified website. The `HTTP/2 200` response indicates that the request was successful.

---

## 9. arp -a

### Command

```bash
arp -a
```

### Output

```text
[ARP table output from the macOS system]
```

### Explanation

The `arp -a` command displays entries from the ARP table, showing mappings between IP addresses and hardware addresses.

---

## 10. systemctl status NetworkManager

### Command

```bash
systemctl status NetworkManager
```

### Output

```text
zsh: command not found: systemctl
```

### Explanation

The `systemctl` command is used to manage services on Linux systems that use systemd. macOS does not use systemd, so `systemctl` is not available. macOS uses `launchd` for system and service management.

---

# Conclusion

I practiced different networking commands on macOS and observed how their outputs can vary depending on the operating system and network environment. I used commands such as `ping`, `traceroute`, `netstat`, `nc`, `tcpdump`, `nslookup`, `dig`, and `curl` to explore network connectivity, routing, ports, packet capture, DNS resolution, and HTTP responses.

Some commands from the Linux-based instructions, such as `telnet`, `eth0`, and `systemctl`, were not directly available on macOS, so I used suitable alternatives where necessary.