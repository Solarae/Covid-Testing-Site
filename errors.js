export class InvalidTestBarcodeError extends Error {
    constructor(...params) {
      super(...params)
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidTestBarcodeError)
      }
      
      this.name = 'InvalidTestBarcodeError'
      this.status = status

    }
  }

export class InvalidEmployeeIDError extends Error {
    constructor(...params) {
        super(...params)
        
        if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidEmployeeIDError)
      }

      this.name = 'InvalidEmployeeIDError'
      this.status = status

    }
  }