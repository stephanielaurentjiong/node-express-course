const errorHandlerMiddleware = async (err, req, res) => {
  // I deleted the above's next parameter, since it will not be used
  console.log(err)
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware
