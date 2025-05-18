import { EOFToken, HeadingToken, TokenType } from '../src/token';
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

});
