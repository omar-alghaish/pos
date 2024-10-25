declare module 'quagga' {
    interface QuaggaConfig {
      inputStream: {
        name: string;
        type: string;
        target: HTMLElement | string;
        constraints: {
          facingMode: string;
        };
      };
      decoder: {
        readers: string[];
      };
    }
  
    interface QuaggaResult {
      codeResult: {
        code: string;
      };
    }
  
    interface QuaggaStatic {
      init(config: QuaggaConfig, callback: (err: any) => void): void;
      start(): void;
      stop(): void;
      onDetected(callback: (result: QuaggaResult) => void): void;
    }
  
    const Quagga: QuaggaStatic;
    export default Quagga;
  }
  