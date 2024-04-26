import * as v from "valibot";

const PASSWORD_MIN_LENGTH = 2;
const PASSWORD_MAX_LENGTH = 50;

export const emailSchema = v.string("Veuillez renseigner votre adresse email", [
  v.email("Veuillez renseigner une adresse email valide"),
]);

export const passwordSchema = v.string("Veuillez renseigner un mot de passe", [
  v.minLength(PASSWORD_MIN_LENGTH, "Votre mot de passe doit contenir au moins 6 caractères"),
  v.maxLength(PASSWORD_MAX_LENGTH, "Votre mot de passe doit contenir au plus 50 caractères"),
]);

export const confirmPasswordSchema = v.string("Veuillez confirmer votre mot de passe", [
  v.minLength(PASSWORD_MIN_LENGTH, "Votre mot de passe doit contenir au moins 6 caractères"),
  v.maxLength(PASSWORD_MAX_LENGTH, "Votre mot de passe doit contenir au plus 50 caractères"),
]);
