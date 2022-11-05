import { Coupon } from "src/shared/interfaces/coupon.interface";

export interface UserInterface {
  _id?: string;
  userName: string;
  phoneNo: string;
  password?: string;
  usedCoupons: Coupon[];
}
