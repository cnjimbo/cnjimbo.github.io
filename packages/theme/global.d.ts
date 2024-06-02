// global.d.ts
declare global {
    interface ImportMeta {
      env: {
        [key: string]: string | undefined;
      };
    }
  }
