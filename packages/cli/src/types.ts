export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown>
    ? DeepPartial<T[P]>
    : T[P];
};

export interface Config {
  verbose: boolean;

  /**
   * Directory where the generated files
   * Default: .ikona
   */
  outputDir: string;

  /**
   * Force generation of files
   */
  force: boolean;

  icons: {
    optimize: boolean;
    inputDir: string;
    spriteOutputDir: string;

    /**
     * Hash sprite file name and export it as a JS constant.
     */
    hash: boolean;
  };

  illustrations: {
    inputDir: string;
    extensions: string[];
  };

  cwd: string;
}

export type FileConfig = Prettify<DeepPartial<Config>>;

export interface CliConfig {
  verbose?: boolean;
  v?: boolean;

  ["out-dir"]?: string;

  optimize?: boolean;

  force?: boolean;

  hash?: boolean;

  cwd?: string;
}
