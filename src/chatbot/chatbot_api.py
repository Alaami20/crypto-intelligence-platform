from rag import retrieve_context


def generate_answer(query: str):
    """
    Chatbot pipeline:
    1. Retrieve relevant context (RAG)
    2. Combine into a final answer
    3. If no LLM connected, generate simple logic output
    """

    retrieved = retrieve_context(query)

    context_text = "\n".join([f"- {x[1]}" for x in retrieved])

    response = f"""
User question:
{query}

Relevant system context:
{context_text}

AI Response:
Based on the latest predictions, anomalies, and system insights, here is what we found:

- ML and LSTM predictions may show trend direction
- Anomaly detection flags unusual volatility or whale behavior
- Combine both to estimate market risk

This is a simplified local response.
"""

    return response.strip()


if __name__ == "__main__":
    print(generate_answer("What is happening with Bitcoin now?"))

