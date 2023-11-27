export function calculateFileSizeInKB(str: string) {
    const buffer = Buffer.from(str, 'utf-8');
    const fileSizeInKB = buffer.length / 1024;
  
    return fileSizeInKB;
  }