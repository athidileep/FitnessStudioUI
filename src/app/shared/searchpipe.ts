import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  transform(list: any[], value: any, key: any): any {
    value.forEach((name, index) => {
      if (name) {
        list = list.filter((item) => {
          return (item[key[index]]
            .toString()
            .toLowerCase()
            //.indexOf(name.toString().toLowerCase()) !== -1)            
            .indexOf(name) !== -1)
        });
      }
    });
    return list;
  }
}