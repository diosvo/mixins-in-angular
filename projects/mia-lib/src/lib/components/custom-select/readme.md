### Usage Notes

1. import `CustomSelectComponent`
2. provide the list of items to select (`items` attribute) then add `formControlName` or `formControl`
3. some optional properties:

- `bindLabelKey`: show selected title
- `bindValueKey`: get the selected option value
- `checkAll`: enable checkbox selection, default is true
- `placeholder`: the parent placeholder, default is `Select`
- `searchPlaceholder`: searching placeholder, default is `Search`
- `appearance`: form field appearance, default is `outline`

eg: create a basic custom select

```
  <custom-select
    [items]="selection"
    placeholder="Group"
    formControlName="group"
  </custom-select>
```

### References

| Links                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Custom mat-select with search functionality](https://marselbeqiri.medium.com/angular-material-custom-mat-select-with-search-functionality-4b2b69b47511) |
| [Multiple select with select All option](https://codesandbox.io/s/givp5?file=/src/utils.js)                                                              |

⏱️ Latest update: Wed 16 Nov 2022
