import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePosts',
  standalone: true
})
export class DatePostsPipe implements PipeTransform {

  private readonly relativeFormatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  private readonly absoluteFormatter = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  transform(value: string | number | Date | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return 'Fecha desconocida';
    }

    const parsedDate = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
      return 'Fecha desconocida';
    }

    const diffSeconds = Math.round((parsedDate.getTime() - Date.now()) / 1000);
    const absSeconds = Math.abs(diffSeconds);

    const ranges: Array<{ limit: number; divisor: number; unit: Intl.RelativeTimeFormatUnit }> = [
      { limit: 60, divisor: 1, unit: 'second' },
      { limit: 60 * 60, divisor: 60, unit: 'minute' },
      { limit: 60 * 60 * 24, divisor: 60 * 60, unit: 'hour' },
      { limit: 60 * 60 * 24 * 7, divisor: 60 * 60 * 24, unit: 'day' },
      { limit: 60 * 60 * 24 * 30, divisor: 60 * 60 * 24 * 7, unit: 'week' },
      { limit: 60 * 60 * 24 * 365, divisor: 60 * 60 * 24 * 30, unit: 'month' }
    ];

    for (const range of ranges) {
      if (absSeconds < range.limit) {
        const value = Math.round(diffSeconds / range.divisor);
        return this.relativeFormatter.format(value, range.unit);
      }
    }

    return this.absoluteFormatter.format(parsedDate);
  }

}
