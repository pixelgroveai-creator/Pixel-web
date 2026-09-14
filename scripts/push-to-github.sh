#!/usr/bin/env bash
# ==============================================================================
# Pixelgrove AI - GitHub Push Helper Script
# Pushes migrations, backend configuration, and studio codebase to GitHub
# ==============================================================================

set -e

REMOTE_URL="$1"

echo "======================================================="
echo " Pixelgrove AI Studio (Node: LKO-IST-01, Lucknow)"
echo " Synchronizing Codebase to GitHub"
echo "======================================================="

# 1. Ensure git user identity is configured
if [ -z "$(git config user.name)" ]; then
  git config user.name "Pixelgrove Engineer"
  git config user.email "engineering@pixelgrove.ai"
fi

# 2. Add remote if provided
if [ -n "$REMOTE_URL" ]; then
  if git remote | grep -q "^origin$"; then
    echo "Updating existing 'origin' remote URL..."
    git remote set-url origin "$REMOTE_URL"
  else
    echo "Adding 'origin' remote: $REMOTE_URL..."
    git remote add origin "$REMOTE_URL"
  fi
fi

# 3. Stage all source files
echo "Staging files for commit..."
git add .

# 4. Commit if changes are present
if git status --porcelain | grep -q .; then
  COMMIT_MSG="feat(backend): set up Supabase lead enquiries infrastructure and Lucknow studio node"
  echo "Committing changes: $COMMIT_MSG..."
  git commit -m "$COMMIT_MSG"
else
  echo "Working tree clean, no new changes to commit."
fi

# 5. Push if remote origin exists
if git remote | grep -q "^origin$"; then
  CURRENT_BRANCH=$(git branch --show-current || echo "main")
  if [ -z "$CURRENT_BRANCH" ]; then
    git branch -M main
    CURRENT_BRANCH="main"
  fi
  echo "Pushing to origin/$CURRENT_BRANCH..."
  git push -u origin "$CURRENT_BRANCH"
  echo "Successfully pushed all changes to GitHub!"
else
  echo "NOTE: No GitHub remote 'origin' configured yet."
  echo "To push to your GitHub repo, run:"
  echo "  git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git"
  echo "  git push -u origin main"
  echo "Or run:"
  echo "  ./scripts/push-to-github.sh https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git"
fi

echo "======================================================="
echo " Completed successfully."
echo "======================================================="
