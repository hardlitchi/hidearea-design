#!/usr/bin/env node

import { ComponentGenerator } from "./generator.js";
import type { GeneratorOptions } from "./generator.js";
import * as readline from "readline";

// Simple color utilities
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseArgs(args: string[]): {
  command?: string;
  name?: string;
  skipReact?: boolean;
  skipVue?: boolean;
  skipStorybook?: boolean;
  help?: boolean;
} {
  const parsed: ReturnType<typeof parseArgs> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--skip-react") {
      parsed.skipReact = true;
    } else if (arg === "--skip-vue") {
      parsed.skipVue = true;
    } else if (arg === "--skip-storybook") {
      parsed.skipStorybook = true;
    } else if (arg === "component" || arg === "c") {
      parsed.command = "component";
      if (args[i + 1] && !args[i + 1].startsWith("--")) {
        parsed.name = args[i + 1];
        i++;
      }
    }
  }

  return parsed;
}

function showHelp() {
  log("\n📦 Hidearea Design System Component Generator\n", "bright");
  log("Usage:", "cyan");
  log("  ha-gen component [name] [options]", "gray");
  log("  ha-gen c [name] [options]", "gray");
  log("");
  log("Options:", "cyan");
  log("  --skip-react       Skip React wrapper generation", "gray");
  log("  --skip-vue         Skip Vue wrapper generation", "gray");
  log("  --skip-storybook   Skip Storybook story generation", "gray");
  log("  --help, -h         Show help", "gray");
  log("");
  log("Examples:", "yellow");
  log("  ha-gen component MyButton", "gray");
  log("  ha-gen c MyButton --skip-react", "gray");
  log("  ha-gen component", "gray");
  log("");
}

function question(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${query}${colors.reset} `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function promptComponentName(): Promise<string> {
  while (true) {
    const name = await question("Component name:");

    if (!name) {
      log("  Component name is required", "red");
      continue;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(name)) {
      log(
        "  Component name must start with a letter and contain only letters, numbers, hyphens, and underscores",
        "red"
      );
      continue;
    }

    return name;
  }
}

async function promptYesNo(query: string, defaultValue = true): Promise<boolean> {
  const suffix = defaultValue ? "(Y/n)" : "(y/N)";
  const answer = await question(`${query} ${suffix}`);

  if (!answer) return defaultValue;

  return answer.toLowerCase() === "y" || answer.toLowerCase() === "yes";
}

async function main() {
  const args = process.argv.slice(2);
  const parsed = parseArgs(args);

  if (parsed.help || args.length === 0) {
    showHelp();
    return;
  }

  if (!parsed.command || parsed.command !== "component") {
    log("Unknown command. Use 'ha-gen --help' for usage information.", "red");
    process.exit(1);
  }

  try {
    let componentName = parsed.name;
    let skipReact = parsed.skipReact;
    let skipVue = parsed.skipVue;
    let skipStorybook = parsed.skipStorybook;

    // Interactive mode if name not provided
    if (!componentName) {
      log("\n📝 Interactive mode\n", "bright");
      componentName = await promptComponentName();
      skipReact = !(await promptYesNo("Generate React wrapper?", true));
      skipVue = !(await promptYesNo("Generate Vue wrapper?", true));
      skipStorybook = !(await promptYesNo("Generate Storybook story?", true));
    }

    const generatorOptions: GeneratorOptions = {
      name: componentName,
      skipReact,
      skipVue,
      skipStorybook,
    };

    const generator = new ComponentGenerator(generatorOptions);
    await generator.generate();
  } catch (error) {
    log(
      `\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`,
      "red"
    );
    process.exit(1);
  }
}

main();
