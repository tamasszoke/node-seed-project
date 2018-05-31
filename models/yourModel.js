
module.exports = (root) => {

	const mongoose = root.mongoose;
	const Schema = mongoose.Schema;

	// create a schema
	const yourSchema = new Schema({
		name: String,
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		admin: Boolean,
		location: String,
		meta: {
			age: Number,
			website: String
		},
		created_at: Date,
		updated_at: Date
	});

	// create a model using the schema
	const yourModel = mongoose.model('yourModel', yourSchema);

	module.exports = yourModel;
};