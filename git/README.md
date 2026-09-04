# Git Homework

## Task 1 — `git commit -a -m` vs `git commit -m`

### `git commit -m`

Command used:

echo "Git Homework Task 1" > task1.txt
git add task1.txt
git commit -m "Add task1 fil"

Output:

[main 176d8ce] Add task1 fil
 1 file changed, 1 insertion(+)
 create mode 100644 git/task1.txt

The `git commit -m` command commits changes that have already been staged using `git add`.

### `git commit -a -m`

Command used:

echo "Modified using git commit -a" >> task1.txt
git commit -a -m "Modify task1 using commit a"

Output:

[main d554ab4] Modify task1 using commit a
 1 file changed, 1 insertion(+)

The `-a` option automatically stages modifications to already tracked files before committing.

### Difference

| Command | Description |
|---|---|
| `git commit -a -m "message"` | Automatically stages modified tracked files and commits them. |
| `git commit -m "message"` | Commits only staged changes, so `git add` is required for new or unstaged files. |

---

# Task 2 — Git Cherry-Pick

## Commits on Main

Used:

git log --oneline -3

Output:

d554ab4 (HEAD -> main) Modify task1 using commit a
176d8ce Add task1 fil
ea8d7e7 (origin/main, origin/HEAD) added readme for networking fundamentals

There were multiple commits on the `main` branch before creating the new branch.

## Create a New Branch

Command:

git checkout -b git-homework-branch

Output:

Switched to a new branch 'git-homework-branch'

A separate branch named `git-homework-branch` was created for the cherry-pick demonstration.

## Commits Created on New Branch

### First Commit

Commands:

echo "First branch change" > branch1.txt
git add branch1.txt
git commit -m "Add first branch change"

Output:

[git-homework-branch 3c4fcb5] Add first branch change
 1 file changed, 1 insertion(+)
 create mode 100644 git/branch1.txt

### Second Commit

Commands:

echo "Second branch change" > branch2.txt
git add branch2.txt
git commit -m "Add second branch change"

Output:

[git-homework-branch 532d7a0] Add second branch change
 1 file changed, 1 insertion(+)
 create mode 100644 git/branch2.txt

The branch history was checked using:

git log --oneline -2

Output:

532d7a0 (HEAD -> git-homework-branch) Add second branch change
3c4fcb5 Add first branch change

## Cherry-Pick a Commit into Main

Switched back to the `main` branch:

git checkout main

The commit selected from the `git-homework-branch` branch was:

3c4fcb5 Add first branch change

Cherry-pick command:

git cherry-pick 3c4fcb5

Output:

[main 2125a92] Add first branch change
 Date: Fri Sep 4 22:27:39 2026 +0530
 1 file changed, 1 insertion(+)
 create mode 100644 git/branch1.txt

The commit from the `git-homework-branch` branch was successfully applied to the `main` branch.

## Verify Cherry-Pick

Command:

git log --oneline -5

Output:

2125a92 (HEAD -> main) Add first branch change
d554ab4 Modify task1 using commit a
176d8ce Add task1 fil
ea8d7e7 (origin/main, origin/HEAD) added readme for networking fundamentals
b53ee9d Add shell scripting assignment

The original commit was:

3c4fcb5 Add first branch change

After cherry-picking, the change appeared on `main` as a new commit:

2125a92 Add first branch change

This shows that `git cherry-pick` takes the changes from a specific commit and applies them to the current branch as a new commit.

## Push Changes to GitHub

Command:

git push origin main

Output:

To https://github.com/Karthikeya914/devops-assignments
   ea8d7e7..2125a92  main -> main

The changes were successfully pushed to the `main` branch of the GitHub repository.

## Conclusion

I practiced the difference between `git commit -a -m` and `git commit -m`, created a separate branch, made multiple commits on that branch, identified a commit using `git log`, and successfully cherry-picked a commit from the branch into `main`.

Finally, the completed Git homework was pushed successfully to GitHub.