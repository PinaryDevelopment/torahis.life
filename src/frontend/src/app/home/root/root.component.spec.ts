import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { setComponentPrivateProperty } from '@testing/helper-functions';

import { AudioMediaService } from '@audio-media/index';

import { RootComponent } from '@home/index';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SearchOptions } from '@contracts/data';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

@Component({ selector: 'pd-typeahead' }) class FakeTypeaheadComponent<T> {
  @Input() itemTemplate: TemplateRef<T> | null = null;
  @Input() fetcher: ((searchOptions: SearchOptions) => Observable<T[]>) | null = null;
  @Output() itemClicked: EventEmitter<T> = new EventEmitter<T>();
}

@Component({ selector: 'pd-empty' }) class EmptyComponent {}

describe('RootComponent', () => {
  let fixture: ComponentFixture<RootComponent>;
  let component: RootComponent;

  let audioMediaServiceSpy: jasmine.SpyObj<AudioMediaService>;

  beforeEach(waitForAsync(() => {
    audioMediaServiceSpy = jasmine.createSpyObj<AudioMediaService>('AudioMediaService', ['search']);

    TestBed.configureTestingModule({
      declarations: [
        RootComponent,
        FakeTypeaheadComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: EmptyComponent },
          { path: 'audio/:id', component: EmptyComponent }
        ]),
        FontAwesomeTestingModule
      ],
      providers: [
        { provide: AudioMediaService, useValue: audioMediaServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
  });

  describe('unit:ts', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have the correct copyright year(s)', () => {
      setComponentPrivateProperty(component, 'currentYear', 2020);
      expect(component.copyrightYearString).toBe('2020');

      setComponentPrivateProperty(component, 'currentYear', 2030);
      expect(component.copyrightYearString).toBe('2020 - 2030');
    });

    it('should call router navigate when navigateToItem is invoked', () => {
      const item = {
        id: '1',
        series: 'a',
        title: 'b',
        versions: [],
        author: { id: 1, name: 'c' },
        date: new Date(Date.now())
      };
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigate');
      component.navigateToItem(item);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(['audio', item.id]);
    });
  });

  describe('unit:DOM', () => {
    let header: HTMLElement;
    let footer: HTMLElement;

    beforeEach(() => {
      header = fixture.nativeElement.querySelector('header');
      footer = fixture.nativeElement.querySelector('footer');
    });

    it('should display footer copyright text', () => {
      setComponentPrivateProperty(component, 'currentYear', 2020);
      fixture.detectChanges();
      expect(footer.textContent).toBe(`Powered by Pinary Development LLC © 2020`);
    });

    it('should display site name in header', () => {
      expect(header.textContent).toBe(`TorahIs.Life`);
    });

    it('should display icon to left of heading', () => {
      const iconElement = header.querySelector<HTMLElement>('fa-icon');
      const headingElement = header.querySelector<HTMLHeadingElement>('h1');
      if (!headingElement) {
        fail();
      } else {
        expect(iconElement).toBeLeftOf(headingElement);
      }
    });

    it('should invoke navigateToItem when typeahead itemClicked occurs', () => {
      const item = {
        id: '1',
        series: 'a',
        title: 'b',
        versions: [],
        author: { id: 1, name: 'c' },
        date: new Date(Date.now())
      };
      const navigateToItemSpy = spyOn(component, 'navigateToItem');
      const typeaheadComponent = fixture.debugElement.query(By.directive(FakeTypeaheadComponent));
      typeaheadComponent.componentInstance.itemClicked.emit(item);
      expect(navigateToItemSpy).toHaveBeenCalledTimes(1);
      expect(navigateToItemSpy).toHaveBeenCalledWith(item);
    });
  });
});
