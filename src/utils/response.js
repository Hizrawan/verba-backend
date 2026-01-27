function responseMiddleware(req, res, next) {
  res.success = function (data = null, message = 'OK', meta = null) {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta,
    })
  }

  res.created = function (data = null, message = 'Created') {
    return res.status(201).json({
      success: true,
      message,
      data,
    })
  }

  res.fail = function (statusCode = 400, message = 'Bad Request', errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    })
  }

  next()
}

module.exports = responseMiddleware
