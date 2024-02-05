export class CommonUtil {
  public static splitIntoBatches(source: any, batchSize: number) {
    const batches = [];
    for (let i = 0; i < source.length; i += batchSize) {
      batches.push(source.slice(i, i + batchSize));
    }
    return batches;
  }

  public static delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static async convertToBase64(data: any) {
    try {
      if (data) {
        const response = await fetch(data);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString('base64');
          return base64;
        }
      }
    } catch (error: any) {
      console.error('Error converting to Base64:', error.message);
      return null;
    }
  }
}
