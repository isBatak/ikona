export interface Config {
  verbose?: boolean;

  /**
   * Directory where the generated files
   * Default: .ikona
   */
  outputDir?: string;

  /**
   * Force generation of files
   */
  force?: boolean;

  icons: {
    optimize?: boolean;
    inputDir: string;
    spriteOutputDir: string;

    /**
     * Hash sprite file name and exoprt it as a JS constant.
     */
    hash?: boolean;
  };

  illustrations: {
    inputDir: string;
  };
}

export interface CliConfig {
  verbose?: boolean;
  v?: boolean;

  ['out-dir']?: string;

  optimize?: boolean;

  force?: boolean;

  hash?: boolean;
}
