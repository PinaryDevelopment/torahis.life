export function setComponentPrivateProperty<TComponent>(component: TComponent, property: string, value: unknown): void {
  /* tslint:disable-next-line:no-any */
  (component as any)[property] = value;
}

export function getComponentPrivatePropertyValue<TComponent>(component: TComponent, property: string): unknown {
  /* tslint:disable-next-line:no-any */
  return (component as any)[property];
}
