import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {

  currentLang = signal<'ka' | 'en' | 'ru'>('en');
  

  private translations = signal<Record<string, any>>({});
  
  isLoaded = signal(false);

  constructor(private http: HttpClient) {
 
  const hasSavedLang = localStorage.getItem('lang') !== null;
 
  if (!hasSavedLang) {
    localStorage.setItem('lang', 'en');
  }

 
  const savedLang = (localStorage.getItem('lang') as 'ka' | 'en' | 'ru') || 'en';
  
  this.currentLang.set(savedLang);
  this.loadTranslations(savedLang);
}
  setLanguage(lang: 'ka' | 'en' | 'ru') {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    this.loadTranslations(lang);
  }

loadTranslations(lang: string) {
  this.http.get(`/assets/i18n/${lang}.json`).subscribe({
    next: (data) => {

      this.translations.set(data);
      this.isLoaded.set(true);
    },
    error: (err) => {
      console.error(err);
    }
  });
}

translate(key: string): string {


  const result = key
    .split('.')
    .reduce((obj: any, k) => obj?.[k], this.translations());


  return typeof result === 'string' ? result : key;
}
}