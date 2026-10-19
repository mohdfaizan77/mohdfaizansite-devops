# Difference between Forward Proxy and Reverse Proxy

Source: https://www.geeksforgeeks.org/system-design/difference-between-forward-proxy-and-reverse-proxy/

Proxies act as intermediaries between clients and servers and help manage how requests and responses flow through a network. Forward proxies and reverse proxies perform different roles depending on whether they act primarily on behalf of the client or the server.
- Forward Proxy: Acts on behalf of clients to control outbound access, filter traffic, and hide the client IP from destination servers.
- Reverse Proxy: Acts on behalf of backend servers to route incoming traffic, improve scalability, and apply security or caching policies.

## Forward Proxy
A forward proxy sits between clients and external servers. When a client requests a website or another internet resource, the request passes through the forward proxy, which forwards it to the destination server on the client's behalf.
The destination server generally communicates with the proxy rather than directly with the client.

### Use Cases
- Access Control: Restricts access to specific websites or external services.
- Client IP Masking: Hides the client's IP address from the destination server, although this does not guarantee complete anonymity.
- Content Filtering: Blocks restricted or unsafe websites according to configured policies.
- Caching: Stores frequently requested content at the proxy to reduce repeated downloads and bandwidth usage.
- Monitoring and Logging: Records outbound requests for auditing, compliance, or policy enforcement.
- Controlled Access to Restricted Resources: Can route traffic through an approved network path where permitted by organizational or regional policies.
A forward proxy may be explicitly configured on the client, but transparent or intercepting forward proxies can also operate without explicit client-side proxy configuration.

## Reverse Proxy
A reverse proxy sits in front of one or more backend servers and accepts requests on their behalf. Clients send requests to the reverse proxy, which selects an appropriate backend server and forwards the request. The backend response is then returned to the client through the proxy.

### Use Cases
- Load Balancing: Distributes requests across multiple backend servers.
- Caching: Stores suitable backend responses to reduce origin load and improve response time.
- Backend Abstraction: Hides internal server addresses and architecture from external clients.
- TLS Termination: Handles HTTPS connections and can centralize certificate management.
- Request Routing: Directs requests according to hostname, URL path, headers, or other routing rules.
- Security Controls: May apply rate limiting, filtering, WAF rules, and other protections depending on configuration.

## Forward Proxy vs Reverse Proxy
Forward and reverse proxies differ mainly in whose behalf they act on and how they are positioned in the request path.
Feature	Forward Proxy	Reverse Proxy
Acts On Behalf Of	Clients	Backend servers
Position	Between clients and external servers	Between clients and backend infrastructure
Main Purpose	Access control, filtering, monitoring, and client IP masking	Request routing, load balancing, caching, and backend protection
Client Awareness	May be explicitly configured or deployed as a transparent/intercepting proxy	Client typically interacts with it as the service endpoint
Configuration	May be configured on client devices or deployed transparently in the network	Configured as part of the server-side infrastructure
Traffic Flow	Forwards outbound client requests to external servers	Forwards incoming client requests to appropriate backend servers
Caching	Caches eligible content at the forward proxy	Caches suitable backend responses at the reverse proxy
Client IP Handling	Can hide the client's IP address from the destination server	Backend connection usually comes from the proxy; original client IP may be forwarded through trusted headers
Load Balancing	Not usually its primary purpose	Commonly used to distribute requests across backend servers
Security	Can enforce outbound filtering and access policies	May provide rate limiting, request filtering, WAF integration, and other security controls
HTTPS Handling	Can tunnel encrypted HTTPS traffic or, when explicitly configured and trusted, intercept TLS	Can terminate TLS and forward requests to backend servers
