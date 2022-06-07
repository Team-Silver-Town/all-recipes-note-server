class ErrorResponse extends Error {
  constructor(name) {
    super();

    this.name = name;
  }
}

module.exports = ErrorResponse;
