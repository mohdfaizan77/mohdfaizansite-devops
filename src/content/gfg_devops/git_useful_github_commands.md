# Essential Git Commands for Beginners and Developers

Source: https://www.geeksforgeeks.org/git/useful-github-commands/

Git is the industry standard for version control. While there are hundreds of commands, you will likely spend 90% of your time using just a handful of them. This guide covers the essential commands, categorized by where they fit in your daily workflow.

## List of Top Useful Git Commands
Git commands are crucial for efficient collaboration and project management. We'll explore a list of important Git commands like git commands to push, git commit command, git pull command, and git push command, etc that will help to improve workflow and optimize productivity. These are a Git Commands list that can be used frequently on Git.

## 1. Configuration & Setup
Before you write a single line of code, you must configure your environment.
Command	Description
git version	Checks the installed version of Git.
git config --global user.name "Name"	Sets your identity for all commits.
git config --global user.email "mail"	Sets your email address (must match your GitHub/GitLab email).
git config --global color.ui true	Enables helpful color highlighting in the terminal.
git config --list	Lists all configuration settings currently applied.
git init	Initializes a new, empty Git repository in the current folder.
git clone <url>	Downloads an existing repository from a remote server (like GitHub).

## 2. The Core Workflow (Stage & Commit)
This is the cycle you will repeat dozens of times a day: Modify -> Stage -> Commit.
Command	Description
git status	Crucial. Shows which files are modified, staged, or untracked.
git add <file>	Adds a specific file to the staging area.
git add .	Adds all changed files in the current directory to staging.
git add -p	"Patch" mode. Allows you to stage parts of a file interactively.
git rm <file>	Deletes a file from both the working directory and the index.
git rm --cached <file>	Removes a file from Git tracking but keeps it on your local disk.

### Committing
Command	Description
git commit -m "Message"	Records the snapshot with a message.
git commit -am "Message"	Shortcuts git add . and git commit in one command (tracked files only).
git commit --amend	Modifies the last commit (useful to fix a typo in the message).

## 3. Branching & Merging
Branching allows you to work on new features without breaking the main code.
Managing Branches
Command	Description
git branch	Lists all local branches.
git branch <name>	Creates a new branch.
git checkout <name>	Switches to the specified branch.
git switch <name>	(Modern) A clearer alternative to checkout for switching branches.
git checkout -b <name>	Combo: Creates a branch and switches to it immediately.
git branch -d <name>	Deletes a branch (safe mode: prevents deleting unmerged work).
git branch -D <name>	Force delete. Deletes a branch even if it has unmerged changes.

### Merging Changes
Command	Description
git merge <branch>	Merges the specified branch into your current branch.
git merge --abort	Stops the merge process if conflicts occur and you want to give up.
git rebase <branch>	Reapplies commits on top of another base tip (linear history).

## 4. Remote Syncing
How you send code to GitHub, GitLab, or Bitbucket.
Command	Description
git remote -v	Lists all remote repositories linked to your local project.
git remote add origin <url>	Connects your local repo to a remote server.
git remote remove <name>	Removes a remote connection.
git fetch	Downloads changes from the remote but does not update your code.
git pull	Downloads changes and immediately merges them (Fetch + Merge).
git push -u origin <branch>	Uploads your commits to the remote branch.
git push --tags	Pushes specific version tags to the remote.
git push --force	Dangerous. Overwrites remote history with your local history.

## 5. Inspection & Comparison
When things break, you need to investigate the history.
Command	Description
git log	Shows the full commit history.
git log --oneline	Condensed history (one line per commit).
git log --graph	Shows a text-based graph of branching history.
git diff	Shows differences between working directory and staging area.
git diff --staged	Shows differences between staging area and the last commit.
git blame <file>	Shows who modified each line of a file and when.
git show <commit-id>	Shows the specific changes (metadata + diff) of a commit.

## 6. Undo and Fix (Advanced)
These commands help you fix mistakes.
Command	Description
git reset --soft HEAD~1	Undoes the last commit but keeps changes in the Staging Area.
git reset HEAD~1	Undoes the last commit and moves changes to the Working Dir.
git reset --hard HEAD~1	Undoes the last commit and deletes all changes.
git restore <file>	Discards local changes to a specific file (modern replacement for checkout).
git revert <commit-id>	Creates a new commit that is the exact opposite of the specified commit (safe for public branches).
