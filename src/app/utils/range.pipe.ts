import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'range', pure: true, standalone: true })
export class RangePipe implements PipeTransform {
  transform(value: number | null | undefined): number[] {
    const count = Math.max(0, Math.floor(Number(value ?? 0)));
    return Array.from({ length: count }, (_, i) => i);
  }
}