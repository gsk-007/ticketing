# Ticketing System

Welcome to the **Ticketing System** project!
This application manages ticket sales and orders using a **microservices architecture** powered by Kubernetes.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Traefik Ingress Setup](#traefik-ingress-setup)
- [JWT Secret Setup](#jwt-secret-setup)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

---

## Features

- User Authentication
- Ticket Management
- Order Processing with expiration
- Payment Integration
- Event-driven communication (NATS)
- Microservices architecture
- Traefik Ingress Controller for routing

---

## Architecture

The system is composed of the following services:

- **Auth Service** – Authentication & authorization
- **Tickets Service** – Ticket CRUD operations
- **Orders Service** – Order lifecycle management
- **Payments Service** – Payment processing
- **Expiration Service** – Order expiration handling
- **Client (React)** – Frontend application
- **Traefik Ingress Controller** – External traffic routing

Traffic flow:

```
Browser
   ↓
Traefik
   ↓
Kubernetes Services
   ↓
Pods
```

---

## Technologies Used

- Frontend: React (Next.js)
- Backend: Node.js, Express
- Database: MongoDB
- Messaging: NATS Streaming Server
- Containerization: Docker
- Orchestration: Kubernetes
- Ingress: Traefik
- Dev Workflow: Skaffold
- Language: TypeScript

---

# Getting Started (Local Development)

## 1. Clone the Repository

```bash
git clone https://github.com/gsk-007/ticketing.git
cd ticketing
```

---

## 2. Install Requirements

- Docker Desktop (Kubernetes enabled)
- Skaffold
- Helm (for Traefik installation)

---

## 3. Install Traefik Ingress Controller

```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update

helm install traefik traefik/traefik \
  --namespace traefik \
  --create-namespace
```

Verify:

```bash
kubectl get svc -n traefik
```

You should see:

```
traefik   LoadBalancer   localhost
```

---

## 4. Update Hosts File

### Mac / Linux

```bash
echo "127.0.0.1 ticketing.dev" | sudo tee -a /etc/hosts
```

### Windows

Edit:

```
C:\Windows\System32\drivers\etc\hosts
```

Add:

```
127.0.0.1 ticketing.dev
```

---

# JWT Secret Setup

The Auth service requires a JWT secret stored as a Kubernetes Secret.

### Create the Secret (Recommended Method)

Run:

```bash
kubectl create secret generic jwt-secret \
  --from-literal=JWT_KEY=your_super_secret_key
```

Verify:

```bash
kubectl get secrets
```

---

# Running the Application

Once everything is set up:

```bash
skaffold dev
```

This will:

- Build all Docker images
- Deploy Kubernetes manifests
- Watch for file changes
- Auto-rebuild & sync

Access the app:

```
http://ticketing.dev
```

---

# Traefik Ingress Setup

Ingress configuration lives in:

```
infra/k8s/ingress-srv.yaml
```

Traefik routes:

- `/api/users` → auth-srv
- `/api/tickets` → tickets-srv
- `/api/orders` → orders-srv
- `/api/payments` → payments-srv
- `/` → client-srv

Check ingress:

```bash
kubectl get ingress
```

---

# Folder Structure

```
ticketing/
├── auth/
├── client/
├── expiration/
├── infra/
│   ├── k8s/
│   │   ├── ingress-srv.yaml
│   │   ├── jwt-secret.yaml (optional)
├── orders/
├── payments/
├── tickets/
├── skaffold.yaml
```

---

# Production Notes (GCP / GKE)

If deploying to GKE:

- Set `push: true` in `skaffold.yaml`
- Use Artifact Registry or GCR images
- Use proper TLS certificates
- Use external secret management (GCP Secret Manager)

---

# Contributing

1. Fork the repository
2. Create a branch
3. Commit your changes
4. Push and open a PR

---
