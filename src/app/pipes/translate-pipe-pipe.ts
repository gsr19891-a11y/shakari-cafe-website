import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from '../services/lang-service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private langService: LangService) {}

  transform(key: string): string {
    return this.langService.translate(key);
  }
}