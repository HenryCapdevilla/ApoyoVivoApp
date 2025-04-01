import { InferenceClient } from "@huggingface/inference";
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const client = new InferenceClient(HF_TOKEN);

export const getMistralResponse = async (message: string) => {
  try {
    const response = await client.chatCompletion({
      provider: "together", // Usa "together" como proveedor
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [{ role: "user", content: message }],
      max_tokens: 500,
    });

    return response.choices[0].message.content; // Devuelve solo el texto
  } catch (error) {
    console.error("Error en la API de Mistral:", error);
    return "Error al obtener la respuesta.";
  }
};
