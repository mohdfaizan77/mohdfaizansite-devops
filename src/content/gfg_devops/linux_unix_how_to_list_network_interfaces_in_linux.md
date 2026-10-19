# How to List Network Interfaces in Linux?

Source: https://www.geeksforgeeks.org/linux-unix/how-to-list-network-interfaces-in-linux/

Below we have listed all 10 methods through which we can list network interfaces on Linux OS. You might need to list your interfaces for several common reasons:
- Troubleshooting: To check if an interface is "UP" (active) or "DOWN" (inactive).
- Finding your IP: To find your system's IP address, subnet mask, or MAC address.
- Configuration: To identify the correct interface name (e.g., eth0, wlan0, enp3s0) before configuring it.
- Hardware Check: To see if Linux has successfully recognized your network hardware (like a new Wi-Fi card).

### Using ip command to list network interfaces in Linux
In this method, you can use the "ip" command to list network interfaces in Linux. Open a terminal and type the following command:

```
ip addr
```
Breakdown of the Command:
- ip: The main command, part of the iproute2 suite.
- addr: The subcommand that specifically deals with addresses and interfaces.
This output shows all interfaces. You will typically see:
- lo (Loopback): A virtual interface used for the system to talk to itself (at 127.0.0.1).
- eth0 or enp3s0 (Ethernet): A wired network card.
- wlan0 or wlp2s0 (Wireless LAN): A Wi-Fi card.
Look for state UP to see which are active and inet to find the IPv4 address.

### Using nmcli to list network interfaces in Linux
If your system uses NetworkManager (common in Ubuntu, Fedora, and other desktops), the nmcli tool provides a clean summary.

```
nmcli device status
```
This command provides an overview of network interfaces managed by NetworkManager, including details such as device type, state, connection status, and associated IP addresses.

### Using netstat to list network interfaces in Linux
In this method, the "netstat" command with the "-i" option can be used to list network interfaces in Linux. Execute the following command in the terminal:

```
netstat -i
```
This command displays a table of network interfaces along with their respective transmission and reception statistics, such as bytes and packets.

### Using ifconfig command to list network interfaces in Linux
If you are on an older system or ip is not available, ifconfig is the classic command. (Note: It is considered deprecated and may not be installed by default).

```
ifconfig
```
This command displays a detailed output that includes information about all active network interfaces, such as the interface name, hardware address, IP address, and other configuration details.

### Printing /pr oc/net/dev file to list network interfaces in Linux
In this method, you can print the contents of the "/proc/net/dev" file to list network interfaces in Linux. Execute the following command in the terminal:

```
cat /proc/net/dev
```
This command displays a detailed table of network interfaces along with statistics like received and transmitted bytes and packets. The "/proc/net/dev" file is a virtual file that provides kernel-level information about network devices.

### Listing /sys/class/net/ directory to list network interfaces in Linux
In this method, you can list network interfaces in Linux by examining the contents of the "/sys/class/net/" directory. Execute the following command in the terminal:

```
ls /sys/class/net/
```
This command provides a simple list of network interface names present in the "/sys/class/net/" directory. Each entry corresponds to a network interface, such as Ethernet or wireless devices.

### Using hwinfo command to list network interfaces in Linux
In this method, the "hwinfo" command with the "--short" and "--network" options are used to list network interfaces in Linux. Execute the following command in the terminal:

```
sudo hwinfo --short --network
```
This command provides a summary of hardware information related to network devices. By using "hwinfo," users can obtain detailed information about their network interfaces, including the interface names, driver details, and configuration.

### Using lshw command to list network interfaces in Linux
If you want to check the physical hardware (e.g., "Did Linux see my new network card?"), you should check the hardware and PCI buses.

```
sudo lshw -class network -short
```
This command provides a summary of network-related hardware information, including network interface names, descriptions, and driver information. The use of "sudo" may be required to ensure sufficient privileges for accessing hardware information.

### Using iwconfig to list network interfaces in Linux
In this method, the "iwconfig" command is used to list wireless network interfaces in Linux. Execute the following command in the terminal:

```
iwconfig
```
This command specifically focuses on wireless interfaces and provides information about their configuration, including details like the interface name, the ESSID (Extended Service Set Identifier), access point MAC address, signal strength, and more.

### Using lspci command to list network interfaces in Linux
In this method, the "lspci" command with the pipe and "egrep" combination is used to list network-related devices in Linux. Execute the following command in the terminal:

```
lspci | egrep -i 'network|ethernet|wireless|wi-fi'
```
This command filters the output of "lspci" to display only the lines containing keywords such as 'network,' 'ethernet,' 'wireless,' or 'wi-fi.' The result is a concise list of PCI devices related to networking, making it easier to identify network interfaces and associated hardware on the system.

### How Network Interfaces are Named
When you run these commands, you'll see names like lo, eth0, or enp3s0. Here’s what they generally mean:
- lo (Loopback): This is a virtual interface. It's always present and is used by the system to communicate with itself (IP address 127.0.0.1).
- eth0, eth1 (Ethernet): This is the classic naming scheme for wired Ethernet cards.
- wlan0, wlan1 (Wireless LAN): The classic naming scheme for Wi-Fi cards.
- enp3s0, wlp2s0 (Predictable Names): Newer systems use a "Predictable Network Interface Naming" scheme. These names (like enp3s0) look complex but are designed to be stable, so the name doesn't change if you add or remove other hardware.

## Command Comparison
Command	Primary Use Case	Notes
ip addr	Modern, all-purpose. Checking IPs, state, and names.	Recommended. Replaces ifconfig.
nmcli	Easy-to-read summary on desktop/server systems.	Requires NetworkManager to be running.
ifconfig	Legacy method for checking IPs and state.	Deprecated. Not installed by default on many new systems.
lshw / lspci	Checking physical hardware and drivers.	Requires sudo for full details.
cat /proc/net/dev	Viewing low-level kernel stats (packets, errors).	Good for scripting or deep monitoring.
netstat -i	Similar to cat /proc/net/dev. Shows kernel stats.	Part of the older net-tools package.
iwconfig	Getting wireless-specific info (Signal, ESSID).	Only works for Wi-Fi/wireless interfaces.
