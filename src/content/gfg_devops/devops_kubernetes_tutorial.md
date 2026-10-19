# Kubernetes Tutorial

Source: https://www.geeksforgeeks.org/devops/kubernetes-tutorial/

Kubernetes is an open-source container management platform
- Automates the deployment, management, and scaling of container-based applications.
- Developed at Google in 2014, Kubernetes draws on Google’s production experience and is now maintained by the Cloud Native Computing Foundation.
- It orchestrates containers grouping them into logical units called pods and managing their lifecycle across a cluster of machines.
- It automatically restarts failed containers, replaces them when necessary, and reschedules workloads onto healthy nodes to maintain the desired state.

## Basics of Kubernetes
Kubernetes is like a ship captain for containers, organizing and placing them on multiple computers (like a ship carrying many containers). This introduction will explain key Kubernetes ideas like Pods, Services, and Deployments.
- Introduction to Kubernetes
- Architecture
- Installation Methods
- Installation of Kubernetes on Ubuntu

### Objects
- Concept of Containers
- Introduction to Container Orchestration
- Images
- Jobs
- Labels & Selectors
- Pod
- Namespace
- Node
- Run a Command in Pod's Containers
- Create Multiple Container in a Pod
- Replication Controller
- Difference Between Replicaset and Replication Controller
- Deployments
- Replicaset

### Scheduling
- Manual Scheduling
- Taints And Tolerations
- Node Affinity

### Services & Networking
- Node Port Service
- Cluster IP vs Node-Port
- Service
- Service DNS
- Network Policies

### Storage & Security
- Volumes
- Secrets
- Working with Secrets
- How to set up a Kubernetes cluster on a local machine using minikube
- Physical Servers vs Virtual Machines vs Containers

### Working with Kubectl
- Kubectl
- Kubectl Commands
- Kubectl Delete
- Kubectl Create and Kubectl Apply

### Load Balancing & Configurations
- Load Balancing Service
- ConfigMap
- Create Config Map From Files
- Create ConfigMap from YAML
- ConfigMap from Directories
- Injecting ConfigMap as Files
- Injecting ConfigMap in Pods
- Kubernetes Resource Model (KRM) and How to Make Use of YAML?

## Advanced Kubernetes
In this Advanced Kubernetes section we will understand how to manage complex containerized applications.
- API
- Deployment Strategies
- Static Pods
- Container Patterns
- Probing
- Statefulsets
- Resource Quotas

## Real-World Use Cases & Projects
- Deploying Application Using Kubernetes
- Installing Private Git Server on K8s Cluster with Gitea and AKS
- Enable Remote Debugging For Java Application Deployed in Kubernetes Environment
