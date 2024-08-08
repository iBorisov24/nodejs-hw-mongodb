import mongoose from 'mongoose';

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      optional: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      default: 'personal',
      enum: ['work', 'home', 'personal'],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    createdAt: {
      timestamps: true,
    },
    updatedAt: {
      timestamps: true,
    },
  },
);

export const Contact = mongoose.model('Contact', contactSchema);
