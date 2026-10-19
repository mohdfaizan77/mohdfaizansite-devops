# How Git Works Under the Hood?

Source: https://www.geeksforgeeks.org/git/how-git-works-under-the-hood/

Git is a distributed version control system that manages code changes and collaboration, and understanding how Git commands work internally helps developers use Git more confidently and effectively.
- Tracks file changes using internal objects, references, and history.
- Each Git command (like commit, branch, or merge) operates on these underlying structures.
- Every developer has a complete local repository, enabling offline work.
- Knowing the internals helps with troubleshooting and efficient Git usage.

## Git Concepts
Git Concepts provide the foundational understanding of how Git tracks changes, manages versions, and enables collaboration in software development.

### Snapshots vs. Deltas
Git uses a snapshot-based approach by saving the entire project state at each commit instead of file differences.
- Unchanged files are linked to previous versions, not duplicated
- This makes Git space-efficient, fast, and reliable

### Git's Three States
Git operates with three main states that files can reside in:
- Modified: Changes have been made to the file but not yet staged.
- Staged: Changes are marked to be included in the next commit.
- Committed: Changes are safely stored in the local repository.

### Git's Architecture
Git’s Architecture is designed around a distributed model that efficiently tracks changes using the working directory, staging area, and repository.
- Working Directory: The directory on your computer where you make changes.
- Staging Area (Index): An intermediate area where Git tracks changes that will go into your next commit.
- Repository: Where Git permanently stores all snapshots and change history.

## Git’s Internal Data Structures
Git’s internal data structures are designed to store project data efficiently and accurately track every change made to files over time.

### Blob
A Blob (Binary Large Object) stores the actual content of a single file in Git.
- Identified by a SHA-1 hash of its content
- Same content produces the same blob, regardless of filename or location
- Helps Git avoid duplicate storage and save space
Example:
When you add a file to Git, it creates a blob object that stores the file's content:

```
echo "Hello, World!" > example.txt
git add example.txt
```
This command creates a blob object, identified by its SHA-1 hash.

### Tree
Trees are Git’s way of representing directories. A tree object points to blobs (files) and other trees (subdirectories), thus forming the hierarchical structure of the project.
- A tree points to blobs (files) and other trees (subdirectories)
- It forms the hierarchical layout of the project
- Each commit contains a tree that captures a snapshot of the directory structure
Example: A tree object captures a snapshot of the directory structure at a given commit, with pointers to blobs and other trees.

### Commit
A commit object is the most critical data structure in Git represents a project snapshot at a specific point in time.
- Stores a snapshot of the working directory
- Includes metadata like author and commit message
- Points to the previous commit to maintain history
Structure of a Commit Object:
- Tree: Points to the top-level tree of the directory structure.
- Parent: Refers to the previous commit(s). A commit can have multiple parents in the case of merges.
- Author/Committer: Metadata about who made the changes and when.
- Message: A description of the changes made.

## Git Object Model
Git’s object model defines how data is stored and managed using blobs, trees, commits, and tags, each uniquely identified by a SHA-1 hash.

### Hashes and SHA-1
Git uses SHA-1 hashing to ensure the integrity and uniqueness of all repository objects.
- Each object (blob, tree, commit) has a 40-character SHA-1 hash
- The hash is generated from the object’s content
- This prevents tampering and ensures reliable identification and retrieval
Example:

```
git hash-object example.txt
```
This command outputs the SHA-1 hash of the file content, which is how Git identifies and stores the file internally.

### Object Storage
Git stores data as objects inside the .git/objects directory, organized using SHA-1 hashes for efficient access.
- The first two characters of the SHA-1 hash form a subdirectory
- The remaining characters are used as the object filename
- This structure enables fast storage and retrieval of Git objects

## Commit Management in Git
Commit Management in Git refers to how Git records, organizes, and tracks snapshots of project changes to maintain a clear and reliable version history.
When you make a commit in Git, it performs several steps under the hood:
- Creating Blobs: Git creates blobs for each file that has been added or modified.
- Building Trees: It then creates tree objects representing the directory structure.
- Generating a Commit: Finally, a commit object is created that links to the top-level tree object and the previous commit.
Commits form a chain, where each commit points to its parent(s), creating a linear or branched history of changes.

## Branches and Tags in Git
Branches in Git are pointers to commits. A branch essentially points to a commit and moves forward as new commits are added.

### Branches Work
- Creating a Branch: When you create a new branch, Git creates a pointer to the current commit.
- Switching Branches: Switching branches updates the working directory and staging area to match the branch’s commit.
Tags: Tags are another type of reference in Git, used to mark specific commits, often for releases or important milestones. Unlike branches, tags do not move—they point to a specific commit permanently.

## The Role of the Index (Staging Area)
The index, or staging area, is an intermediate state that allows you to build up a commit piece by piece. It stores information about what will go into your next commit, letting you control the granularity of your changes.

### How the Index Works?
- Staging Changes: When you use git add, changes are moved to the index.
- Committing: Running git commit captures the current state of the index as a new commit.

## Understanding Git Refs
Refs, or references, are pointers that help Git keep track of commits, branches, and tags. They are stored in the .git/refs directory.

### Types of Refs
- Heads: These are refs for branches (e.g., .git/refs/heads/main).
- Tags: Stored in .git/refs/tags.
- Remotes: References to remote branches, stored in .git/refs/remotes.

## Git’s Garbage Collection and Cleanup
Git repositories can accumulate unreferenced objects, such as commits from deleted branches. Git uses garbage collection to clean up these objects and optimize repository size.

### Garbage Collection in Git
- Git’s garbage collection can be triggered manually using:
git gc
This command cleans up unnecessary files and optimizes the repository.

```
git gc
```
- Reflog and Expiry allow Git to track reference changes and recover lost commits.
- Reflog records the history of ref updates over time
- Unreferenced commits are eventually removed by garbage collection if not recovered
