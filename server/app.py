from flask import Flask, request, jsonify
from flask_cors import CORS
from subprocess import run, PIPE
import os

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

        # Get the absolute path to the current directory
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Update the path to your Python script in the scripts folder
        python_script_path = os.path.join(current_dir, 'scripts', 'bb84.py')
        
        # Construct the command to run the Python script
        python_command = f'python3 {python_script_path} {num_qubits} {error_rate}'
        
        # Run the Python script and capture the output
        result = run(python_command, stdout=PIPE, stderr=PIPE, text=True, shell=True)


        
        if result.returncode == 0:
            output_lines = result.stdout.strip().split('\n')
            
            # Extract image paths from the output (adjust as needed)
            bases_distribution_image = os.path.join(current_dir, 'images', 'bases_distribution.png')
            sifted_key_comparison_image = os.path.join(current_dir, 'images', 'sifted_key_comparison.png')
            error_distribution_image = os.path.join(current_dir, 'images', 'error_distribution.png')

            response_data = {
                'results': output_lines,
                'images': {
                    'bases_distribution': bases_distribution_image,
                    'sifted_key_comparison': sifted_key_comparison_image,
                    'error_distribution': error_distribution_image
                }
            }

            return jsonify(response_data)
        else:
            raise RuntimeError(result.stderr.strip())

    except Exception as e:
        error_message = str(e)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)
