const validateRequest = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
   
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res
        .status(400)
        .json({ success: false, error: "Validation failed", details: errors });
    }
    req.validatedData = result.data;
    next();
  } catch (error) {
    console.error("validation error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error During validation",
    });
  }
};
module.exports = validateRequest;
