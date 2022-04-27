# Qiskit-One-Zero

**Quantum Key Distribution (QKD)** does a key exchange between Alice and Bob, with or without an Eve (as specified by the input variable). The function returns True if they got the same key and False otherwise.  It is important to mention that the length of the key will average half the length of the random bits that Alice and Bob agreed on before. If Eve is present, then Alice and Bob will not have matching keys, resulting in communication failure between them. If someone generates enough iterations, it may be that Alice and Bob will have the same key, but this is random. 


### Repository Description 

The repository contains the solutions of the proposed challenges and a lesson on Quantum Key Destribution meant for undergratue students. The lesson consists of a jupyter notebook that contains a hands-on tutorial and exercises on the topic and slides that introduce QKD in a lecture format. 

### Prerequisite

Prerequisites are knowing the basics of Qiskit and basic variables and data types, loops and conditionals in python. Any previous experience with basic quantum mechanics will be helpful.

### Protocol step-by-step

- Alice and Bob publicly agree on a number N, this number must be at least 2 times the length of the key they hope to obtain. 
- Alice generates N random bits and maps them to Quantum basis.
- Alice creates the required states using the previous random basis. She then sends these Qubits through the quantum channel
- Bob generates N random bits and maps them to their quantum basis.
- Bob measured the received Qubits from Alice with his basis, he then gets the measured bits.
- Alice and Bob exchange publicly their basis and compare them locally.
- Alice and Bob drop some bits where their base does not match, the remaining pieces will be the agreed key. If the length of the key is less than N/2, then they consider that a attack has happened.

## References

[1] https://qiskit.org/textbook/ch-algorithms/quantum-key-distribution.html
[2]
[3]
