import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DafYomi } from '@contracts/app';

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
    file: [Validators.required],
    title: [`Daf ${DafYomi.getDafByDate(this.today).daf}`, Validators.required],
    sefer: [DafYomi.getDafByDate(this.today).name],
    subtitle: ['with Rashi'],
    series: ['Daf Yomi']
  });

  constructor(private fb: FormBuilder) {
  }

  submitForm(): void {
    if (!this.file) {
      this.fg.get('file')?.setErrors({ invalid: true });
    }

    console.log(this.fg.valid);
    if (this.fg.valid) {
      console.log(this.fg.get('title')?.value);
      console.log(this.fg.get('date')?.value);
      console.log(this.fg.get('author')?.value);
      console.log(this.fg.get('file'));
      console.log(this.file);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Selecting_files_using_drag_and_drop
  fileChanged(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      this.fg.reset(this.fg.value);
      this.file = fileInput.files[0];
    }
  }

  get today(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  }
}
