import { createAsyncThunk } from '@reduxjs/toolkit';
import { type FileUploadResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import { name as sliceName } from '~/slices/articles/articles.slice.js';

const uploadFile = createAsyncThunk<
  FileUploadResponseDto,
  FormData,
  AsyncThunkConfig
>(`${sliceName}/files`, (payload, { extra }) => {
  const { fileApi } = extra;

  return fileApi.uploadFile(payload);
});

export { uploadFile };
