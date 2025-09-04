// src/db/models/user.js

import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,

    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UsersCollection = model('users', userSchema);
