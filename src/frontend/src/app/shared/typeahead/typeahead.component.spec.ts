import { TestBed, waitForAsync, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { setComponentPrivateProperty } from '@testing/helper-functions';

import { Contracts } from '@contracts/index';

import { TypeaheadComponent } from './typeahead.component';
import { Component } from '@angular/core';

@Component({
  selector: 'pd-fake-typeahead-container',
  template: `
  <pd-typeahead [fetcher]="fetcher">
    <ng-template let-item #itemTemplate>{{item}}</ng-template>
  </pd-typeahead>
  `
})
class FakeTypeaheadContainerComponent {
  fetcher = () => of(['foo']);
}

describe('TypeaheadComponent', () => {
  let fixture: ComponentFixture<TypeaheadComponent<Contracts.AudioMedia>>;
  let component: TypeaheadComponent<Contracts.AudioMedia>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TypeaheadComponent,
        FakeTypeaheadContainerComponent
      ],
      imports: [
        RouterTestingModule,
        FontAwesomeTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<TypeaheadComponent<Contracts.AudioMedia>>(TypeaheadComponent);
    component = fixture.componentInstance;
  });

  describe('unit:ts', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should toggle showTypeahead appropriately', fakeAsync(() => {
      expect(component.showTypeahead).toBe(false);

      component.onFocus();
      tick(100);
      expect(component.showTypeahead).toBe(true);

      component.onBlur();
      tick(100);
      expect(component.showTypeahead).toBe(false);
    }));

    it('should emit itemClicked when onClick is invoked', fakeAsync(() => {
      const itemClickedSpy = spyOn(component.itemClicked, 'emit');
      const item = {
        id: '1',
        series: 'a',
        title: 'b',
        versions: [],
        author: { id: 1, name: 'c' },
        date: new Date(Date.now())
      };
      component.onClick(item);

      expect(itemClickedSpy).toHaveBeenCalledTimes(1);
      expect(itemClickedSpy).toHaveBeenCalledWith(item);
    }));
  });

  describe('marble:searchResults$', () => {
    let scheduler: TestScheduler;

    beforeEach(() => scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected)));

    it('should not perform a search if there is no input', () => {
      const spy = jasmine.createSpy('fetcher');
      component.fetcher = spy;
      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: '' });
        setComponentPrivateProperty(component, 'input', inputMock);
        fixture.detectChanges();
        const expectedSearchResults = { a: [] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(spy.calls.count()).toBe(0);
      });
    });

    it('should not perform a search if there is whitespace input', () => {
      const spy = jasmine.createSpy('fetcher');
      component.fetcher = spy;
      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: ' ' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(spy.calls.count()).toBe(0);
      });
    });

    it('should perform a search if there is input', () => {
      const spy = jasmine.createSpy('fetcher');
      spy.and.returnValue(of([{} as Contracts.AudioMedia]));
      component.fetcher = spy;

      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [{}] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(spy.calls.count()).toBe(1);
      });
    });

    it('should only perform one search if there are two like inputs in a row', () => {
      const spy = jasmine.createSpy('fetcher');
      spy.and.returnValue(of([{} as Contracts.AudioMedia]));
      component.fetcher = spy;

      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'ab';
        const inputMock = cold(expectedMarble, { a: 'a', b: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [{}] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(spy.calls.count()).toBe(1);
      });
    });

    it('should update searchTerm', () => {
      component.fetcher = () => of([{} as Contracts.AudioMedia]);

      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [{}] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(component.searchTerm).toBe('a');
      });
    });

    it('should give results to later subscribers', () => {
      const spy = jasmine.createSpy('fetcher');
      spy.and.returnValue(of([{} as Contracts.AudioMedia]));
      component.fetcher = spy;

      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [{}] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(component.searchTerm).toBe('a');
        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
      });
    });
  });

  describe('unit:DOM', () => {
    let searchContainer: HTMLElement;

    beforeEach(() => {
      searchContainer = fixture.nativeElement;
    });

    it('should display search icon to left of input', () => {
      const iconElement = searchContainer.querySelector<HTMLElement>('fa-icon');
      const inputElement = searchContainer.querySelector<HTMLInputElement>('input');
      if (!inputElement) {
        fail();
      } else {
        expect(iconElement).toBeLeftOf(inputElement);
      }
    });

    it('should invoke onFocus() when search input is focused', () => {
      const inputElement = searchContainer.querySelector<HTMLInputElement>('input');

      const focusSpy = spyOn(component, 'onFocus');
      const focusEvent = new Event('focus');
      inputElement?.dispatchEvent(focusEvent);

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke onBlur() when search input is blurred', () => {
      const inputElement = searchContainer.querySelector<HTMLInputElement>('input');

      const blurSpy = spyOn(component, 'onBlur');
      inputElement?.dispatchEvent(new Event('blur'));

      expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke onKeyup() when text is entered in search input', fakeAsync(() => {
      component.fetcher = () => of([]);

      const inputElement = searchContainer.querySelector<HTMLInputElement>('input');
      const focusEvent = new Event('focus');
      inputElement?.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const keyupSpy = spyOn(component, 'onKeyup').and.callThrough();
      const keyupEvent = new KeyboardEvent('keyup', { key: 'a' });
      if (inputElement) {
        inputElement.value = 'a';
      }
      inputElement?.dispatchEvent(keyupEvent);
      fixture.detectChanges();

      tick();
      expect(keyupSpy).toHaveBeenCalledTimes(1);
      expect(keyupSpy).toHaveBeenCalledWith(keyupEvent);
      expect(component.searchTerm).toBe('a');
    }));
  });

  describe('marble:DOM', () => {
    let scheduler: TestScheduler;
    let searchContainer: HTMLElement;

    beforeEach(() => {
      searchContainer = fixture.nativeElement;
      scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
    });

    it('should display no results message', () => {
      component.fetcher = () => of([]);

      scheduler.run(({ cold, expectObservable, flush }) => {
        component.onFocus();
        const expectedMarble = 'a';
        const searchTerm = 'a';
        const inputMock = cold(expectedMarble, { a: searchTerm });
        setComponentPrivateProperty(component, 'input', inputMock);
        fixture.detectChanges();
        const expectedSearchResults = { a: [] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        fixture.detectChanges();
        const typeahead = searchContainer.querySelector('div.typeahead');
        expect(typeahead).not.toBeNull();
        expect(typeahead?.textContent?.trim()).toBe(`No results matched "${searchTerm}".`);
      });
    });

    it('should display results', () => {
      const apiReturnValue = [
        {
          id: '1',
          series: 'a',
          title: 'b',
          versions: [],
          author: { id: 1, name: 'c' },
          date: new Date(Date.now())
        }
      ];
      component.fetcher = () => of(apiReturnValue);

      scheduler.run(({ cold, expectObservable, flush }) => {
        component.onFocus();
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        fixture.detectChanges();
        const expectedSearchResults = { a: apiReturnValue };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        fixture.detectChanges();
        const typeahead = searchContainer.querySelector('ol.typeahead');
        expect(typeahead).not.toBeNull();
        const items = typeahead?.querySelectorAll('li');
        expect(items?.length).toBe(1);
      });
    });

    it('should render template', fakeAsync(() => {
      const fakeFixture = TestBed.createComponent(FakeTypeaheadContainerComponent);
      const typeahead = fakeFixture.nativeElement.querySelector('pd-typeahead');
      const input = typeahead.querySelector('input');
      const focusEvent = new Event('focus');
      input?.dispatchEvent(focusEvent);
      fakeFixture.detectChanges();

      const keyupEvent = new KeyboardEvent('keyup', { key: 'a' });
      if (input) {
        input.value = 'a';
      }
      input?.dispatchEvent(keyupEvent);
      fakeFixture.detectChanges();

      tick();
      fakeFixture.detectChanges();

      const items = typeahead.querySelectorAll('.typeahead li');
      expect(items.length).toBe(1);
      expect(items[0].textContent.trim()).toBe('foo');
    }));

    it('should invoke onClick() when an item is clicked', () => {
      const apiReturnValue = [
        {
          id: '1',
          series: 'a',
          title: 'b',
          versions: [],
          author: { id: 1, name: 'c' },
          date: new Date(Date.now())
        }
      ];
      component.fetcher = () => of(apiReturnValue);

      scheduler.run(({ cold, flush }) => {
        component.onFocus();
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        fixture.detectChanges();

        flush();
        fixture.detectChanges();
        const typeahead = searchContainer.querySelector('ol.typeahead');

        const onClickSpy = spyOn(component, 'onClick');

        const item = typeahead?.querySelector('li');

        const click = new MouseEvent('click');
        item?.dispatchEvent(click);
        fixture.detectChanges();
        expect(onClickSpy).toHaveBeenCalledTimes(1);
        expect(onClickSpy).toHaveBeenCalledWith(apiReturnValue[0]);
      });
    });
  });
});
