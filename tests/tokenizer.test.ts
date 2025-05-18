import { EOFToken, HeadingToken, ParagraphToken, TokenType } from '../src/token';
import { tokenize } from '../src/tokenizer';

describe('Tokenizer', () => {

  it(`empty`, () => {
    const input = '';
    const tokens = tokenize(input);

    expect(tokens.length).toBe(1);
    const [token] = tokens;
    expect(token).toBeInstanceOf(EOFToken);
    if (token instanceof EOFToken) {
      expect(token.type).toBe(TokenType.EOF);
      expect(token.raw).toBe('');
    }

  });


  describe('Headings', () => {

    for (let i = 1; i <= 6; i++) {
      it(`h${i}`, () => {
        const input = "#".repeat(i) + " Heading " + i;
        const [heading, eof] = tokenize(input);

        expect(heading.type).toBe(TokenType.Heading);
        expect(heading).toBeInstanceOf(HeadingToken);
        expect(eof).toBeInstanceOf(EOFToken);
        if (heading instanceof HeadingToken) {
          expect(heading.level).toBe(i);
          expect(heading.content).toBe("Heading " + i);
        }
      });
    }

    it('h2 + h5', () => {
      const input = "## Subheading\n##### Caption";
      const tokens = tokenize(input);

      expect(tokens.length).toBe(3);
      const [subheading, caption, eof] = tokens;

      expect(subheading).toBeInstanceOf(HeadingToken);
      if (subheading instanceof HeadingToken) {
        expect(subheading.level).toBe(2);
        expect(subheading.content).toBe('Subheading');
      }

      expect(caption).toBeInstanceOf(HeadingToken);
      if (caption instanceof HeadingToken) {
        expect(caption.level).toBe(5);
      }

      expect(eof).toBeInstanceOf(EOFToken);
    })

  });

  describe('Paragraph', () => {

    it('text with no newlines', () => {
      const input = " I am a paragraph ";
      const tokens = tokenize(input);
      expect(tokens.length).toBe(2);
      const [paragraph] = tokens;
      expect(paragraph).toBeInstanceOf(ParagraphToken);
      if (paragraph instanceof ParagraphToken) {
        expect(paragraph.content).toBe(' I am a paragraph ');
      }
    })

    it('simple newline text newline', () => {
      const input = "\n I am a paragraph \n";
      const tokens = tokenize(input);
      expect(tokens.length).toBe(2);
      const [paragraph] = tokens;
      expect(paragraph).toBeInstanceOf(ParagraphToken);
      if (paragraph instanceof ParagraphToken) {
        expect(paragraph.content).toBe(' I am a paragraph ');
      }
    })

    it('newline text then eof', () => {
      const input = "\n I am a paragraph ";
      const tokens = tokenize(input);
      expect(tokens.length).toBe(2);
      const [paragraph] = tokens;
      expect(paragraph).toBeInstanceOf(ParagraphToken);
      if (paragraph instanceof ParagraphToken) {
        expect(paragraph.content).toBe(' I am a paragraph ');
      }
    })

    it('sof text then newline', () => {
      const input = "\n I am a paragraph ";
      const tokens = tokenize(input);
      expect(tokens.length).toBe(2);
      const [paragraph] = tokens;
      expect(paragraph).toBeInstanceOf(ParagraphToken);
      if (paragraph instanceof ParagraphToken) {
        expect(paragraph.content).toBe(' I am a paragraph ');
      }
    });

    it('Multiline paragraph', () => {
      const input = "\nI am a paragraph.\nI am a part of it too!";
      const tokens = tokenize(input);
      expect(tokens.length).toBe(2);
      const [paragraph] = tokens;
      expect(paragraph).toBeInstanceOf(ParagraphToken);
      if (paragraph instanceof ParagraphToken) {
        expect(paragraph.content).toBe('I am a paragraph.\nI am a part of it too!');
      }
    })

    it('Separate paragraphs', () => {
      const input = "I am a paragraph.\n\nI am not part of it!";
      const tokens = tokenize(input);
      expect(tokens.length).toBe(3);
      const [p1, p2] = tokens;
      expect(p1).toBeInstanceOf(ParagraphToken);
      if (p1 instanceof ParagraphToken) {
        expect(p1.content).toBe('I am a paragraph.');
      }
      expect(p2).toBeInstanceOf(ParagraphToken);
      if (p2 instanceof ParagraphToken) {
        expect(p2.content).toBe('I am not part of it!');
      }
    })

  })

  describe('Combinations', () => {

    it('heading then paragraph', () => {
      const input = "# Heading\nCaption\n";
      const tokens = tokenize(input);
      console.log(tokens)
      expect(tokens.length).toBe(3);
      const [heading, paragraph] = tokens;

      expect(heading).toBeInstanceOf(HeadingToken);
      if (heading instanceof HeadingToken) {
        expect(heading.level).toBe(1);
      }

      expect(paragraph).toBeInstanceOf(ParagraphToken);
      if (paragraph instanceof ParagraphToken) {
        expect(paragraph.content).toBe('Caption');
      }

    })

    it('heading in newlines', () => {
      const input = "\n## Subheading\n";
      const tokens = tokenize(input);

      expect(tokens.length).toBe(2);
      const [subheading, eof] = tokens;

      expect(subheading).toBeInstanceOf(HeadingToken);
      if (subheading instanceof HeadingToken) {
        expect(subheading.level).toBe(2);
        expect(subheading.content).toBe('Subheading');
      }

      expect(eof).toBeInstanceOf(EOFToken);
    });

    it('Headings with 2 types of paragraphs', () => {
      const input = "# Heading\nHere is some text underneath\nSome more text as a new line\n\n## Heading 2\nSome caption text.\n\nMore text";
      const tokens = tokenize(input);

      expect(tokens.length).toBe(6);
      const [h1, p1, h2, p2, p3] = tokens;

      expect(h1).toBeInstanceOf(HeadingToken);
      expect(h2).toBeInstanceOf(HeadingToken);
      expect(p1).toBeInstanceOf(ParagraphToken);
      if (p1 instanceof ParagraphToken) {
        expect(p1.content).toBe('Here is some text underneath\nSome more text as a new line');
      }
      expect(p2).toBeInstanceOf(ParagraphToken);
      expect(p3).toBeInstanceOf(ParagraphToken);
      if (p3 instanceof ParagraphToken) {
        expect(p3.content).toBe('More text');
      }

    })
  })

});
