export const ESLINT_ERROR = "error";
export const ESLINT_WARN = "warn";
export const ESLINT_OFF = "off";
export const ENVIRONMENT_PRODUCTION = "production";

export default {
  "no-console": process.env.NODE_ENV === ENVIRONMENT_PRODUCTION ? ESLINT_ERROR : ESLINT_WARN,
  "no-debugger": process.env.NODE_ENV === ENVIRONMENT_PRODUCTION ? ESLINT_ERROR : ESLINT_WARN,
  "@stylistic/no-trailing-spaces": process.env.NODE_ENV === ENVIRONMENT_PRODUCTION ? ESLINT_ERROR : ESLINT_WARN,

  "vueTemplateParens/type-assertion-parens": ESLINT_ERROR,
  "@typescript-eslint/no-explicit-any": ESLINT_ERROR,
  "no-await-in-loop": ESLINT_ERROR,
  "vuejs-accessibility/click-events-have-key-events": ESLINT_OFF,
  "vuejs-accessibility/form-control-has-label": ESLINT_OFF,
  "vuejs-accessibility/anchor-has-content": ESLINT_OFF,
  "vue/no-setup-props-reactivity-loss": ESLINT_OFF,
  "vue/html-closing-bracket-newline": ESLINT_OFF,
  "vue/html-self-closing": ESLINT_OFF,
  "vue/attribute-hyphenation": [ESLINT_ERROR, "never"],
  "vue/v-on-event-hyphenation": [ESLINT_ERROR, "always", {
    autofix: true,
  }],
  
  curly: [ESLINT_ERROR, "all"],

  "no-restricted-imports": [ESLINT_ERROR, {
    patterns: [".*", "@/common/*", "@/standalone/*", "@/server/*"],
  }],

  "@stylistic/member-delimiter-style": [ESLINT_ERROR, {
    multiline: {
      delimiter: "comma",
      requireLast: true,
    },
    singleline: {
      delimiter: "comma",
      requireLast: false,
    },
  }],

  "@stylistic/indent-binary-ops": ESLINT_OFF,
  "@stylistic/max-statements-per-line": ESLINT_OFF,

  // ---- Airbnb style guide rules ----

  "semi-spacing": [ESLINT_ERROR, { before: false, after: true }],
  "semi-style": [ESLINT_ERROR, "last"],
  // handled by stylistic
  indent: ESLINT_OFF,
  "no-continue": ESLINT_ERROR,
  "no-shadow": ESLINT_ERROR,
  "no-undef": ESLINT_ERROR,
  "no-eval": ESLINT_ERROR,
  "no-script-url": ESLINT_ERROR,
  "import/no-cycle": [ESLINT_ERROR, { maxDepth: "∞" }],
  "no-template-curly-in-string": ESLINT_ERROR,
  "no-lonely-if": ESLINT_ERROR,
  "no-multi-spaces": [ESLINT_ERROR, {
    ignoreEOLComments: false,
  }],
  "arrow-body-style": ["error", "as-needed"],
  "nonblock-statement-body-position": [ESLINT_ERROR, "beside", { overrides: {} }],
  "vue/no-multi-spaces": ESLINT_ERROR,
  "vue/no-constant-condition": ESLINT_WARN,
  camelcase: [ESLINT_ERROR, { properties: "never", ignoreDestructuring: false }],
  "@stylistic/object-curly-newline": ["error", {
    ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
    ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
    ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
  }],
  // not compatible with prop destructuring
  "vue/require-default-prop": ESLINT_OFF,
  "vue/max-len": [ESLINT_ERROR, 100, 2, {
    ignoreUrls: true,
    ignoreComments: false,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
    // Because spaces in HTML are insignificant,
    // it shouldn't be hard to start a new line for text content
    ignoreHTMLTextContents: false,
  }],
  "class-methods-use-this": [ESLINT_ERROR, {
    exceptMethods: [],
  }],
  "no-param-reassign": [ESLINT_ERROR, {
    props: true,
    ignorePropertyModificationsFor: [
      "acc", // for reduce accumulators
      "accumulator", // for reduce accumulators
      "e", // for e.returnvalue
    ],
  }],
  "import/newline-after-import": ESLINT_ERROR,
  "import/no-extraneous-dependencies": [ESLINT_ERROR, {
    devDependencies: [
      "test/**", // tape, common npm pattern
      "tests/**", // also common npm pattern
      "spec/**", // mocha, rspec-like pattern
      "**/__tests__/**", // test pattern
      "**/__tests/**", // test pattern
      "test.{js,ts}", // repos with a single test file
      "test-*.{js,ts}", // repos with multiple top-level test files
      "test.{js,ts}", // repos with a single test file
      "*.test-*.{js,ts}", // repos with multiple top-level test files
      "*.spec.{js,ts}", // repos with a single test file
      "spec-*.{js,ts}", // repos with multiple top-level test files
      "**/*{.,_}{test,spec}.{js,ts}", // tests where the extension or filename suffix denotes that it is a test
      "**/vite.config.{js,ts}", // vite config
      "**/vitest.config.{js,ts}", // vitest config
      "**/rollup.config.{js,ts}", // rollup config
      "**/rollup.config.*.{js,ts}", // rollup config
      "**/eslint.config.{js,ts}", // eslint config
    ],
    optionalDependencies: false,
  }],
  "import/default": ESLINT_OFF,
  "import/namespace": ESLINT_OFF,
  "no-mixed-spaces-and-tabs": ESLINT_ERROR,
  "no-multi-assign": [ESLINT_ERROR],
  // disallow multiple empty lines, only one newline at the end, and no new lines at the beginning
  "no-multiple-empty-lines": [ESLINT_ERROR, { max: 1, maxBOF: 0, maxEOF: 0 }],
  "no-negated-condition": ESLINT_OFF,
  "no-nested-ternary": ESLINT_ERROR,
  "no-new-object": ESLINT_ERROR,
  "no-plusplus": ESLINT_ERROR,
  "no-restricted-syntax": [
    ESLINT_ERROR,
    {
      selector: "ForInStatement",
      message: "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
    },
    {
      selector: "ForOfStatement",
      message: "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
    },
    {
      selector: "LabeledStatement",
      message: "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
    },
    {
      selector: "WithStatement",
      message: "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
    },
  ],
};
