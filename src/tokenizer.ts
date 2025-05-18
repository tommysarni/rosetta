import { Token, HeadingToken, EOFToken } from './token';

export function tokenize(input: string): Token[] {
  const lines = input.split('\n');
  if (!lines.length) return [new EOFToken()];
  const tokens = [];
  let i = -1;

  while ((i + 1) < lines.length) {
    const line = lines[++i];

    // --- Block Level Elements --- 
    
    // Headings
    if (/^#{1,6} /.test(line)) {
      tokens.push(new HeadingToken(line));
      continue;
    }

  }


  tokens.push(new EOFToken());
  return tokens;

}

export { HeadingToken };
