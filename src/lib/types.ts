export type NullPointerProviderFull = {
  url: URL;
  min_age: number;
  max_age: number;
  max_size: number;
};

export type UploadConfig = {
  expires: Date | null;
  secret: boolean;
  provider: number;
};

export type UploadOverrides = {
  enabled: boolean;
  expiration: Date | null;
  secret: boolean | null;
};

export type UploadCandidate = {
  upload_failure: null | string;
  file: File;
  overrides: UploadOverrides;
};

export type UploadManifest = Array<{
  overrides: UploadOverrides;
}>;

export type NullPointerProviderMinimal = {
  url: URL;
};

export type NullPointerProvider =
  | NullPointerProviderMinimal
  | NullPointerProviderFull;

export type UploadedFile = {
  name: string;
  size: number; // size in bytes
  expiration_epoch_ms: number;
  token: string;
  upload_epoch_ms: number;
  url: URL;
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
