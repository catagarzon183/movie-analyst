
## Comparison: Continuous Integration (CI) vs Continuous Delivery (CD) vs Continuous Deployment

| Aspect | Continuous Integration (CI) | Continuous Delivery (CD) | Continuous Deployment |
|--------|-----------------------------|---------------------------|------------------------|
| **Main Purpose** | Automate code integration and ensure **build quality** after every commit. | Automate the **delivery** of tested code to a staging environment. | Automate the **deployment** of validated code directly to production. |
| **Automation Level** | Builds and tests run automatically on every push or pull request. | Deploys automatically to staging but requires **manual approval** before production. | Fully automated — no manual intervention before production. |
| **Manual Approval** | Not required | Required before deploying to production | Not required |
| **Focus** | Detect integration errors early and maintain code stability. | Deliver tested artifacts safely and control the release process. | Deliver updates to end users as soon as they pass tests. |
| **Typical Output** | Validated build or tested artifact (e.g., Docker image, JAR/WAR). | Deployed artifact in a staging environment. | Application running in production. |
| **Testing Scope** | Unit and integration tests. | End-to-end and staging environment validation. | Monitoring and rollback automation after release. |
| **Team Involvement** | Developers and QA teams. | Developers, QA, and operations teams. | Full DevOps collaboration with minimal human approval. |
| **Objective** | Guarantee **integration and code quality**. | Guarantee **controlled delivery and availability**. | Guarantee **continuous and automated delivery** to production. |