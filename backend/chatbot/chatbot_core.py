from chatbot.openai_agent import ask_openai
from platform_core.src.ml.model import RandomForestModel
from platform_core.src.dl.lstm_model import LSTMModel

def generate_chat_response(message):
    ml_signal = RandomForestModel().predict()
    dl_signal = LSTMModel().predict()

    system_context = f'''
    ML Signal: {ml_signal}
    DL Signal: {dl_signal}
    '''

    return ask_openai(system_context, message)
