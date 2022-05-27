import { writable } from "svelte/store";
import type { User } from "../@types/auth";

type UserStoreProps = User;

export const UserStore = writable<UserStoreProps | null>(null);
