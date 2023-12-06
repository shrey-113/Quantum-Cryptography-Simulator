# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from bb84 import perform_qkd_simulation
from e91 import perform_e91_simulation
from chatbot import getresponsefromchatbot

app = Flask(__name__)
CORS(app)

@app.route('/run-bb84', methods=['POST'])
def run_bb84():
    try:
        data = request.json
        num_qubits = data.get('num_qubits')
        error_rate = data.get('error_rate')

        if num_qubits is None or error_rate is None:
            raise ValueError("Missing 'num_qubits' or 'error_rate' in the request.")
        
        # Run the simulation
        result = perform_qkd_simulation(num_qubits, error_rate)

        response_data = {
            'results': result,
        }

        return jsonify(response_data)

    except Exception as e:
        error_message = str(e)
        return jsonify({'error': error_message}), 500

@app.route('/run-e91', methods=['POST'])
def run_e91():
    try:
        data = request.json
        num_qubit_pairs = data.get('num_qubit_pairs')
        
        if num_qubit_pairs is None:
            raise ValueError("Missing 'num_qubit_pairs' in the request.")
        
        # Run the simulation
        result = perform_e91_simulation(num_qubit_pairs)

        # Convert NumPy arrays to lists in the result
        result['Alice Bases'] = result['Alice Bases'].tolist()
        result['Bob Bases'] = result['Bob Bases'].tolist()
        return jsonify(result)

    except Exception as e:
        error_message = str(e)
        print(error_message)
        return jsonify({'error': error_message}), 500


@app.route('/chatresponse', methods=['POST'])
def getChatRespone():
    try:
        data = request.json
        prompt = data.get('prompt')
        print(prompt)
        
        if prompt is None:
            raise ValueError("Missing 'prompt' in the request.")
        
        # Run the simulation
        result = getresponsefromchatbot(prompt)

        response_data = {'text': result.content}

        print(response_data)

        return jsonify(response_data)

    except Exception as e:
        error_message = str(e)
        print(error_message)
        return jsonify({'error': error_message}), 500


if __name__ == '__main__':
    app.run(debug=True)
