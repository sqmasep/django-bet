import * as v from "valibot";

export const emailSchema = v.string("Veuillez renseigner votre adresse email", [
  v.email("Veuillez renseigner une adresse email valide"),
]);

export const passwordSchema = v.string("Veuillez renseigner un mot de passe", [
  v.minLength(6, "Votre mot de passe doit contenir au moins 6 caractères"),
  v.maxLength(50, "Votre mot de passe doit contenir au plus 50 caractères"),
]);

export const confirmPasswordSchema = v.string(
  "Veuillez confirmer votre mot de passe",
  [
    v.minLength(6, "Votre mot de passe doit contenir au moins 6 caractères"),
    v.maxLength(50, "Votre mot de passe doit contenir au plus 50 caractères"),
  ]
);
