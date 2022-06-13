import { getAuth } from "firebase/auth";

export const auth = getAuth();
export const user = auth.currentUser;