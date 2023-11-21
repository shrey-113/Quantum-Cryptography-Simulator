# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from bb84 import perform_qkd_simulation

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

        # Extract image paths from the result (adjust as needed)
        bases_distribution_image = 'images/bases_distribution.png'
        sifted_key_comparison_image = 'images/sifted_key_comparison.png'
        error_distribution_image = 'images/error_distribution.png'

        response_data = {
            'results': result,
            'images': {
                'bases_distribution': bases_distribution_image,
                'sifted_key_comparison': sifted_key_comparison_image,
                'error_distribution': error_distribution_image
            }
        }

        return jsonify(response_data)

    except Exception as e:
        error_message = str(e)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)
