declare module 'kursor' {
  export default class Kursor {
    constructor(props: {
      el?: string;
      type?: number;
      removeDefaultCursor?: boolean;
      color?: string;
    });
    hidden(isHidden?: boolean): void;
    color(color: string): void;
    // Add other methods as needed based on library documentation/source
  }
}
