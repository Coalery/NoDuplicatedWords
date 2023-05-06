import * as React from 'react';
import { Chance } from 'chance';
import type { HeadFC, PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = () => {
  const [words, setWords] = React.useState<string[]>([]);
  const [input, setInput] = React.useState<string>('');
  const [randomOne, setRandomOne] = React.useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inp = e.target.value;

    setInput(inp);
    setWords(
      Array.from(
        new Set(
          inp
            .split('\n')
            .flatMap((v) => v.replaceAll(/([a-z])([A-Z])/g, '$1,$2'))
            .flatMap((v) => v.split(','))
            .filter((v) => !!v)
            .map((v) => v.toString())
        )
      ).sort()
    );
  };

  const onClickCopyAll = () => {
    const result = words.join('\n');
    navigator.clipboard.writeText(result);
  };

  const onClickRandomOne = () => {
    if (words.length === 0) {
      return;
    }

    const chance = new Chance();

    const randomIdx = chance.integer({ min: 0, max: words.length - 1 });
    const result = words[randomIdx];

    setRandomOne(result);
  };

  return (
    <div style={{ padding: '16px' }}>
      <div>
        <textarea
          style={{
            width: '100%',
            minHeight: '300px',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
          value={input}
          onChange={onChange}
        />
      </div>
      <div>
        <button
          onClick={onClickCopyAll}
          style={{ width: '100%', height: '40px' }}
        >
          Copy All
        </button>
      </div>
      {randomOne && <h3>{randomOne}</h3>}
      <div>
        <button
          onClick={onClickRandomOne}
          style={{ width: '100%', height: '40px' }}
        >
          Get Random One
        </button>
      </div>
      <div>
        <p>Length: {words.length}</p>
        <ul>
          {words.map((word, idx) => (
            <li key={idx}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>No duplicated words</title>;
