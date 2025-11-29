export type NullPointerProviderFull = {
  url: URL;
  min_age: number;
  max_age: number;
  max_size: number;
};

export type UploadConfig = {
  token: string;
  expires: Date | null;
  secret: boolean;
  provider: number;
};

export type NullPointerProviderMinimal = {
  url: URL;
};

export type NullPointerProvider =
  | NullPointerProviderMinimal
  | NullPointerProviderFull;

export type UploadedFile = {
  name: string;
  expiration_epoch_s: number | null;
  token: string;
  upload_epoch_s: number;
  url: string;
  mime: string;
};

export type UploadFileSuccess = {
  ok: true;
  uploaded_file: UploadedFile;
};

export type UploadFileFail = {
  ok: false;
  error: string;
};

export type UploadFileRes = UploadFileFail | UploadFileSuccess;
