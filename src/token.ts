export enum TokenType {
  Heading = 'heading',
  EOF = 'eof',
  Paragraph = 'paragraph',
  LineBreak = 'linebreak',
  CodeBlock = 'code-block',
}

export class Token {
  type: string;
  raw: string;

  constructor(type: TokenType, raw: string) {
    this.type = type;
    this.raw = raw;
  }
}

export class HeadingToken extends Token {
  level: number;
  content: string;

  constructor(raw: string) {
    super(TokenType.Heading, raw);

    const prefix = raw.match(/^#+/)![0];
    this.level = prefix.length;
    this.content = raw.replace(prefix, '').trimStart();
  }
}

export class ParagraphToken extends Token {
  content: string;

  constructor(raw: string) {
    super(TokenType.Paragraph, raw);
    this.content = raw;
  }
}

export class LineBreakToken extends Token {

  constructor(raw: string) {
    super(TokenType.LineBreak, raw);
  }
}

export class CodeBlockToken extends Token {
  lang?: string;
  fence: string;
  closed: boolean;
  content: string;


  constructor(raw: string, lang: string, fence: string, closed = true) {
    super(TokenType.CodeBlock, raw);
    this.lang = lang;
    this.fence = fence;
    this.content = raw.replace(/^(`{3}|~{3})(\w*)?(\s*)?/, '').replace(/(\s*)?(`{3})$/, '');
    this.closed = closed;
  }
}

export class EOFToken extends Token {
  constructor() {
    super(TokenType.EOF, '');
  }
}