# Rosetta
Goal is to have a robust markdown system that works with LaTeX and mermaid Diagrams

## Status

### 🧱 Block-Level Elements
| ✅ Impl | ✅ Token | ✅ AST | ✅ Render | Type              | Syntax Example                  | Notes                             |                |
| ------ | ------ | ----- | -------- | ----------------- | ------------------------------- | --------------------------------- | -------------- |
| 🛠️      | ✅      | ❌     | ❌        | `heading`         | `# H1`, `## H2`, …              | 6 levels (`#` to `######`)        |                |
| ❌      | ❌      | ❌     | ❌        | `paragraph`       | Text separated by blank lines   | Most common block                 |                |
| ❌      | ❌      | ❌     | ❌        | `blockquote`      | `> blockquote`                  | Can be nested (`>>`)              |                |
| ❌      | ❌      | ❌     | ❌        | `list_item`       | `- item`, `* item`, `1. item`   | Ordered & unordered               |                |
| ❌      | ❌      | ❌     | ❌        | `list`            | A group of `list_item`s         | Unordered, ordered, or task lists |                |
| ❌      | ❌      | ❌     | ❌        | `code_block`      | Indented or fenced with ` ``` ` | Optional language tag             |                |
| ❌      | ❌      | ❌     | ❌        | `thematic_break`  | `---`, `***`, `___`             | Horizontal rule                   |                |
| ❌      | ❌      | ❌     | ❌        | `html_block`      | Raw HTML tags like `<div>`      | Dangerous in some renderers       |                |
| ❌      | ❌      | ❌     | ❌        | `table`           | GFM only, uses pipes (\`        | \`)                               | Rows and cells |
| ❌      | ❌      | ❌     | ❌        | `definition_list` | `Term\n: Definition`            | Rare, in Markdown Extra           |                |
| ❌      | ❌      | ❌     | ❌        | `math_block`      | `$$ math $$`                    | Common in Obsidian/LaTeX-style    |                |
| ❌      | ❌      | ❌     | ❌        | `diagram_block`   | ` ```mermaid `                  | Mermaid, PlantUML, etc.           |                |
| ❌      | ❌      | ❌     | ❌        | `front_matter`    | `---` at start (YAML)           | Static site generators            |                |
| ❌      | ❌      | ❌     | ❌        | `task_list_item`  | `- [ ] task`, `- [x] done`      | GitHub flavored                   |                |
| ❌      | ❌      | ❌     | ❌        | `footnote_def`    | `[^1]: Footnote text`           | Footnotes support                 |                |


### ✍️ Inline Elements
| ✅ Impl | ✅ Token | ✅ AST | ✅ Render | Type               | Syntax Example               | Notes                          |
| ------ | ------ | ----- | -------- | ------------------ | ---------------------------- | ------------------------------ |
| ❌      | ❌      | ❌     | ❌        | `text`             | Any plain text               | Base content node              |
| ❌      | ❌      | ❌     | ❌        | `emphasis`         | `*em*` or `_em_`             | Italic                         |
| ❌      | ❌      | ❌     | ❌        | `strong`           | `**strong**` or `__strong__` | Bold                           |
| ❌      | ❌      | ❌     | ❌        | `strikethrough`    | `~~strike~~`                 | GFM                            |
| ❌      | ❌      | ❌     | ❌        | `inline_code`      | `` `code` ``                 | One-liner                      |
| ❌      | ❌      | ❌     | ❌        | `link`             | `[text](url)`                | Optional title                 |
| ❌      | ❌      | ❌     | ❌        | `image`            | `![alt](url)`                | Like link with `!`             |
| ❌      | ❌      | ❌     | ❌        | `footnote_ref`     | `[^1]`                       | Refers to footnote             |
| ❌      | ❌      | ❌     | ❌        | `inline_math`      | `$a^2 + b^2 = c^2$`          | KaTeX/LaTeX style              |
| ❌      | ❌      | ❌     | ❌        | `autolink`         | `<http://example.com>`       | Auto-wrapped links             |
| ❌      | ❌      | ❌     | ❌        | `html_inline`      | `<span>inline</span>`        | Raw HTML                       |
| ❌      | ❌      | ❌     | ❌        | `escape_sequence`  | `\*not bold\*`               | Escapes special characters     |
| ❌      | ❌      | ❌     | ❌        | `emoji`            | `:smile:`                    | GitHub / custom parser feature |
| ❌      | ❌      | ❌     | ❌        | `mention`          | `@user`, `#channel`          | Slack-style extensions         |
| ❌      | ❌      | ❌     | ❌        | `inline_component` | `<MyComponent prop="val" />` | JSX-like in MDX                |

