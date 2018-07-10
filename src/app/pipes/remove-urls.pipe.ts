import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "removeUrls" })
export class RemoveUrlsPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/http\w?:\/\/.([^\s]+)/g, "");
  }
}
