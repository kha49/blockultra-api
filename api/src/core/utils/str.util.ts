export class StringUtil {
  static joinStrings(...strs: any) {
    return '[' + strs.join(',') + ']';
  }

  static toLowerCaseFirstLetter(inputString: string) {
    if (typeof inputString !== 'string' || inputString.length === 0) {
      return inputString;
    }
    const firstLetter = inputString.charAt(0).toLowerCase();
    const restOfString = inputString.substring(1);
    return firstLetter + restOfString;
  }

  static toLowerCaseFirstVariable(data: any): any {
    let item: any = {};
    for (let x in data) {
      item[StringUtil.toLowerCaseFirstLetter(x)] = data[x];
    }
    return item;
  }

  static getValueInParentheses(str: string) {
    if (str) {
      const regex = /\(([^)]+)\)/;
      const match = str.match(regex);
      return match ? match[1] : str;
    } else {
      return '';
    }
  }

  static getValueNotInParentheses(str: string) {
    if (str) {
      const regex = /[^()]+/;
      const match = str.match(regex);
      return match ? match[0].trim() : str;
    } else {
      return '';
    }
  }
}
