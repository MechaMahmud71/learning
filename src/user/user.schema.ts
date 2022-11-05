import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Document } from "mongoose";
import * as bcrypt from "bcrypt";
import { Coupon } from "src/shared/interfaces/coupon.interface";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true, maxLength: 11 })
  phoneNo: string;

  @Prop({ type: String, required: true, minlength: 6 })
  password: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", default: [] },
    ],
  })
  usedCoupons: Coupon[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>("save", async function () {
  const salt: string = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
