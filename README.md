## 1. The chosen strategy

The chosen branching strategy for this project is **GitHub Flow**.
This model provides a lightweight and modern workflow based on short-lived feature branches and frequent merges into a single, stable `main` branch.
Unlike Git Flow, which introduces multiple long-term branches (`develop`, `release`, `hotfix`), GitHub Flow simplifies collaboration and ensures that every change is tested and reviewed through pull requests before being merged into production.

In this project, all development activity is managed through feature branches created from `main`, following a continuous integration mindset that keeps the codebase stable and deployable at all times.

---

## 2. Why it fits this project

The *movie-analyst* project is a lightweight DevOps application under continuous improvement rather than a multi-release software product.
Its main goal is to integrate components such as the API layer, the user interface, and data-driven functionality in an iterative way.

GitHub Flow is ideal because it:

- Encourages **frequent commits and pull requests**, promoting incremental development.
- Keeps `main` always **production-ready** and free of unstable code.
- Simplifies collaboration even in small teams or individual projects.
- Fits perfectly with tools such as **GitHub Actions** and **pre-commit hooks** for quality checks and automation.

By merging every tested change through pull requests, this model guarantees a clear history and minimal risk of conflicts, which aligns with the project’s need for **simplicity, clarity, and fast iteration**.

---

## 3. Trade-offs considered

- **Main branch as the single source of truth:**
  GitHub Flow maintains one permanent branch (`main`), reducing complexity and ensuring that every commit merged there has passed review.

- **Compared to Git Flow:**
  Git Flow introduces additional layers (`develop`, `release`, etc.) designed for versioned products or teams managing parallel releases.
  Since *movie-analyst* is a continuously evolving educational and analytical project without versioned releases, such structure would add unnecessary overhead.

- **Short-lived feature branches:**
  Developers create branches such as `feature/add-analysis-module` or `docs/update-readme`, which exist only until their pull requests are merged.
  This keeps the repository clean and the history easy to follow.

- **Continuous integration readiness:**
  The simplicity of GitHub Flow aligns with modern DevOps pipelines and supports future automation (testing, linting, and deployment hooks) without structural friction.
