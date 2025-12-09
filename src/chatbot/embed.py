from sentence_transformers import SentenceTransformer
import numpy as np
import os
import json

EMBED_PATH = "models/chatbot_embeddings/"
MODEL_NAME = "all-MiniLM-L6-v2"

os.makedirs(EMBED_PATH, exist_ok=True)

model = SentenceTransformer(MODEL_NAME)


def embed_text(text: str):
    """
    Returns a vector embedding for a given text.
    """
    return model.encode(text, convert_to_numpy=True)


def save_embedding(text: str, metadata: dict, filename: str):
    """
    Save an embedding + metadata as JSON for RAG.
    """
    vector = embed_text(text).tolist()

    save_obj = {
        "text": text,
        "metadata": metadata,
        "embedding": vector
    }

    with open(os.path.join(EMBED_PATH, filename), "w") as f:
        json.dump(save_obj, f)

    print(f"✔ Saved embedding → {filename}")


def load_all_embeddings():
    """
    Load all saved embeddings into memory.
    """
    items = []

    for fname in os.listdir(EMBED_PATH):
        if fname.endswith(".json"):
            with open(os.path.join(EMBED_PATH, fname), "r") as f:
                items.append(json.load(f))

    return items
