import path from "path";
import fs from "fs/promises";
import {
  toKebabCase,
  toPascalCase,
  validateComponentName,
} from "./utils.js";
import { componentTemplate } from "./templates/component.template.js";
import { stylesTemplate } from "./templates/styles.template.js";
import { testTemplate } from "./templates/test.template.js";
import { storyTemplate } from "./templates/story.template.js";
import { reactTemplate } from "./templates/react.template.js";
import { vueTemplate } from "./templates/vue.template.js";

// Simple color utilities
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

export interface GeneratorOptions {
  name: string;
  coreDir?: string;
  reactDir?: string;
  vueDir?: string;
  storybookDir?: string;
  skipReact?: boolean;
  skipVue?: boolean;
  skipStorybook?: boolean;
}

export class ComponentGenerator {
  private name: string;
  private kebabName: string;
  private PascalName: string;
  private options: GeneratorOptions;

  constructor(options: GeneratorOptions) {
    if (!validateComponentName(options.name)) {
      throw new Error(
        `Invalid component name: ${options.name}. Must start with a letter and contain only letters, numbers, hyphens, and underscores.`
      );
    }

    this.options = options;
    this.name = options.name;
    this.kebabName = toKebabCase(options.name);
    this.PascalName = toPascalCase(options.name);
  }

  async generate(): Promise<void> {
    log(`\n🚀 Generating component: ${this.PascalName}\n`, "cyan");

    await this.generateCore();

    if (!this.options.skipReact) {
      await this.generateReact();
    }

    if (!this.options.skipVue) {
      await this.generateVue();
    }

    if (!this.options.skipStorybook) {
      await this.generateStorybook();
    }

    log(`\n✅ Component generated successfully!\n`, "green");
    this.printNextSteps();
  }

  private async generateCore(): Promise<void> {
    const coreDir =
      this.options.coreDir || path.join(process.cwd(), "packages", "core");
    const componentDir = path.join(
      coreDir,
      "src",
      "components",
      this.kebabName
    );

    log(`📦 Generating core component...`, "cyan");

    await fs.mkdir(componentDir, { recursive: true });

    // Generate component file
    const componentPath = path.join(componentDir, `${this.kebabName}.ts`);
    await fs.writeFile(
      componentPath,
      componentTemplate(this.name, this.kebabName, this.PascalName)
    );
    log(`  ✓ ${componentPath}`, "gray");

    // Generate styles file
    const stylesPath = path.join(componentDir, `${this.kebabName}.styles.ts`);
    await fs.writeFile(stylesPath, stylesTemplate(this.kebabName));
    log(`  ✓ ${stylesPath}`, "gray");

    // Generate test file
    const testPath = path.join(componentDir, `${this.kebabName}.test.ts`);
    await fs.writeFile(
      testPath,
      testTemplate(this.PascalName, this.kebabName)
    );
    log(`  ✓ ${testPath}`, "gray");

    // Generate index file
    const indexPath = path.join(componentDir, "index.ts");
    await fs.writeFile(
      indexPath,
      `export { Ha${this.PascalName} } from "./${this.kebabName}";\n`
    );
    log(`  ✓ ${indexPath}`, "gray");

    // Update core index.ts
    await this.updateCoreIndex(coreDir);
  }

  private async updateCoreIndex(coreDir: string): Promise<void> {
    const indexPath = path.join(coreDir, "src", "index.ts");
    const exportLine = `export { Ha${this.PascalName} } from "./components/${this.kebabName}";\n`;

    let content = await fs.readFile(indexPath, "utf-8");
    if (!content.includes(exportLine)) {
      content += exportLine;
      await fs.writeFile(indexPath, content);
      log(`  ✓ Updated ${indexPath}`, "gray");
    }
  }

  private async generateReact(): Promise<void> {
    const reactDir =
      this.options.reactDir || path.join(process.cwd(), "packages", "react");
    const componentPath = path.join(reactDir, "src", `${this.PascalName}.tsx`);

    log(`⚛️  Generating React wrapper...`, "cyan");

    await fs.mkdir(path.dirname(componentPath), { recursive: true });
    await fs.writeFile(
      componentPath,
      reactTemplate(this.PascalName, this.kebabName)
    );
    log(`  ✓ ${componentPath}`, "gray");

    // Update React index
    await this.updateReactIndex(reactDir);
  }

  private async updateReactIndex(reactDir: string): Promise<void> {
    const indexPath = path.join(reactDir, "src", "index.ts");
    const exportLine = `export { ${this.PascalName}, type ${this.PascalName}Props, type ${this.PascalName}Ref } from "./${this.PascalName}";\n`;

    let content = await fs.readFile(indexPath, "utf-8");
    if (!content.includes(exportLine)) {
      content += exportLine;
      await fs.writeFile(indexPath, content);
      log(`  ✓ Updated ${indexPath}`, "gray");
    }
  }

  private async generateVue(): Promise<void> {
    const vueDir =
      this.options.vueDir || path.join(process.cwd(), "packages", "vue");
    const componentPath = path.join(vueDir, "src", `${this.PascalName}.vue`);

    log(`🍃 Generating Vue wrapper...`, "cyan");

    await fs.mkdir(path.dirname(componentPath), { recursive: true });
    await fs.writeFile(
      componentPath,
      vueTemplate(this.PascalName, this.kebabName)
    );
    log(`  ✓ ${componentPath}`, "gray");

    // Update Vue index
    await this.updateVueIndex(vueDir);
  }

  private async updateVueIndex(vueDir: string): Promise<void> {
    const indexPath = path.join(vueDir, "src", "index.ts");
    const exportLine = `export { default as ${this.PascalName} } from "./${this.PascalName}.vue";\n`;

    let content = await fs.readFile(indexPath, "utf-8");
    if (!content.includes(exportLine)) {
      content += exportLine;
      await fs.writeFile(indexPath, content);
      log(`  ✓ Updated ${indexPath}`, "gray");
    }
  }

  private async generateStorybook(): Promise<void> {
    const storybookDir =
      this.options.storybookDir ||
      path.join(process.cwd(), "packages", "storybook");
    const storyPath = path.join(
      storybookDir,
      "src",
      "stories",
      `${this.PascalName}.stories.ts`
    );

    log(`📚 Generating Storybook story...`, "cyan");

    await fs.mkdir(path.dirname(storyPath), { recursive: true });
    await fs.writeFile(
      storyPath,
      storyTemplate(this.PascalName, this.kebabName)
    );
    log(`  ✓ ${storyPath}`, "gray");
  }

  private printNextSteps(): void {
    log("📝 Next steps:", "yellow");
    log(`  1. Customize the component implementation`, "gray");
    log(`  2. Add component-specific styles`, "gray");
    log(`  3. Write comprehensive tests`, "gray");
    log(`  4. Add more Storybook stories`, "gray");
    log(`  5. Build and test:\n`, "gray");
    log(`     cd packages/core && npm run build`, "cyan");
    log(`     npm test`, "cyan");
    log(`     cd ../storybook && npm run dev\n`, "cyan");
  }
}
