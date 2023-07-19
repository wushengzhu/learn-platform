import * as React from 'react';

interface Props {
  name: string;
  message: string;
}

export const HelloWorld: React.FC<Props> = ({ name, message }) => {
  return (
    <div>
      <h1>{message}</h1>
      <p>Hello {name}!</p>
    </div>
  );
};
