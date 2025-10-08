# Branching Strategy: GitHub Flow

## 1. The chosen strategy

The chosen branching strategy for this project is **GitHub Flow**.
This model provides a lightweight, simple, and efficient workflow ideal for projects that require continuous integration and frequent updates.
It is based on a single long-lived branch (`main`), with short-lived feature branches that are created, reviewed, and merged via Pull Requests.

## 2. Why it fits this project

This project focuses on practicing the DevOps lifecycle — specifically version control, branching, and collaboration.
GitHub Flow fits perfectly because it encourages small, iterative changes with peer review before merging into `main`.

Using a single stable `main` branch ensures:
- Easier collaboration and fewer merge conflicts.
- Continuous deployment readiness.
- Simpler history and rollback if needed.

## 3. Trade-offs considered

- **Compared to Git Flow:** GitHub Flow is simpler and better suited for continuous delivery. Git Flow adds complexity with `develop`, `release`, and `hotfix` branches — unnecessary for this lightweight project.
- **Main branch protection:** All changes must go through Pull Requests, ensuring code review.
- **Short-lived branches:** Each branch focuses on a single, small feature or fix.
