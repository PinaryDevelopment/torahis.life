import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DafYomi } from '@contracts/app';
import { AudioMediaService } from '@audio-media/audio-media.service';
import { catchError, filter, switchMap, takeWhile, tap } from 'rxjs/operators';
import { AudioMediaCreateDto } from '@contracts/data';

@Component({
  selector: 'pd-admin-audio-media-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioMediaFormComponent {
  file: File | null = null;

  fg = this.fb.group({
    author: ['Rabbi Yosef Bromberg', Validators.required],
    // https://stackoverflow.com/questions/55660262/how-can-i-set-my-reactive-form-date-input-value#answer-55660482
    date: [formatDate(this.today, 'yyyy-MM-dd', 'en'), Validators.required],
    file: [undefined, Validators.required],
    title: [`Daf ${DafYomi.getDafByDate(this.today).daf}`, Validators.required],
    sefer: [DafYomi.getDafByDate(this.today).name],
    subtitle: ['with Rashi'],
    series: ['Daf Yomi']
  });

  constructor(
    private fb: FormBuilder,
    private audioMediaService: AudioMediaService
  ) {}

  submitForm(): void {
    if (!this.file) {
      this.fg.get('file')?.setErrors({ invalid: true });
    }

    if (this.fg.valid) {
      const audioMedia: AudioMediaCreateDto = {
        title: this.fg.get('title')?.value,
        orderInSeries: 0,
        releasedOn: this.fg.get('date')?.value,
        authorId: this.fg.get('author')?.value,
        tagIds: [
          this.fg.get('sefer')?.value,
          this.fg.get('subtitle')?.value,
          this.fg.get('series')?.value,
        ]
      };

      const file = this.file;
      let fileId: string;
      if (file) {
        this.audioMediaService
            .post(audioMedia, this.file)
            .pipe(
              tap(result => fileId = result.id),
              tap(result => console.log(result)),
              takeWhile(result => result.progress.loadedBytes < file.size),
              filter(result => result.progress.loadedBytes === file.size),
              switchMap(({ id }) => this.audioMediaService.fileUploaded(id)),
              catchError(error => this.audioMediaService.fileUploaded(fileId, error)),
            )
            .subscribe();
      }
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Selecting_files_using_drag_and_drop
  fileChanged(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      this.file = fileInput.files[0];
    }
  }

  get today(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  }
}
