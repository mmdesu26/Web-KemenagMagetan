export const success = (res, data, message = "OK") => {
  res.json({ success: true, message, data })
}

export const created = (res, data, message = "Created") => {
  res.status(201).json({ success: true, message, data })
}

export const error = (res, statusCode, message = "Terjadi kesalahan", details) => {
  const payload = { success: false, message }
  if (details) payload.details = details
  res.status(statusCode).json(payload)
}
