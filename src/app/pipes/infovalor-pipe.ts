import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infovalor',
  standalone: true
})
export class InfovalorPipe implements PipeTransform {

  private readonly dateFormatter = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long'
  });

  private readonly numberFormatter = new Intl.NumberFormat('es-AR');

  transform(
    value: string | number | Date | null | undefined,
    isDate = false
  ): string {
    if (value === null || value === undefined || value === '') {
      return 'Sin información';
    }

    if (isDate) {
      const parsedDate = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(parsedDate.getTime())) {
        return 'Fecha inválida';
      }
      return this.dateFormatter.format(parsedDate);
    }

    if (value instanceof Date) {
      return this.dateFormatter.format(value);
    }

    if (typeof value === 'number') {
      return this.numberFormatter.format(value);
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed === '' ? 'Sin información' : trimmed;
    }

    return String(value);
  }

}
