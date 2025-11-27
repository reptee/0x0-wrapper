export type NullPointerProviderFull = {
  url: string;
  min_age: number;
  max_age: number;
  max_size: number;
};

type Expiry = { epoch_ms: number } | { hours: number };

export type UploadConfig = {
  token: string;
  expires: Expiry;
  secret: boolean;
};

type NullPointerProviderMinimal = {
  url: string;
};

export type NullPointerProvider =
  | NullPointerProviderMinimal
  | NullPointerProviderFull;
