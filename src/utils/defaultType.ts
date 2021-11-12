export default {
  // generals
  string: { type: String, default: "" },
  requiredString: { type: String, required: true },
  number: { type: Number, default: 0 },
  date: { type: Date },
  date_now: { type: Date, default: Date.now() },
  boolean: { type: Boolean, default: true },
  booleanFalse: { type: Boolean, default: false },
};
