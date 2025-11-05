---
title: "Structuring the FluxCD Source of Truth"
description: "Opinionated layout patterns that keep your GitOps repository tidy as teams grow."
date: 2025-11-07
readTime: "4 min read"
published: true
---
A GitOps repo quickly becomes unmanageable if application overlays, infrastructure manifests, and cluster config live side by side. FluxCD is flexible about directory layout, which means it’s on us to establish a predictable structure for contributors.

My default blueprint looks like this:

```text
clusters/
  production/
    kustomization.yaml
    apps/
      payments.yaml
      web.yaml
    infrastructure/
      ingress.yaml
      loki.yaml
  staging/
    ...
platform/
  tenants/
  policies/
apps/
  payments/
  web/
```

Each cluster directory defines the Kustomizations that Flux reconciles. Those Kustomizations in turn reference app and platform components stored elsewhere in the repo. This keeps the cluster overlays light while letting platform teams evolve shared building blocks independently.

The benefits show up fast: platform engineers can update multi-tenant policies without touching app code, and application teams can propose overlay tweaks via small pull requests scoped to their workload directories. Flux’s reconciliation loop just sees clean dependency graphs instead of sprawling YAML bundles.
