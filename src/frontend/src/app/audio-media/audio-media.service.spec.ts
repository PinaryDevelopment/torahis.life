import { HttpClient } from '@angular/common/http';
import { AudioMediaService } from './audio-media.service';
import { AudioMedia } from '@contracts/app';
import { AudioMediaDto, TagDto, TagTypeDto, SearchOptions } from '@contracts/data';
import { of } from 'rxjs';
import { environment as env } from '../../environments/environment';

describe('AudioMediaService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let audioMediaService: AudioMediaService;
  const audioMediaDto: AudioMediaDto = {
    authorId: 1,
    authorName: 'authorName',
    date: '10/08/2020',
    duration: '',
    id: 2,
    tags: [2],
    title: 'title',
    nextId: 3,
    previousId: 4
  };
  const tagDtos: TagDto[] = [
    {
      id: 1,
      tag: 'tag1',
      type: TagTypeDto.SeferTitle
    },
    {
      id: 2,
      tag: 'tag2',
      type: TagTypeDto.Subtitle
    }
  ];
  const audioMediaContract: AudioMedia = {
    author: {
      id: 1,
      name: 'authorName'
    },
    date: new Date('10/08/2020'),
    id: '2',
    series: '',
    title: 'title',
    versions: [{
      duration: '',
      shiur: '',
      version: 'tag2'
    }],
    nextId: 3,
    previousId: 4
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    audioMediaService = new AudioMediaService(httpClientSpy);
  });

  describe('unit:ts', () => {
    it('should return expected audio media collection (HttpClient called twice)', () => {
      httpClientSpy
        .get
          .withArgs(`${env.baseApisUri}/tags`)
            .and.returnValue(of(tagDtos))
          .withArgs(`${env.baseApisUri}/audio-media?pageIndex=0&maxPageSize=25&searchTerm=`)
            .and.returnValue(of([audioMediaDto]));

      audioMediaService.search(new SearchOptions())
                       .subscribe(
                         audioMedia => expect(audioMedia).toEqual([audioMediaContract], 'expected audio media collection'),
                         fail
                       );
      expect(httpClientSpy.get.calls.count()).toBe(2, 'two calls');
    });

    it('should return expected audio media item (HttpClient called twice)', () => {
      httpClientSpy
        .get
          .withArgs(`${env.baseApisUri}/tags`)
            .and.returnValue(of(tagDtos))
          .withArgs(`${env.baseApisUri}/audio-media?id=${audioMediaContract.id}`)
            .and.returnValue(of(audioMediaDto));

      audioMediaService.get(audioMediaContract.id)
                       .subscribe(
                         audioMedia => expect(audioMedia).toEqual(audioMediaContract, 'expected audio media item'),
                         fail
                       );
      expect(httpClientSpy.get.calls.count()).toBe(2, 'two calls');
    });

    it('should only call HttpClient twice', () => {
      httpClientSpy
        .get
          .withArgs(`${env.baseApisUri}/tags`)
            .and.returnValue(of(tagDtos))
          .withArgs(`${env.baseApisUri}/audio-media?pageIndex=0&maxPageSize=25&searchTerm=`)
            .and.returnValue(of([audioMediaDto]))
          .withArgs(`${env.baseApisUri}/audio-media?id=${audioMediaContract.id}`)
            .and.returnValue(of(audioMediaDto));

      audioMediaService.search(new SearchOptions())
                       .subscribe(
                         () => {},
                         fail
                       );
      audioMediaService.get(audioMediaContract.id)
                       .subscribe(
                         () => {},
                         fail
                       );
      expect(httpClientSpy.get.calls.count()).toBe(2, 'two calls');
    });

    it('should call HttpClient thrice', () => {
      const newAudioMediaDto: AudioMediaDto = { ...audioMediaDto, id: 10 };
      httpClientSpy
        .get
          .withArgs(`${env.baseApisUri}/tags`)
            .and.returnValue(of(tagDtos))
          .withArgs(`${env.baseApisUri}/audio-media?pageIndex=0&maxPageSize=25&searchTerm=`)
            .and.returnValue(of([audioMediaDto]))
          .withArgs(`${env.baseApisUri}/audio-media?id=${newAudioMediaDto.id}`)
            .and.returnValue(of(newAudioMediaDto));

      audioMediaService.search(new SearchOptions())
                       .subscribe(
                         () => {},
                         fail
                       );
      audioMediaService.get(newAudioMediaDto.id.toString())
                       .subscribe(
                         () => {},
                         fail
                       );
      expect(httpClientSpy.get.calls.count()).toBe(3, 'three calls');
    });
  });
});
