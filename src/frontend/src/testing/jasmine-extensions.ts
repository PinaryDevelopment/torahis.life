/* tslint:disable-next-line:no-namespace no-internal-module */
declare module jasmine {
  /*
    The proper typing for a method like this would be as follows:
    function spyOnPrivate<T, K extends keyof T = keyof T>(obj: T, nameToSpyOn: T[K] extends Function ? K : never): Spy<jasmine.Func>;

    Since this method is spying on private methods, Typescript won't see those methods and the 'T[K] extends Function' type check will fail.
    Use any instead to sidestep this issue.
  */
  /* tslint:disable-next-line:no-any */
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
            get message(): string {
              let failureMessage = 'Expected ' + leftItemRightBoundary + ' to be less than ' + rightItemLeftBoundary;

              if (customMessage) {
                  failureMessage = ' ' + customMessage;
              }

              return failureMessage;
            }
          };
        }
      };
    }
  });

  /*
  The proper typing for a method like this would be as follows:
  jasmine.spyOnPrivate =
    <T, K extends keyof T = keyof T>(obj: T, nameToSpyOn: T[K] extends Function ? K : never) =>
      spyOn(obj, nameToSpyOn);
    Since this method is spying on private methods, Typescript won't see those methods and the 'T[K] extends Function' type check will fail.
    Use any instead to sidestep this issue.
  */
  /* tslint:disable-next-line:no-any */
  jasmine.spyOnPrivate = (obj, nameToSpyOn) => spyOn<any>(obj, nameToSpyOn);
});
