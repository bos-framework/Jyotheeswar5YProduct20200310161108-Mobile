import RequestService from './RequestService';

class NetworkService {
  
  constructor () {
    this.baseUrl = '',
    this.bundleId = ''
    this.clientId = ''
    this.clientSecret = ''
  }

  async configuration(options={}) {
    if (!options.baseUrl || !options.bundleId || !options.clientId || !options.clientSecret ) {
      throw "Configure BOS: BUNDLEID, CLIENTID & CLIENTSECRET.";
    }
    this.baseUrl = await options.baseUrl;
    this.bundleId  = await options.bundleId;
    this.clientId  = await options.clientId;
    this.clientSecret  = await options.clientSecret;
  }

  getToken() {
    let params = {
      bundleId: this.bundleId,
      clientId: this.clientId,
      clientSecret: this.clientSecret
    };

    var url = `${this.baseUrl}/labeling/odata/Applications/ValidateURLClientIdClientSecretForMobile`;
    return RequestService.postRequest(url, params, "");
  }

  signUp(params, token) {
    var url = `${this.baseUrl}/auth/odata/Users`;
    return RequestService.postRequest(url, params, token);
  }
  
  login(params, token) {
    var url = `${this.baseUrl}/auth/odata/Verification?api-version=1.0`;
    return RequestService.postRequest(url, params, token);
  }

  getUserDetails(email, token) {
    var url = `${this.baseUrl}/auth/odata/users?$filter=deleted eq false and email eq ${"'"}${email}${"'"}`;
    return RequestService.getRequest(url, token);
  }

  getUserProfileDetails(userId, token) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}?api-version=1.0`;
    return RequestService.getRequest(url, token);
  }

  forgotPassword(userId, params, token) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}/ForcePasswordChange?api-version=1.0` ;
    return RequestService.postRequest(url, params, token);
  }

  updateUserProfile(userId, params, token) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}?api-version=1.0`;
    return RequestService.patchRequest(url, params, token);
  }

  changePassword(userId, params, token) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}/ChangePassword?api-version=1.0`;
    return RequestService.postRequest(url, params, token);
  }

  sendEmail(params, token) {
    var url = `${this.baseUrl}/email/odata/email`;
    return RequestService.postRequest(url, params, token);
  }

  getAllRoles(token) {
    var url = `${this.baseUrl}/auth/odata/Roles?api-version=1.0`;
    return RequestService.getRequest(url, token);
  }

  assignRoleToUser(userId, params, token) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}/AssignUserToMultipleRoles?api-version=1.0`;
    return RequestService.postRequest(url, params, token);
  }

  getModulesAssignedForUser(userId, token) {
    var url = `${this.baseUrl}/ia/odata/Permissions/GetOwnerPermissionsSets${"("}ownerId=${userId}${")"}?api-version=1.0`
    return RequestService.getRequest(url, token);
  }

  getUserRoleWithUserId(userId, token) {
    var url = `${this.baseUrl}/auth/odata/Users?$filter=id eq ${userId}&$expand=roles($expand=Role)`
    return RequestService.getRequest(url, token);
  }
  
}

export default new NetworkService();
