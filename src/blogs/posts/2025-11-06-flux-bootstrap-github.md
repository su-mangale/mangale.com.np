---
title: "Bootstrap FluxCD with GitHub"
description: "Setting up FluxCD on a fresh cluster and linking it to a GitHub repo in minutes."
date: 2025-11-06
readTime: "3 min read"
published: true
---
FluxCD’s bootstrap command wires a Kubernetes cluster to a Git repository so every change is reconciled automatically. With GitHub hosting the desired state, you can ship platform updates by merging pull requests instead of running `kubectl` by hand.

Here’s the streamlined bootstrap flow I use for greenfield clusters:

```bash
# authenticate with GitHub using a personal access token
export GITHUB_TOKEN=ghp_sampletokenvalue
flux bootstrap github \
  --owner=su-mangale \
  --repository=flux-platform \
  --branch=main \
  --path=clusters/production \
  --personal
```

The command installs Flux controllers, commits the manifests that track them, and configures the GitHub repo as the sync target. By default, Flux reconciles every minute, applying manifests under the specified path.

After the bootstrap completes, push workload definitions into `clusters/production` (or any other overlay path you chose). Flux will render and apply them, giving you a repeatable, declarative foundation managed directly from GitHub.
