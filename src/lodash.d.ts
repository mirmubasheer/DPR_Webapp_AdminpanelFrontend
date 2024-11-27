declare module 'lodash/debounce' {
    import { DebounceSettings } from 'lodash';
  
    function debounce<T extends (...args: any[]) => any>(
      func: T,
      wait?: number,
      options?: DebounceSettings
    ): T & { cancel(): void };
  
    export default debounce;
  }
  