from qiskit import QuantumCircuit, Aer, execute
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

def create_entangled_pairs(num_qubits):
    qc = QuantumCircuit(2 * num_qubits)
    for i in range(0, 2 * num_qubits, 2):
        qc.h(i)
        qc.cx(i, i + 1)
    return qc

def measure_in_random_bases(qc, num_qubits):
    alice_bases = np.random.choice(['x', 'y', 'z'], num_qubits)
    bob_bases = np.random.choice(['x', 'y', 'z'], num_qubits)

    for i in range(num_qubits):
        if alice_bases[i] == 'x':
            qc.h(2 * i)
        elif alice_bases[i] == 'y':
            qc.sdg(2 * i)
            qc.h(2 * i)

        if bob_bases[i] == 'x':
            qc.h(2 * i + 1)
        elif bob_bases[i] == 'y':
            qc.sdg(2 * i + 1)
            qc.h(2 * i + 1)

    qc.measure_all()
    return alice_bases, bob_bases

def perform_e91_simulation(num_qubits):
    qc = create_entangled_pairs(num_qubits)
    alice_bases, bob_bases = measure_in_random_bases(qc, num_qubits)

    # Simulate the circuit
    simulator = Aer.get_backend('qasm_simulator')
    result = execute(qc, backend=simulator, shots=1).result()
    counts = result.get_counts(qc)
    measured_bits = list(counts.keys())[0][::-1]

    # Sifting the key
    sifted_key = []
    for i in range(num_qubits):
        if alice_bases[i] == bob_bases[i]:  # Sift only when bases match
            sifted_key.append(measured_bits[2 * i])

    return alice_bases, bob_bases, sifted_key

# Visualization Functions
def plot_bases_distribution(alice_bases, bob_bases):
    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    sns.countplot(data=pd.DataFrame({'bases': alice_bases}), x='bases', order=['x', 'y', 'z'])
    plt.title("Alice's Bases Distribution")
    plt.xlabel('Basis')
    plt.ylabel('Count')

    plt.subplot(1, 2, 2)
    sns.countplot(data=pd.DataFrame({'bases': bob_bases}), x='bases', order=['x', 'y', 'z'])
    plt.title("Bob's Bases Distribution")
    plt.xlabel('Basis')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.show()

def plot_sifted_key(sifted_key):
    plt.figure(figsize=(10, 5))
    sns.countplot(data=pd.DataFrame({'sifted_key': sifted_key}), x='sifted_key', order=['0', '1'])
    plt.title('Sifted Key Distribution')
    plt.xlabel('Bit Value')
    plt.ylabel('Count')
    plt.show()

# User input
num_qubits = int(input("Enter the number of qubit pairs: "))

# Running the simulation
alice_bases, bob_bases, sifted_key = perform_e91_simulation(num_qubits)

# Display results
print(f"Alice's Bases: {alice_bases}")
print(f"Bob's Bases: {bob_bases}")
print(f"Sifted Key: {sifted_key}")

# Visualization
plot_bases_distribution(alice_bases, bob_bases)
plot_sifted_key(sifted_key)
