export const getValidationErrors = (error) => {
  const errors = {}

  error.graphQLErrors.forEach((graphQLError) => {
    try {
      JSON.parse(graphQLError.message).forEach(({ key, message }) => {
        errors[key] = errors[key] || []
        errors[key].push(message)
      })
    } catch (e) {
      errors.general = errors.general || []
      errors.general.push(graphQLError.message)
    }
  })

  return errors
}
