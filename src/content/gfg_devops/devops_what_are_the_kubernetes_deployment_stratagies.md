# Kubernetes Deployment Stratagies

Source: https://www.geeksforgeeks.org/devops/what-are-the-kubernetes-deployment-stratagies/

Deployment strategies in Kubernetes help update applications safely while minimizing downtime and reducing risk.
By using deployment strategies, teams can ensure smooth updates, reduce production errors, and improve overall application reliability.

## Deployment Strategies In Kubernetes
There are different approaches through which we can manage our containerized applications. These different deployment strategies allow us to roll out the updates to the applications with minimal downtime. The following are the some of the popularly known kubernetes Deployment Strategies:
- Recreate Deployment Strategy
- Rolling Update Deployment Strategy
- Blue Green Deployment Strategy
- Canary Deployment Strategy
- A/B Testing Deployment Strategy
- Shadow Deployment Strategy

## Recreate Deployment Strategy
- Complete Replacement: Terminates all existing pods of the old version simultaneously before starting any pods of the new version.
- Service Downtime: Guaranteed period of downtime occurs between the deletion of old instances and the readiness of new ones, as no pods are available to serve traffic.
- State Consistency: Ideal for applications that do not support multiple versions running at once or require exclusive access to a database or persistent volume.
- Simplicity: The most straightforward strategy to manage, as it avoids the complexity of backward compatibility or traffic splitting between different versions.
- The following YAML can be used to implement this kind of deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app-container
        image: my-image:latest
```

## Rolling Update Deployment Strategy
- Phased Replacement: Gradually replaces old pods with new ones in small batches, ensuring a minimum number of instances are always available to serve traffic.
- Zero Downtime: By keeping the service active throughout the transition, it maintains continuous availability and avoids the "blackout" period seen in Recreate deployments.
- Version Coexistence: During the update window, both the old and new versions run simultaneously, requiring the application to be backward compatible with databases and APIs.
- Resource Efficient: Updates occur within the existing infrastructure capacity (or with a small temporary "surge"), making it more cost-effective than Blue/Green deployments.
- The following YAML can be used to implement this kind of deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app-container
        image: my-image:latest
```

## Blue-Green Deployment Strategy
- Identical Environments: Maintains two full-scale production environments; one serves live traffic (Blue) while the other hosts the new version (Green).
- Atomic Switch: Traffic is flipped 100% from Blue to Green at the load balancer level, resulting in near-zero downtime.
- Instant Recovery: If an issue is found after the switch, traffic is immediately routed back to the still-running Blue environment.
- Infrastructure Overhead: More expensive than other methods because it requires doubling the server resources during the transition.
- The following YAML can be used to implement this kind of deployment:

```
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
  labels:
    app: my-app
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: my-app
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        color: blue
    spec:
      containers:
      - name: my-app-container
        image: my-image:blue
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-green
spec:
  replicas: 0
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
        color: green
    spec:
      containers:
      - name: my-app-container
        image: my-image:green
```

## Canary Deployment Strategy
- Incremental Risk: Introduces the new version to a small percentage of users (e.g., 5%) to validate stability before a wider rollout.
- Metric-Based Promotion: Traffic increases only if specific KPIs (latency, error rates) remain healthy on the "canary" instance.
- Granular Routing: Often managed via a service mesh (like Istio) to split traffic based on percentages or specific user attributes.
- Small Blast Radius: Limits the impact of a failed release to a tiny fraction of the user base.
- The following YAML can be used to implement this kind of deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
  spec:
    containers:
    - name: my-app-container
      image: my-image:latest
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: my-app
```

## A/B Testing Deployment Strategy
- Data-Driven Comparison: Specifically designed to measure business outcomes (e.g., conversion rates, user engagement) rather than just technical stability.
- Targeted Segmentation: Routes traffic based on specific user attributes like geography, device type, or browser cookies to see how different demographics react.
- Version Coexistence: Multiple versions (A and B) run in production simultaneously for an extended period to collect statistically significant data.
- Logical Routing: Requires an advanced load balancer or feature flag system to ensure a consistent experience (so a user doesn't flip between versions on refresh).
- The following YAML can be used to implement this kind of deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
  spec:
    containers:
    - name: my-app-container
      image: my-image:version-a
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: my-app
```

## Shadow Deployment Strategy
- Traffic Mirroring: Duplicates real production traffic and sends a copy to the "shadow" version while the live version continues to handle the actual user requests.
- Zero User Impact: The shadow version's responses are discarded; any errors, crashes, or latency issues in the new code are invisible to the end-user.
- Production Validation: Provides the most realistic testing possible by exposing the new version to actual production load, data, and concurrency patterns without risk.
- Complex Data Handling: Requires careful management of "side effects," such as ensuring the shadow version doesn't trigger duplicate emails, payments, or database writes.
- The following YAML can be used to implement this kind of deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-shadow
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
  spec:
    containers:
    - name: my-app-container
      image: my-image:latest
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-shadow-service
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: my-app
```
