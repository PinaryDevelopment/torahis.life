import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { setComponentPrivateProperty } from '@testing/helper-functions';

import { Contracts } from '@contracts/index';
import { AudioMediaService } from '@audio-media/index';

import { RootComponent } from '@home/index';

describe('RootComponent', () => {
  let fixture: ComponentFixture<RootComponent>;
  let component: RootComponent;

  let audioMediaServiceSpy: jasmine.SpyObj<AudioMediaService>;

  beforeEach(async(() => {
    audioMediaServiceSpy = jasmine.createSpyObj<AudioMediaService>('AudioMediaService', ['search']);

    TestBed.configureTestingModule({
      declarations: [
        RootComponent
      ],
      imports: [
        RouterTestingModule,
        FontAwesomeTestingModule
      ],
      providers: [
        { provide: AudioMediaService, useValue: audioMediaServiceSpy }
      ]
    }).compileComponents();
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

    it('should toggle showTypeahead appropriately', () => {
      expect(component.showTypeahead).toBe(false);

      component.onFocus();
      expect(component.showTypeahead).toBe(true);

      component.onBlur();
      expect(component.showTypeahead).toBe(false);
    });
  });

  describe('marble:searchResults$', () => {
    let scheduler: TestScheduler;

    beforeEach(() => scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected)));

    it('should not perform a search if there is no input', () => {
      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: '' });
        setComponentPrivateProperty(component, 'input', inputMock);
        fixture.detectChanges();
        const expectedSearchResults = { a: [] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(audioMediaServiceSpy.search.calls.count()).toBe(0);
      });
    });

    it('should not perform a search if there is whitespace input', () => {
      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: ' ' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(audioMediaServiceSpy.search.calls.count()).toBe(0);
      });
    });

    it('should perform a search if there is input', () => {
      audioMediaServiceSpy.search.and.returnValue(of([{} as Contracts.AudioMedia]));

      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'a';
        const inputMock = cold(expectedMarble, { a: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [{}] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(audioMediaServiceSpy.search.calls.count()).toBe(1);
      });
    });

    it('should only perform one search if there are two like inputs in a row', () => {
      audioMediaServiceSpy.search.and.returnValue(of([{} as Contracts.AudioMedia]));

      scheduler.run(({ cold, expectObservable, flush }) => {
        const expectedMarble = 'ab';
        const inputMock = cold(expectedMarble, { a: 'a', b: 'a' });
        setComponentPrivateProperty(component, 'input', inputMock);
        const expectedSearchResults = { a: [{}] };

        expectObservable(component.searchResults$).toBe('a', expectedSearchResults);
        flush();
        expect(audioMediaServiceSpy.search.calls.count()).toBe(1);
      });
    });

    it('should update searchTerm', () => {
      audioMediaServiceSpy.search.and.returnValue(of([{} as Contracts.AudioMedia]));

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
      const results = [{} as Contracts.AudioMedia];
      audioMediaServiceSpy.search.and.returnValue(of(results));

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
    let header: HTMLElement;
    let footer: HTMLElement;
    let searchContainer: HTMLDivElement;

    beforeEach(() => {
      header = fixture.nativeElement.querySelector('header');
      footer = fixture.nativeElement.querySelector('footer');
      searchContainer = fixture.nativeElement.querySelector('.search-container');
    });

    it('should display footer copyright text', () => {
      setComponentPrivateProperty(component, 'currentYear', 2020);
      fixture.detectChanges();
      expect(footer.textContent).toBe(`Powered by Pinary Development LLC © 2020`)
    });

    it('should display site name in header', () => {
      expect(header.textContent).toBe(`TorahIs.Life`)
    });

    it('should display icon to left of heading', () => {
      const iconElement = header.querySelector<HTMLElement>('fa-icon');
      const headingElement = header.querySelector<HTMLHeadingElement>('h1');
      expect(iconElement).toBeLeftOf(headingElement);
    });

    it('should display search icon to left of input', () => {
      const iconElement = searchContainer.querySelector<HTMLElement>('fa-icon');
      const inputElement = searchContainer.querySelector<HTMLInputElement>('input');
      expect(iconElement).toBeLeftOf(inputElement);
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
      audioMediaServiceSpy.search.and.returnValue(of([]));

      const inputElement = searchContainer.querySelector<HTMLInputElement>('input');
      const focusEvent = new Event('focus');
      inputElement?.dispatchEvent(focusEvent);
      fixture.detectChanges();

      const keyupSpy = spyOn(component, 'onKeyup').and.callThrough();
      const keyupEvent = new KeyboardEvent('keyup', { key: 'a' });
      if (inputElement)
        inputElement.value = 'a';
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
    let searchContainer: HTMLDivElement;

    beforeEach(() => {
      searchContainer = fixture.nativeElement.querySelector('.search-container');
      scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
    });

    it('should display no results message', () => {
      audioMediaServiceSpy.search.and.returnValue(of([]));

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
      audioMediaServiceSpy.search.and.returnValue(of(apiReturnValue));

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
        const titleElement = items?.item(0).querySelector('.title');
        expect(titleElement?.textContent?.trim()).toBe(`${apiReturnValue[0].series} - ${apiReturnValue[0].title}`)
        const authorElement = items?.item(0).querySelector('.author');
        expect(authorElement?.textContent?.trim()).toBe(apiReturnValue[0].author.name)
      });
    });
  });
});
