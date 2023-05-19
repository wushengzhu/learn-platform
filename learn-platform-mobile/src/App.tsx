// import { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { FIND, UPDATE } from './graphql/demo';
import { ImageUploader, Space, Toast, Dialog } from 'antd-mobile';
import useUploadOSS from './hooks/useUploadOSS';
import './App.css';

const App = () => {
  const uploadHandler = useUploadOSS();
  return <ImageUploader upload={uploadHandler} />;
};

export default App;
