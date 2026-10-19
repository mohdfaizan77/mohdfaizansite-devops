# Kubernetes - Architecture

Source: https://www.geeksforgeeks.org/devops/kubernetes-architecture/

Kubernetes follows a client–server architecture consisting of a control plane (master) and worker nodes. The control plane includes components such as the API Server, Scheduler, Controller Manager, and etcd for cluster state storage.
Kubernetes follows a control plane and worker node architecture. The components work together to manage and run containerized applications.
- kubectl: The command-line tool used to interact with a Kubernetes cluster. Users send commands such as creating, updating, or inspecting resources through kubectl.
- API Server: The central communication point of the Kubernetes cluster. It receives requests from kubectl and other clients, validates them, and communicates with other Kubernetes components.
- Control Plane: Manages the overall state of the cluster. It decides where workloads should run, monitors resources, and ensures that the desired state is maintained.
- Worker Node: Provides the computing resources required to run applications. It contains components such as the kubelet, container runtime, and networking components.
- Pod: The smallest deployable unit in Kubernetes. Pods run one or more containers that contain the application workload.

## Flow
- The user sends a command using kubectl.
- The request is sent to the API Server.
- The Control Plane processes the request and determines the required action.
- The workload is assigned to a suitable Worker Node.
- The Worker Node creates and manages the required Pod.
- The Pod runs the application containers.
Worker nodes run application workloads and include kubelet for communication with the control plane, kube-proxy for networking, and a container runtime (such as containerd or Docker) to manage containers.

## Control Plane Components
It is basically a collection of various components that help us in managing the overall health of a cluster. For example, if you want to set up new pods, destroy pods, scale pods, etc. The components of Control Plane are:

### 1. Kube-API server
The API server is a component of the Kubernetes control plane that exposes the Kubernetes API. It is like an initial gateway to the cluster that listens to updates or queries via CLI like Kubectl.
- Kubectl communicates with API Server to inform what needs to be done like creating pods or deleting pods etc. It also works as a gatekeeper.
- It generally validates requests received and then forwards them to other processes.
- No request can be directly passed to the cluster, it has to be passed through the API Server.

### 2. Kube-Scheduler
- Watches for newly created Pods that have no assigned node.
- Selects the best Worker Node for a Pod based on resource requirements, policy constraints, and hardware/software limits.

### 3. Kube-Controller-Manager
- Runs various controllers that continuously monitor the cluster and maintain the desired state.
- Node Controller: Monitors node health and responds when a node becomes unavailable.
- Deployment Controller: Manages Deployments and ensures the required application state is maintained.
- ReplicaSet Controller: Ensures the desired number of Pod replicas are running.
- Job Controller: Manages Pods created for Jobs and ensures they complete successfully.

### 4. etcd
- A consistent, high-availability key-value store.
- Stores all cluster data (the "Source of Truth"). If it isn't in etcd, it doesn't exist in Kubernetes.

### 5. Cloud-Controller-Manager
- Integrates Kubernetes with cloud provider APIs such as AWS, Azure, and Google Cloud.
- Manages cloud-specific resources such as nodes, load balancers, and routes.
- Separates cloud-specific functionality from the core Kubernetes control plane.
- Mainly used when Kubernetes runs on a cloud platform.

## Worker Node Components
These are the nodes where the actual work happens. Each Node can have multiple pods and pods have containers running inside them. There are 3 processes in every Node that are used to Schedule and manage those pods. The following are the some of the components related to Node:

### 1. Container runtime
- The software responsible for actually running the containers (e.g., containerd, CRI-O).
- It pulls images from a registry and starts/stops the containers.

### 2. kubelet
- An agent that runs on each node in the cluster.
- Ensures that containers are running in a Pod by following instructions (PodSpecs) from the Control Plane.
- Reports the health and status of the node back to the API server.

### 3. kube-proxy
- A network proxy that maintains network rules on nodes.
- Allows network communication to your Pods from inside or outside of the cluster.
- Handles service discovery and load balancing.

## Kubernetes Add-ons
Kubernetes add-ons extend a cluster with additional functionality such as DNS, networking, monitoring, and virtualization.
- CoreDNS: Provides DNS-based service discovery and name resolution within the cluster.
- Calico: Provides networking and network policy capabilities.
- KubeVirt: Allows virtual machines to run alongside containerized workloads and be managed using Kubernetes.
- Metrics Server: Collects resource usage metrics from nodes and Pods, which can be used by features such as Horizontal Pod Autoscaling.

## Commands for Kubectl
Here are some common kubectl commands for interacting with a Kubernetes cluster:
Check Cluster Information:

```
kubectl cluster-info
```
List Namespaces:

```
kubectl get namespaces
```
List Pods:

```
kubectl get pods
```

#### List Nodes:

```
kubectl get nodes
```
List Pods Across All Namespaces:

```
kubectl get pods -A
```
Get Detailed Information About a Node:

```
kubectl describe node <node-name>
```
List Services:

```
kubectl get services
```
