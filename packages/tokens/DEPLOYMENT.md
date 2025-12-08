# Token Auto-Deployment

Automated deployment system for design tokens with change detection and semantic versioning.

## Overview

The system automatically deploys token changes when merged to main:

1. **Detects changes** - Compares token files between commits
2. **Determines version** - Automatically calculates semantic version bump
3. **Builds tokens** - Compiles CSS, SCSS, and JS outputs
4. **Creates release** - Tags and creates GitHub release

## Usage

### Automatic Deployment

Simply merge token changes to main:

```bash
# Make changes
vim packages/tokens/src/base/colors.yaml

# Commit and merge PR
git add packages/tokens/src/base/colors.yaml
git commit -m "feat(tokens): Add new color"
# After PR merge, deployment happens automatically
```

### Change Detection

Test locally before merging:

```bash
cd packages/tokens

# Check changes
npm run changes

# JSON output
npm run changes:json

# Markdown output
npm run changes:markdown
```

### Manual Trigger

Trigger deployment with specific version:

```bash
gh workflow run tokens-deploy.yml -f version_bump=minor
```

## Versioning

Automatic semantic versioning:

- **Major** - Breaking changes (token removed, type changed)
- **Minor** - New tokens added
- **Patch** - Token values modified
- **None** - No token changes

## Scripts

```json
{
  "changes": "node scripts/detect-token-changes.mjs",
  "changes:json": "node scripts/detect-token-changes.mjs --format json",
  "changes:markdown": "node scripts/detect-token-changes.mjs --format markdown"
}
```

## Workflow

The GitHub Actions workflow:

1. Triggers on push to main with token changes
2. Detects and analyzes changes
3. Determines semantic version bump
4. Bumps version in package.json
5. Builds token outputs
6. Commits version bump
7. Creates git tag
8. Creates GitHub release

## Configuration

Edit `.github/workflows/tokens-deploy.yml` to customize:

- Trigger paths
- Version bump logic
- Build steps
- Release settings

## Best Practices

1. **Test locally** - Run `npm run changes` before merging
2. **Use descriptive commits** - Follow conventional commits
3. **Review changes** - Check change report in CI
4. **Monitor deployments** - Verify releases are created
5. **Coordinate breaking changes** - Communicate major version bumps

## Troubleshooting

**Workflow not triggering?**
- Verify changes are in `packages/tokens/src/**`
- Check workflow file exists
- Ensure GitHub Actions enabled

**No changes detected?**
- Run `npm run changes` locally
- Verify token files are valid JSON/YAML
- Check git diff shows changes

**Build fails?**
- Test `npm run build` locally
- Check Style Dictionary config
- Review build logs for errors

---

For more details, see the workflow file at `.github/workflows/tokens-deploy.yml`
