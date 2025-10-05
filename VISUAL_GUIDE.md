# 📊 Git-First Workflow - Visual Guide

## 🔄 The Two Main Workflows

### 1️⃣ **Making Changes Locally** (Primary Workflow)

```
┌────────────────────────────────────────────────────────────────┐
│                    GIT-FIRST DEPLOYMENT                        │
└────────────────────────────────────────────────────────────────┘

    VS Code                Git              Google Apps Script
    ┌─────┐              ┌─────┐              ┌─────────┐
    │     │   1. Edit    │     │   2. Commit  │         │
    │ .gs ├─────────────>│ Git ├────────────> │  Live   │
    │     │              │     │   3. Deploy  │ Script  │
    └─────┘              └─────┘              └─────────┘
                            │
                            │ 4. Push
                            v
                         ┌──────┐
                         │GitHub│
                         └──────┘

    Command: ./deploy.sh
    
    ✅ Version controlled BEFORE deployment
    ✅ Safe to experiment
    ✅ Easy rollback
```

---

### 2️⃣ **After Editing in Browser** (Sync Workflow)

```
┌────────────────────────────────────────────────────────────────┐
│                    BROWSER EDIT SYNC                           │
└────────────────────────────────────────────────────────────────┘

  Apps Script Editor      Git              VS Code
    ┌─────────┐         ┌─────┐          ┌─────┐
    │         │ 1. Pull │     │ 2. View  │     │
    │  Live   ├────────>│ Git ├─────────>│ .gs │
    │ Script  │         │     │          │     │
    └─────────┘         └─────┘          └─────┘
                           │
                           │ 3. Commit
                           v
                        ┌──────┐
                        │GitHub│
                        └──────┘

    Command: ./sync.sh
    
    ✅ Brings browser edits back to Git
    ✅ Keeps Git history complete
    ✅ Syncs with VS Code
```

---

## 🆚 Git-First vs Deploy-First

### ❌ OLD WAY (Deploy-First):
```
Edit → Deploy → Git Commit → Git Push

Problem: Code is LIVE before Git knows about it!
         Can't rollback using Git history
```

### ✅ NEW WAY (Git-First):
```
Edit → Git Commit → Deploy → Git Push

Benefit: Code is VERSIONED before deployment
         Can rollback using Git history
```

---

## 🎯 Decision Tree: Which Command?

```
                    Made changes?
                         │
           ┌─────────────┼─────────────┐
           │                           │
      Where did you                Where did you
      make changes?                make changes?
           │                           │
    ┌──────┴──────┐             ┌──────┴──────┐
    │             │             │             │
 VS Code       Browser       VS Code       Browser
    │             │             │             │
    │             │             │             │
    v             v             v             v
./deploy.sh   ./sync.sh   ./deploy.sh   ./sync.sh

   (or)         (or)        (or)         (or)

invest-deploy  invest-sync invest-deploy invest-sync
```

---

## 📈 Complete Development Cycle

```
┌─────────────────────────────────────────────────────────────┐
│                  TYPICAL DEVELOPMENT DAY                     │
└─────────────────────────────────────────────────────────────┘

Morning:
  ┌─────────────────────────────────────┐
  │ 1. invest                           │ # cd to project
  │ 2. invest-sync                      │ # sync any browser edits
  └─────────────────────────────────────┘

Development:
  ┌─────────────────────────────────────┐
  │ 3. invest-edit                      │ # open VS Code
  │ 4. (edit invest.gs)                 │
  │ 5. invest-deploy                    │ # Git-First deploy
  │ 6. invest-open                      │ # test in browser
  └─────────────────────────────────────┘

Testing:
  ┌─────────────────────────────────────┐
  │ 7. Run verifySetup()                │
  │ 8. Run test functions               │
  │ 9. invest-logs                      │ # check execution
  └─────────────────────────────────────┘

If bugs found:
  ┌─────────────────────────────────────┐
  │ 10. invest-edit                     │
  │ 11. (fix bugs)                      │
  │ 12. invest-deploy                   │ # deploy fix
  │ 13. invest-open                     │ # verify
  └─────────────────────────────────────┘

End of day:
  ┌─────────────────────────────────────┐
  │ 14. git push origin main            │ # backup to GitHub
  └─────────────────────────────────────┘
```

---

## 🚨 Emergency Situations

### Situation 1: Deployed broken code!
```
┌────────────────────────────────────────────┐
│ EMERGENCY ROLLBACK                         │
└────────────────────────────────────────────┘

1. git log --oneline           # Find last good commit
2. git show <commit-hash>      # Verify it's correct
3. git checkout <commit-hash> invest.gs
4. clasp push                  # Deploy old version
5. invest-open                 # Test it works
6. git add invest.gs
7. git commit -m "Emergency rollback to <hash>"
8. git push origin main

⏱️ Time to rollback: < 2 minutes
```

### Situation 2: Want to experiment safely
```
┌────────────────────────────────────────────┐
│ SAFE EXPERIMENTATION                       │
└────────────────────────────────────────────┘

1. git branch backup-$(date +%Y%m%d)    # Backup
2. git checkout -b experiment           # New branch
3. invest-edit                          # Make changes
4. invest-deploy                        # Test (commits to branch)
5. invest-open                          # Verify

If good:
  git checkout main
  git merge experiment
  
If bad:
  git checkout main
  # experiment branch stays isolated
```

---

## 📊 Git-First Benefits Summary

| Aspect | Deploy-First ❌ | Git-First ✅ |
|--------|----------------|-------------|
| **Version Control** | After deployment | Before deployment |
| **Rollback** | Manual file restore | `git checkout` |
| **History** | Incomplete | Complete |
| **Safety** | Live code first | Tested code first |
| **Collaboration** | Difficult | Branch-based |
| **Risk** | High | Low |

---

## 🎓 Pro Workflows

### Feature Development:
```
git checkout -b feature/new-alert-system
invest-edit
invest-deploy         # Commits to feature branch
invest-open          # Test
git checkout main
git merge feature/new-alert-system
git push origin main
```

### Testing New Ideas:
```
git stash            # Save current work
git checkout -b test/idea
invest-edit
invest-deploy        # Test idea
# If bad: git checkout main
# If good: git merge test/idea
```

### Release Management:
```
git tag -a v2.0.0 -m "Added new analytics"
git push origin v2.0.0
# Later: git checkout v2.0.0 to go back to release
```

---

## 💡 Key Principles

1. **Always commit before deploying** - This is the foundation
2. **Use descriptive commit messages** - Future you will thank you
3. **Test after every deploy** - Catch issues early
4. **Push to GitHub daily** - Backup and collaboration
5. **Use branches for experiments** - Keep main stable

---

## 🔍 Troubleshooting

### Problem: deploy.sh says "uncommitted changes"
```
Solution: This is working correctly! Review changes:
  git status
  git diff
Then either:
  - Let deploy.sh commit them (recommended)
  - Or commit manually first
```

### Problem: Not sure what's different from last deploy
```
Solution:
  git diff HEAD~1  # See last commit
  git log -p -1    # See last commit with diff
```

### Problem: Want to undo last commit (not deployed yet)
```
Solution:
  git reset --soft HEAD~1  # Undo commit, keep changes
  # Or
  git reset --hard HEAD~1  # Undo commit, discard changes
```

---

## 📚 Related Documentation

- **Full Docs**: `README.md`
- **Setup Guide**: `SETUP_GUIDE.md`
- **Quick Commands**: `CLASP_CHEATSHEET.md`
- **Philosophy**: `WORKFLOW_GUIDE.md`
- **This Guide**: `GIT_FIRST_QUICK_REF.md`

---

**Remember**: 
- 🟢 Git-First = Safe, Traceable, Rollback-able
- 🔴 Deploy-First = Risky, Lost History, Hard to Undo

**Your workflow is now production-ready!** 🚀
