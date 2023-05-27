import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    address: [
      {
        _id: uuid(),
        name: "Kim Seokjin",
        area: "Gangnam-gu",
        city: "Seoul",
        state: "Seoul",
        pincode: "06040",
        phoneNumber: "1234567890",
      },
      {
        _id: uuid(),
        name: "Katrina Kaif",
        area: "0B-09 & G-10 Ground Floor, Mourya House, Next to VIP Plaza, New Link Road, Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400053",
        phoneNumber: "0987654321",
      },
    ],
  },
];
