export class BusinessPerm {
  static verifyPermission(perms: string[], request: string): boolean {
    const module = this.findModule(request);
    const action = this.findAction(request, '');
    return true;
  }

  private static findModule(urlRequest: string) {
    const request = urlRequest.replace('/api/', '');
    const module = request.split('/')[0];
    return module;
  }

  private static findAction(urlRequest: string, httpMethod: string) {
    const request = urlRequest.replace('/api/', '');
    const apiRequest = request.split('/');
    const action = apiRequest.length > 2 ? apiRequest[1] : httpMethod;
    return action;
  }
}

export default BusinessPerm;
