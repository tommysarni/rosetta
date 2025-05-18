import { Token, HeadingToken, EOFToken, ParagraphToken, LineBreakToken, CodeBlockToken } from './token';

export function tokenize(input: string): Token[] {
  if (!input.length) return [new EOFToken()];
  const lines = input.split('\n');

  const codeBlock: { inCodeBlock: boolean, currentContent: string[], currentLang: string, fence: string } = {
    inCodeBlock: false,
    currentContent: [],
    currentLang: '',
    fence: ''
  }

  let paragraphLines: string[] = [];

  function flushParagraph() {
    if (paragraphLines.length > 0) {
      tokens.push(new ParagraphToken(paragraphLines.join('\n')));
      paragraphLines = [];
    }
  }

  const tokens = [];
  let i = -1;

  while ((i + 1) < lines.length) {
    const line = lines[++i];

    if (!codeBlock.inCodeBlock && line.trim() === '') {
      flushParagraph();
      continue;
    }

    // --- Block Level Elements --- 

    // Headings
    if (/^#{1,6} /.test(line)) {
      tokens.push(new HeadingToken(line));
      continue;
    }

    // Line Break
    if (/^([*]{3}|[-]{3}|[_]{3}) /.test(line)) {
      tokens.push(new LineBreakToken(line));
      continue;
    }

    // Code Block
    const fenceMatch = line.match(/^(`{3}|~{3})(\w*)?/);
    if (fenceMatch) {
      const [, currentFence, lang] = fenceMatch;

      if (!codeBlock.inCodeBlock) {
        // start of code block
        codeBlock.inCodeBlock = true;
        codeBlock.fence = currentFence;
        codeBlock.currentLang = lang;
        codeBlock.currentContent = [line];
      } else if (codeBlock.inCodeBlock && currentFence === codeBlock.fence) {
        // end of code block
        codeBlock.currentContent.push(line);
        tokens.push(new CodeBlockToken(codeBlock.currentContent.join('\n'), codeBlock.currentLang, codeBlock.fence))
        codeBlock.inCodeBlock = false;
        codeBlock.fence = '';
        codeBlock.currentLang = '';
      }

      continue;
    }

    if (codeBlock.inCodeBlock) {
      codeBlock.currentContent.push(line);
      continue;
    }

    // Default: Paragraph Line
    paragraphLines.push(line);
  }


  // --- Post Loop Tokenizing --- 
  // Flush any remaining paragraph at end of input
  flushParagraph();

  // Handle unclosed (malformed) code block
  if (codeBlock.inCodeBlock) {
    tokens.push(new CodeBlockToken(codeBlock.currentContent.join('\n'), codeBlock.currentLang, codeBlock.fence, false));
  }

  tokens.push(new EOFToken());
  return tokens;

}

export { HeadingToken };
