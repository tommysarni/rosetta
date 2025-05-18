import { Token, HeadingToken, EOFToken, ParagraphToken, LineBreakToken } from './token';

export function tokenize(input: string): Token[] {
  if (!input.length) return [new EOFToken()];
  const lines = input.split('\n');

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

    if (line.trim() === '') {
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

    // Default: Paragraph Line
    paragraphLines.push(line);
  }


  // Flush any remaining paragraph at end of input
  flushParagraph();

  tokens.push(new EOFToken());
  return tokens;

}

export { HeadingToken };
