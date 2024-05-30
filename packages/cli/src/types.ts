export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

export interface Config {
  verbose?: boolean;

  /**
   * Directory where the generated files
   * Default: .ikona
   */
  outputDir: string;

  /**
   * Force generation of files
   */
  force?: boolean;

  icons: {
    optimize?: boolean;
    inputDir: string;
    spriteOutputDir: string;

    /**
     * Hash sprite file name and export it as a JS constant.
     */
    hash?: boolean;
  };

  illustrations: {
    inputDir: string;
  };

  cwd: string;
}

export type DefaultConfig = Required<Pick<Config, "outputDir" | "cwd">>;

export type FileConfig = Prettify<
  Omit<Config, "outputDir" | "cwd"> & Partial<Pick<Config, "outputDir" | "cwd">>
>;

export interface CliConfig {
  verbose?: boolean;
  v?: boolean;

  ["out-dir"]?: string;

  optimize?: boolean;

  force?: boolean;

  hash?: boolean;

  cwd?: string;
}
