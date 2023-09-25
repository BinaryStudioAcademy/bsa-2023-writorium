import { createAsyncThunk } from '@reduxjs/toolkit';

import { type FileUploadResponseDto } from '~/libs/packages/file/file-api.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
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
