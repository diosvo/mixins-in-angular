import { Params } from '@angular/router';

interface BaseProperties {
  multiple: boolean;
  options: Record<string, string>;
  sortable?: boolean;
}

interface MultipleOptions extends BaseProperties {
  multiple: true;
  description: string;
}

interface SingleOption extends BaseProperties {
  multiple: false;
  defaultValue: string;
}

interface QueryString {
  options: never;
  sortable: never;
  description: never;
  defaultValue: never;
  // ^^^ prevent setting those keys if mode is query string
  multiple: null;
  label: string;
  searchIcon: string;
  searchPlaceholder: string;
}

interface FiltersValues {
  currentValue: Params;
  selection: string[];
}

interface Schema {
  [key: string]: Partial<QueryString> | Extract<SingleOption | MultipleOptions, { multiple }>;
}

export { QueryString, SingleOption, MultipleOptions, Schema, FiltersValues };

