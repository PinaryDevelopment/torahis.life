import { Type } from '@angular/core';

export function setComponentPrivateProperty<TComponent>(component: TComponent, property: string, value: any) {
  (component as any)[property] = value;
}

export function getComponentPrivatePropertyValue<TComponent>(component: TComponent, property: string): any {
  return (component as any)[property];
}
