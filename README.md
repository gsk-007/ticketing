# Ticketing System

Welcome to the **Ticketing System** project! This application is designed to manage ticket sales and orders efficiently using a **microservices architecture**.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [NGINX Ingress Setup](#nginx-ingress-setup)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration system.
- **Ticket Management**: Create, update, and delete tickets.
- **Order Processing**: Manage orders with expiration handling.
- **Payment Integration**: Process payments securely.
- **Microservices Architecture**: Decoupled services for scalability and maintainability.
- **NGINX Ingress**: Manage incoming traffic with an Ingress Controller.

## Architecture

The application follows a **microservices architecture**, with each service responsible for a specific domain:

- **Auth Service**: Handles user authentication and authorization.
- **Tickets Service**: Manages ticket creation and updates.
- **Orders Service**: Manages user orders and tracks their status.
- **Payments Service**: Processes payments for orders.
- **Expiration Service**: Handles order expiration and related events.
- **NGINX Ingress Controller**: Manages external access to microservices.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Ingress**: NGINX Ingress Controller
- **Messaging**: NATS Streaming Server
- **Other**: TypeScript, Skaffold

## Getting Started

To get a local copy up and running, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/gsk-007/ticketing.git
cd ticketing
```

### 2. Set Up Environment Variables
- Create a `.env` file in each service’s directory (e.g., `/auth`, `/tickets`) based on the provided `.env.example` files.
- Ensure you have the necessary environment variables set for each service.

### 3. Install Dependencies
```bash
# For each service
cd auth
npm install
# Repeat for other services: tickets, orders, payments, expiration, client
```

### 4. Install Kubernetes & Skaffold
- Install **Kubernetes** (Minikube or Docker Desktop with Kubernetes enabled).
- Install **Skaffold** (used for development workflows).

### 5. Start the Application
- Ensure Docker and Kubernetes are running.
- Use Skaffold to start all services:
  ```bash
  skaffold dev
  ```

### 6. Set Up the Hosts File (Mac/Linux)
For local development, map `ticketing.dev` to localhost:
```bash
echo "127.0.0.1 ticketing.dev" | sudo tee -a /etc/hosts
```

On **Windows**, modify the file:  
`C:\Windows\System32\drivers\etc\hosts` and add:
```
127.0.0.1 ticketing.dev
```

## NGINX Ingress Setup

To expose services using **NGINX Ingress**, follow these steps:

### 1. Install the NGINX Ingress Controller
Run the following command to install **NGINX Ingress** in Kubernetes:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

### 2. Verify NGINX Ingress is Running
Check if the Ingress pods are running:
```bash
kubectl get pods -n ingress-nginx
```
You should see a pod named `ingress-nginx-controller`.

### 3. Apply Ingress Configuration
Navigate to the `/infra/k8s` directory and apply the Ingress manifest:
```bash
kubectl apply -f infra/k8s/ingress.yaml
```

### 4. Check the Ingress Rules
Run:
```bash
kubectl get ingress
```
It should list an entry for `ticketing.dev`.

## Folder Structure

The repository is organized as follows:

```
ticketing/
├── auth/           # Authentication service
├── client/         # Frontend client application
├── expiration/     # Expiration service
├── infra/          # Infrastructure configurations (K8s manifests)
│   ├── k8s/        # Kubernetes manifests
│   ├── ingress.yaml # Ingress configuration
├── orders/         # Orders service
├── payments/       # Payments service
├── tickets/        # Tickets service
├── .gitignore
├── .prettierrc
└── skaffold.yaml
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

