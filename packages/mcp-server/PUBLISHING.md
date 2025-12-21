# Publishing Guide for @hidearea-design/mcp-server

This guide explains how to publish the MCP server package to npm.

## Prerequisites

### 1. npm Account

You need an npm account with publishing permissions:

1. Create an account at https://www.npmjs.com/signup
2. Verify your email address
3. Enable two-factor authentication (2FA) - **Required for publishing**

### 2. Organization Access

The package is published under `@hidearea-design` scope:

- You must be a member of the `hidearea-design` organization on npm
- Contact the organization owner to be added
- Or: If this is the first publish, you'll need to create the organization

### 3. NPM_TOKEN Setup

For automated publishing via GitHub Actions:

#### Generate an npm Access Token

1. Log in to https://www.npmjs.com/
2. Click your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select **Automation** (for CI/CD)
5. Copy the token (starts with `npm_...`)

#### Add Token to GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

## Publishing Methods

### Method 1: Automated (Recommended)

Using changesets and GitHub Actions:

```bash
# 1. Create a changeset
pnpm changeset

# Select:
# - Package: @hidearea-design/mcp-server
# - Version bump: patch/minor/major
# - Summary: Describe your changes

# 2. Commit the changeset
git add .changeset/
git commit -m "chore: add changeset for release"

# 3. Push to main branch
git push origin main

# 4. GitHub Actions will:
#    - Create a "Version Packages" PR
#    - Update package.json version
#    - Generate CHANGELOG.md entries

# 5. Review and merge the PR

# 6. Automatic publication happens!
#    - Package builds
#    - Validation runs
#    - Published to npm
#    - GitHub release created
```

### Method 2: Manual Publishing

For emergency releases or when automation fails:

```bash
# 1. Ensure you're on main branch with latest changes
git checkout main
git pull

# 2. Build the package
cd packages/mcp-server
pnpm build

# 3. Verify package contents
npm pack --dry-run

# 4. Test the package locally (optional)
npm pack
npm install -g hidearea-design-mcp-server-0.2.0.tgz
hidearea-mcp --version

# 5. Login to npm (if not already)
npm login

# 6. Publish to npm
npm publish --access public

# 7. Verify publication
npm view @hidearea-design/mcp-server
```

## Pre-publication Checklist

Before publishing, ensure:

- [ ] All tests pass (`pnpm test`)
- [ ] Package builds successfully (`pnpm build`)
- [ ] README.md is up to date
- [ ] CHANGELOG.md includes all changes
- [ ] Version number follows semver
- [ ] No breaking changes in minor/patch releases
- [ ] `npm pack --dry-run` shows correct contents
- [ ] LICENSE file is included
- [ ] USAGE_GUIDE.md is comprehensive

## Validation

The package includes automatic validation (`prepublishOnly` script):

```bash
# Validates:
# ✓ build/index.js exists
# ✓ build/index.d.ts exists
# ✓ README.md exists
# ✓ LICENSE exists
```

If validation fails, the publish will be aborted.

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Examples:

```bash
# Bug fix
pnpm changeset
# Select: patch
# Summary: "fix: resolve component generation issue"

# New feature
pnpm changeset
# Select: minor
# Summary: "feat: add new design token tool"

# Breaking change
pnpm changeset
# Select: major
# Summary: "BREAKING: change API structure for MCP tools"
```

## Post-publication Verification

After publishing:

1. **Verify on npm**:
   ```bash
   npm view @hidearea-design/mcp-server
   ```

2. **Test installation**:
   ```bash
   npm install -g @hidearea-design/mcp-server
   hidearea-mcp --version
   ```

3. **Check GitHub Release**:
   - Visit: https://github.com/hardlitchi/hidearea-design/releases
   - Verify release notes are generated

4. **Test in a project**:
   ```bash
   mkdir test-project
   cd test-project
   npm init -y
   npm install @hidearea-design/mcp-server
   ```

## Troubleshooting

### "You do not have permission to publish"

**Solution**: Ensure you're a member of the `@hidearea-design` organization on npm.

```bash
# Check your npm user
npm whoami

# Login if needed
npm login
```

### "This package has been marked as private"

**Solution**: Check `package.json`:

```json
{
  "private": false,  // Should be false or omitted
  "publishConfig": {
    "access": "public"  // Required for scoped packages
  }
}
```

### "Version already exists"

**Solution**: Bump the version number:

```bash
# Use changeset (recommended)
pnpm changeset version

# Or manually edit package.json
# Then: git add . && git commit -m "chore: version bump"
```

### Build fails on publish

**Solution**:

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build

# Verify build output
ls -la build/
```

### GitHub Actions publish fails

**Solution**: Check:

1. NPM_TOKEN is set in GitHub Secrets
2. Token has correct permissions (Automation)
3. Token hasn't expired
4. GitHub Actions has correct permissions

## Unpublishing (Emergency Only)

⚠️ **Warning**: Unpublishing is discouraged and has restrictions.

```bash
# Within 72 hours of publish
npm unpublish @hidearea-design/mcp-server@0.2.0

# After 72 hours, use deprecate instead
npm deprecate @hidearea-design/mcp-server@0.2.0 "This version has critical bugs, please upgrade"
```

## Support

For issues with publishing:

1. Check [npm documentation](https://docs.npmjs.com/)
2. Review [changesets docs](https://github.com/changesets/changesets)
3. Open an issue in the repository
4. Contact repository maintainers

---

**Package**: @hidearea-design/mcp-server
**Current Version**: 0.2.0
**Registry**: https://www.npmjs.com/package/@hidearea-design/mcp-server
**Repository**: https://github.com/hardlitchi/hidearea-design
