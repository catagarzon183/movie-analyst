## **1. The chosen strategy**

The chosen branching strategy for this project is **Git Flow**.  
This model defines a clear, structured process for managing versions and stabilizing releases through controlled branch creation.  
Although the classic Git Flow approach includes both `main` and `develop` as permanent branches, in this specific case the flow has been **simplified** — the project does not require continuous integration or frequent code releases, so development is managed directly from the `main` branch.

---

## **2. Why it fits this project**

This project focuses primarily on maintaining the connection between the **API layer**, the **user interface**, and a **database** that may change over time.  
Because the main updates occur through the database layer rather than continuous software releases, **Git Flow provides a balance between stability and flexibility**.

Using a stable main branch ensures:
- Reliable deployments with minimal conflicts.
- Controlled evolution of both submodules (`api` and `ui`).
- Independence between interface and backend updates.

---

## **3. Trade-offs considered**

- **Main branch always exists:**  
  Git Flow keeps `main` as the stable production branch.

- **Compared to GitHub Flow:**  
  Although GitHub Flow also works with a single `main` branch, it is oriented toward **continuous delivery** and **frequent pull requests**.  
  This project does **not require continuous releases**, so that approach would add unnecessary steps.

- **Temporary branches allowed:**  
  Git Flow allows the creation of short-lived branches for testing or small updates without affecting stability.

- **Version control and structure:**  
  This model enables better control of versions and the ability to integrate future features or database-related changes in an organized way.
