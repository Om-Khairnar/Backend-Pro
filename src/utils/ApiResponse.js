class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = stausCode;
    this.data = data;
    this.message = message;
    this.success = statusCode<400; 
    this.errors = errors;
  }
}
