from qiskit import QuantumCircuit, Aer, execute, quantum_info
import numpy as np
import matplotlib.pyplot as plt
import sys
import os

def prepare_qubits(bits, bases):
    qc = QuantumCircuit(len(bits))
    for i in range(len(bits)):
        if bases[i] == '1':  # Prepare in diagonal basis
            qc.h(i)
        if bits[i] == '1':  # Flip qubit if bit is 1
            qc.x(i)
    return qc

def measure_qubits(qc, bases):
    for i in range(len(bases)):
        if bases[i] == '1':  # Measure in diagonal basis
            qc.h(i)
    qc.measure_all()
    return qc

def calculate_qber(alice_bits, bob_bits, matching_bases):
    mismatches = sum(a != b for a, b in zip(alice_bits, bob_bits) if a is not None and b is not None)
    total = sum(matching_bases)
    return mismatches / total if total > 0 else 0

def calculate_sifted_key_rate(sifted_alice_bits):
    return len(sifted_alice_bits)

def plot_bases_distribution(alice_bases, bob_bases):
    plt.figure(figsize=(12, 5))
    
    unique_bases = sorted(set(alice_bases + bob_bases))
    alice_counts = [alice_bases.count(b) for b in unique_bases]
    bob_counts = [bob_bases.count(b) for b in unique_bases]

    plt.plot(unique_bases, alice_counts, marker='o', linestyle='-', color='skyblue', label="Alice")
    plt.plot(unique_bases, bob_counts, marker='o', linestyle='-', color='lightcoral', label="Bob")

    plt.title("Bases Distribution")
    plt.xlabel('Basis')
    plt.ylabel('Count')
    plt.legend()
    
    plt.tight_layout()

def plot_sifted_key_comparison(sifted_alice_bits, sifted_bob_bits):
    plt.figure(figsize=(10, 5))
    indices = np.arange(len(sifted_alice_bits))
    width = 0.35
    plt.scatter(indices - width/2, sifted_alice_bits, label='Alice', s=50)
    plt.scatter(indices + width/2, sifted_bob_bits, label='Bob', s=50)
    plt.title('Sifted Key Comparison')
    plt.xlabel('Bit Position')
    plt.ylabel('Bit Value')
    plt.xticks(indices, [str(i) for i in indices])
    plt.legend()
    plt.tight_layout()

def plot_error_distribution(alice_bits, bob_bits, matching_bases):
    errors = [i for i in range(len(alice_bits)) if matching_bases[i] and alice_bits[i] != bob_bits[i]]
    plt.figure(figsize=(12, 5))
    
    plt.scatter(range(len(alice_bits)), alice_bits, label='Alice', s=30, color='skyblue', alpha=0.7)
    plt.scatter(range(len(bob_bits)), bob_bits, label='Bob', s=30, color='lightcoral', alpha=0.7)
    plt.scatter(errors, np.array(bob_bits)[errors], color='red', zorder=5, label='Errors', s=50, alpha=0.7)
    
    plt.title('Error Distribution in Sifted Keys')
    plt.xlabel('Bit Position')
    plt.ylabel('Bit Value')
    plt.legend()
    plt.tight_layout()

def save_plots(alice_bases, bob_bases, sifted_alice_bits, sifted_bob_bits, matching_bases):
    images_dir = 'images'
    os.makedirs(images_dir, exist_ok=True)

    plot_bases_distribution(alice_bases, bob_bases)
    plt.savefig(os.path.join(images_dir, 'bases_distribution.png'))
    plt.close()

    plot_sifted_key_comparison(sifted_alice_bits, sifted_bob_bits)
    plt.savefig(os.path.join(images_dir, 'sifted_key_comparison.png'))
    plt.close()

    plot_error_distribution(sifted_alice_bits, sifted_bob_bits, matching_bases)
    plt.savefig(os.path.join(images_dir, 'error_distribution.png'))
    plt.close()


def perform_qkd_simulation(num_qubits, error_rate):
    alice_bits = np.random.randint(2, size=num_qubits).tolist()
    alice_bases = np.random.randint(2, size=num_qubits).tolist()
    bob_bases = np.random.randint(2, size=num_qubits).tolist()

    # Prepare Alice's qubits and send them to Bob
    qc = prepare_qubits(alice_bits, alice_bases)
    qc = measure_qubits(qc, bob_bases)

    # Simulate the quantum channel and measurements
    simulator = Aer.get_backend('qasm_simulator')
    result = execute(qc, backend=simulator, shots=1).result()
    counts = result.get_counts(qc)
    measured_bits = list(counts.keys())[0][::-1]  # Reverse to match qubit ordering

    # Sifting the key
    sifted_alice_bits = []
    sifted_bob_bits = []
    matching_bases = []
    for i in range(num_qubits):
        if alice_bases[i] == bob_bases[i]:
            sifted_alice_bits.append(alice_bits[i])
            sifted_bob_bits.append(int(measured_bits[i]))
            matching_bases.append(True)
        else:
            matching_bases.append(False)

    # Calculate QBER
    qber = calculate_qber(sifted_alice_bits, sifted_bob_bits, matching_bases)

    # Calculate sifted key rate
    sifted_key_rate = calculate_sifted_key_rate(sifted_alice_bits)

    # Save plots
    save_plots(alice_bases, bob_bases, sifted_alice_bits, sifted_bob_bits, matching_bases)

    return {
        'alice_bits': alice_bits,
        'alice_bases': alice_bases,
        'bob_bases': bob_bases,
        'sifted_alice_bits': sifted_alice_bits,
        'sifted_bob_bits': sifted_bob_bits,
        'qber': qber,
        'sifted_key_rate': sifted_key_rate,
        'matching_bases': matching_bases
    }

if __name__ == "__main__":
    try:
        # Retrieve values from command line arguments
        num_qubits = int(sys.argv[1])
        error_rate = float(sys.argv[2])

        # Running the simulation
        alice_bits, alice_bases, bob_bases, sifted_alice_bits, sifted_bob_bits, qber, sifted_key_rate, matching_bases = perform_qkd_simulation(num_qubits, error_rate)

        # Display results
        print(f"Alice's Initial Bits: {alice_bits}")
        print(f"Alice's Bases: {alice_bases}")
        print(f"Bob's Bases: {bob_bases}")
        print(f"Sifted Alice's Key: {sifted_alice_bits}")
        print(f"Sifted Bob's Key: {sifted_bob_bits}")
        print(f"Quantum Bit Error Rate (QBER): {qber}")
        print(f"Sifted Key Rate: {sifted_key_rate}")

    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)