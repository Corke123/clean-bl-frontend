import { MatPaginatorIntl } from '@angular/material/paginator';

const serbianRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 od ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} od ${length}`;
};

export function getSerbianPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Elemenata na stranici:';
  paginatorIntl.nextPageLabel = 'Sledeća stranica';
  paginatorIntl.previousPageLabel = 'Prethodna stranica';
  paginatorIntl.firstPageLabel = 'Prva stranica';
  paginatorIntl.lastPageLabel = 'Posljednja stranica';
  paginatorIntl.getRangeLabel = serbianRangeLabel;

  return paginatorIntl;
}
