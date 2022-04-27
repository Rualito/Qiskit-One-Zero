## Qiskit-One-Zero

**Bronze** is our introductory tutorial on _**quantum computing and quantum programming**_ created in October 2018.

**Bronze-Qiskit** is the version of Bronze using [**Qiskit**](https://qiskit.org) as the quantum programming framework. It was released in February 2021 with the support of [**IBM Quantum**](https://www.ibm.com/quantum-computing/).

Quantum Key Distribution (QKD) does a key exchange between Alice and Bob, with or without an Eve (as specified by the input variable). The function returns True if they got the same key and False otherwise.  It is important to mention that the length of the key will average half the length of the random bits that Alice and Bob agreed on before. If Eve is present, then Alice and Bob will not have matching keys, resulting in communication failure between them. If someone generates enough iterations, it may be that Alice and Bob will have the same key, but this is random. 

### Prerequisite

The only prerequisite is to know the basics of programming (variables and basic data types, loops, and conditionals). Any previous experience in python will be helpful. If you do not have any such experince, you can check our notebooks on python before starting the tutorial.

Bronze also has notebooks on the basic math to review your knowledge on the simple arithmetic operations on vectors and matrices.

### Bronze-Qiskit's sections

- Python (for a quick review)
- Basic math (for a quick review)
- Classical systems: bits, coin-flipping, probabilistic state and operators, composite systems, correlation, and controlled operators
- Quantum systems with Qiskit
    - Qiskit basics: circuit design, visualization, and simulation
    - quantum basics: quantum coin-flipping and Hadamard operator, quantum states and opeators, visualization of a real-valued qubit, superposition and measurements
    - quantum operators on a real-valued single qubit (rotations and reflections) and quantum tomography
    - entanglement and basic quantum protocols superdense coding and quantum teleportation
    - Grover's search algorithm

Our following elementrary level tutorial _Silver_ is under revision now, and we will start to prepare the advanced level tutorial Gold in 2021.

## Quantum Mechanics explanation

Quantum communication will be based on two quantum basis: the computational basis \|0\> and \|1\>, and the Hadamard basis 1/sqrt(2)\*(\|0\> + \|1\>) and 1/sqrt(2)\*(\|0\> - \|1\>). When a Quantum user generates a random bit associated with these basis we choose 0 as the computational basis and 1 as the Hadamard basis.

When measured, we apply Hadamard gate on the Hadamard basis Qubits and the Identity gate at the computational basis. |0> and 1/sqrt(2)\*(|0> + |1>) are interpretated as bit 0 and |1> and 1/sqrt(2)\*(|0> - |1>) are interpretated as bit 1.

- Alice and Bob publicly agree upon a number N, this number should be at least 2 times the key length that they expect to get. They also agree who will be the sender and who will be the receiver.
- Alice generates N random bits (using a Quantum random generator, at the best scenario, but she can use a pseudo-random generator like /dev/random) and maps them to Quantum basis.
- Alice generates N random bits and creates the required states using the previous random basis. She then sends these Qubits through the quantum channel (i.e. Fibre Optic with polarized Photons) So:
	
-	Basis | Bits | State
	------| -----|-----
	0     | 0    | \|0\>
	0     | 1    | \|1\>
	1     | 1    | 1/sqrt(2)\*(\|0\> + \|1\>)
	1     | 1    | 1/sqrt(2)\*(\|0\> - \|1\>)
- Bob generates N random bits and maps them to their quantum basis.
- Bob measured the received Qubits from Alice with his basis, he then gets the measured bits.
- Alice and Bob exchange publicly their basis and compare them locally.
- Alice and Bob drop the bits where their basis doesn't match, the remaining bits will be the agreed key. If the key length is may below N/2 then they consider a MITM attack happened.
- Alice sends and encrypted "Hello" message to Bob with that key. If Bob can't decrypt the message with his key then a MITM ocurred (or decoherence), otherwise they have their key for encryption.


