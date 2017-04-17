import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  AfterViewChecked,
  EventEmitter,
  OnDestroy,
  OnInit,
  Input,
  Output
} from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  template: `<textarea id="{{elementId}}">{{content}}</textarea>`
})
export class TinyEditorComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() elementId: String;
  @Input() content: String;
  @Output() onEditorContentChange = new EventEmitter();
  @Output() onEditorInit = new EventEmitter();

  editor;

  constructor(
    private _translate: TranslateService
  ) { }

  ngOnInit() {
  }

  get _tinymceConfig() {
    const config: any = {
      selector: '#' + this.elementId,
      plugins: ['link', 'table'],
      menubar: false,
      statusbar: false,
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;

        editor.on('init', () => {
          this.onEditorInit.emit();
        });

        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      }
    };

    if (this._translate.getBrowserLang() === 'tr') {
      config.language_url = '/assets/i18n/tinymce/tr_TR.js';
    }

    return config;
  }

  ngAfterViewChecked() {
    this._initTinymce();
  }

  private _initTinymce() {
    if (this.editor === undefined) {
      tinymce.init(this._tinymceConfig);
    }
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
