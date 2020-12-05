class InvalidTestBarcodeError extends Error {
    constructor(message, status) {
      super(message)
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidTestBarcodeError)
      }
      
      this.name = 'InvalidTestBarcodeError'
      this.status = status

    }
  }

class InvalidEmployeeIDError extends Error {
    constructor(message, status) {
        super(message)
        
        if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidEmployeeIDError)
      }

      this.name = 'InvalidEmployeeIDError'
      this.status = status

    }
  }

module.exports = { InvalidEmployeeIDError, InvalidTestBarcodeError }