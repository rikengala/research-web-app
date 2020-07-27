import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const DataSetSchema = Schema(
  {
    paperTitle: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    journalTitle: {
      type: String,
      required: true,
      trim: true
    },
    publicationDate: {
      type: Date,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("DataSet", DataSetSchema);
