import numpy as np
from numpy.linalg import norm
from embed import embed_text, load_all_embeddings


def cosine_similarity(a, b):
    return np.dot(a, b) / (norm(a) * norm(b))


def retrieve_context(query: str, top_k=3):
    """
    Retrieves the most relevant embeddings for the query.
    """
    query_vec = embed_text(query)
    all_docs = load_all_embeddings()

    scored = []

    for doc in all_docs:
        doc_vec = np.array(doc["embedding"])
        sim = cosine_similarity(query_vec, doc_vec)

        scored.append((sim, doc["text"], doc["metadata"]))

    scored.sort(reverse=True, key=lambda x: x[0])

    return scored[:top_k]
