import { InferenceClient } from "@huggingface/inference";

const token = process.env.HUGGINGFACEHUB_API_KEY;

if (!token) {
  throw new Error(
    "HUGGINGFACEHUB_API_KEY is not defined"
  );
}

export const hf = new InferenceClient(token);