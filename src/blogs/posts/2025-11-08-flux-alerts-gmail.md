---
title: "FluxCD Notifications with Alertmanager"
description: "Piping Flux reconciliation alerts through Alertmanager to surface messages in Gmail."
date: 2025-11-08
readTime: "4 min read"
published: true
---
The Flux notification-controller streams events about reconciliations, drift, and health checks. By routing those events into Alertmanager you can reuse existing PagerDuty or email integrations without bolting on another alerting service.

Start by defining a `Provider` that points at Alertmanager’s API endpoint:

```yaml
# alerts/provider.yaml
apiVersion: notification.toolkit.fluxcd.io/v1beta3
kind: Provider
metadata:
  name: alertmanager-provider
spec:
  type: alertmanager
  address: http://alertmanager.monitoring.svc.cluster.local:9093/api/v2/alerts
```

Next, create an `Alert` resource that subscribes to Flux events:

```yaml
# alerts/bootstrap-alert.yaml
apiVersion: notification.toolkit.fluxcd.io/v1beta3
kind: Alert
metadata:
  name: flux-bootstrap
spec:
  providerRef:
    name: alertmanager-provider
  eventSources:
    - kind: Kustomization
      name: "*"
  summary: "Flux reconciliation issue"
```

Inside Alertmanager, configure a receiver that uses SMTP to send mail to Gmail. Generate an app password, wire it into Alertmanager’s config, and match routes on the `flux` alert labels. With this in place, Flux reconciliation failures trigger an Alertmanager notification that appears straight in Gmail—ideal for fast feedback without setting up a dedicated incident channel.
