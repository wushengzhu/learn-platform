// import { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { FIND, UPDATE } from './graphql/demo';
import useUploadOSS from './hooks/useUploadOSS';
import './App.css';

const App = () => {
  useUploadOSS();
  return <div />;
};

export default App;
