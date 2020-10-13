declare module jasmine {
  function spyOnPrivate<T>(obj: T, nameToSpyOn: string): Spy<any>;

  interface Matchers<T> {
    toBeLeftOf(element: HTMLElement, message?: string): boolean;
  }
}

beforeEach(() => {
  jasmine.addMatchers({
    toBeLeftOf: () => {
      return {
        compare: (actual: HTMLElement, expected: HTMLElement, customMessage?: string) => {
          const leftItemRightBoundary = actual?.getBoundingClientRect().right || 0;
          const rightItemLeftBoundary = expected?.getBoundingClientRect().left || 0;

          return {
            pass: !!actual && !!expected && leftItemRightBoundary <= rightItemLeftBoundary,
            get message() {
              let failureMessage = 'Expected ' + leftItemRightBoundary + ' to be less than ' + rightItemLeftBoundary;

              if (customMessage) {
                  failureMessage = ' ' + customMessage;
              }

              return failureMessage;
            }
          }
        }
      }
    }
  });

  jasmine.spyOnPrivate = (obj, nameToSpyOn) => spyOn<any>(obj, nameToSpyOn);
});
