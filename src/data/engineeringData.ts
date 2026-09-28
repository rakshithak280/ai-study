import { Branch, Subject, ConceptBridge, CapstoneProject, EngineeringConstant } from '../types';

export const BRANCHES: Branch[] = [
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    code: 'ME',
    tagline: 'Forces, Thermal Dynamics, Materials & Kinematic Systems',
    primaryDomain: 'Continuum Mechanics & Thermofluids',
    accentColor: 'amber',
    iconName: 'Cog',
    coreConcepts: ['Newtonian Mechanics', 'Thermodynamics', 'Stress-Strain', 'Fluid Dynamics', 'Heat Transfer'],
    thinkingModel: 'Free body diagrams, conservation of energy, flow in ducts, stress concentrations',
    keyGoverningLaw: 'ΣF = ma & dE/dt = Q̇ - Ẇ',
    strengths: ['Physical intuition', 'Spatial visualization', 'Material properties', 'Vibration modes']
  },
  {
    id: 'computer_science',
    name: 'Computer Science & Software',
    code: 'CSE',
    tagline: 'Algorithms, Data Structures, Compute Architecture & Systems',
    primaryDomain: 'Discrete Mathematics & Computational Models',
    accentColor: 'cyan',
    iconName: 'Binary',
    coreConcepts: ['Algorithmic Complexity O(n)', 'Memory Hierarchies', 'State Machines', 'Concurrency', 'Graph Theory'],
    thinkingModel: 'Input-process-output, abstraction layers, asynchronous pipelines, deterministic state transitions',
    keyGoverningLaw: 'T(n) = aT(n/b) + f(n) (Master Theorem)',
    strengths: ['Logical abstraction', 'Automation', 'Data modeling', 'Scalability analysis']
  },
  {
    id: 'electrical_electronics',
    name: 'Electrical & Electronics',
    code: 'EEE',
    tagline: 'Electromagnetics, Signals, Semiconductors & Power Grids',
    primaryDomain: 'Electrodynamics & Signal Processing',
    accentColor: 'sky',
    iconName: 'Zap',
    coreConcepts: ['Kirchhoff Laws', 'Maxwell Equations', 'Fourier Transforms', 'Semiconductor Junctions', 'Impedance Matching'],
    thinkingModel: 'Potential vs flow, frequency domain vs time domain, transfer functions, pole-zero stability',
    keyGoverningLaw: 'V = IR & ∇ × E = -∂B/∂t',
    strengths: ['Frequency analysis', 'Circuit intuition', 'Signal-to-noise ratio', 'Control feedback']
  },
  {
    id: 'civil_structural',
    name: 'Civil & Structural Engineering',
    code: 'CIV',
    tagline: 'Static Equilibrium, Geotechnics, Hydraulics & Infrastructure',
    primaryDomain: 'Statics & Continuum Geomechanics',
    accentColor: 'stone',
    iconName: 'Building',
    coreConcepts: ['Static Equilibrium (ΣF=0, ΣM=0)', 'Shear & Moment Diagrams', 'Soil Mechanics', 'Hydraulic Head', 'Factor of Safety'],
    thinkingModel: 'Load path distribution, boundary conditions, buckling limits, fluid open-channel gravity flow',
    keyGoverningLaw: 'M/I = σ/y = E/R (Euler-Bernoulli Beam)',
    strengths: ['Boundary condition analysis', 'Factor of safety design', 'Large-scale system longevity', 'Gravity load paths']
  },
  {
    id: 'chemical_materials',
    name: 'Chemical & Materials Engineering',
    code: 'CHEM',
    tagline: 'Reaction Kinetics, Mass Transport, Phase Equilibria & Nanomaterials',
    primaryDomain: 'Molecular Thermodynamics & Transport Phenomena',
    accentColor: 'emerald',
    iconName: 'FlaskConical',
    coreConcepts: ['Mass & Energy Balances', 'Gibbs Free Energy', 'Fick Law of Diffusion', 'Arrhenius Reaction Kinetics', 'Phase Diagrams'],
    thinkingModel: 'Control volumes, chemical potential gradients, reaction rates, continuous stirred tanks',
    keyGoverningLaw: 'J = -D (dC/dx) & ΔG = ΔH - TΔS',
    strengths: ['Transport phenomena', 'Phase transition analysis', 'Molecular-to-macro scaling', 'Equilibrium states']
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Aeronautical',
    code: 'AERO',
    tagline: 'Compressible Aerodynamics, Propulsion, Orbital Mechanics & Avionics',
    primaryDomain: 'High-Speed Gas Dynamics & Flight Mechanics',
    accentColor: 'indigo',
    iconName: 'Plane',
    coreConcepts: ['Lift & Drag Polars', 'Navier-Stokes (Compressible)', 'Rocket Equation', 'Gyroscopic Stability', 'Aeroelastic Flutter'],
    thinkingModel: 'Mass-weight penalties, hypersonic shockwaves, orbital state vectors, structural margin optimization',
    keyGoverningLaw: 'L = 1/2 ρ v² S C_L & Δv = v_e ln(m_0/m_f)',
    strengths: ['Extreme tolerance budgeting', 'Dynamic stability', 'Flow field modeling', 'Multi-regime physics']
  },
  {
    id: 'biomedical',
    name: 'Biomedical & Bioengineering',
    code: 'BME',
    tagline: 'Physiological Systems, Biosensors, Biomechanics & Neural Tech',
    primaryDomain: 'Living Tissue Mechanics & Bio-Instrumentation',
    accentColor: 'rose',
    iconName: 'HeartPulse',
    coreConcepts: ['Viscoelasticity', 'Electrophysiology (Nernst-Planck)', 'Biocompatibility', 'Biosignal Processing', 'Hemodynamics'],
    thinkingModel: 'Homeostasis feedback, non-linear biological elasticity, ionic potential gradients, sensor artifact rejection',
    keyGoverningLaw: 'E = (RT/zF) ln([Ion]_out / [Ion]_in)',
    strengths: ['Noisy real-world signal handling', 'Adaptive compliance', 'Interdisciplinary synthesis', 'Ethical safety constraints']
  },
  {
    id: 'mechatronics',
    name: 'Mechatronics & Robotics',
    code: 'MTR',
    tagline: 'Sensors, Actuators, Real-Time Microcontrollers & Motion Control',
    primaryDomain: 'Cyber-Physical Systems & Kinematics',
    accentColor: 'violet',
    iconName: 'Bot',
    coreConcepts: ['Forward/Inverse Kinematics', 'H-Bridge & PWM', 'State Estimation (EKF)', 'Encoder Feedback', 'Real-Time OS'],
    thinkingModel: 'Closed-loop cyber-physical coupling, latency budgets, torque-speed curves, actuator saturation',
    keyGoverningLaw: 'τ = J α + B ω & x_k = A x_{k-1} + B u_k',
    strengths: ['Hardware-software boundary', 'Actuator selection', 'System integration', 'Rapid prototyping']
  }
];

export const SUBJECTS: Subject[] = [
  {
    id: 'control-systems-pid',
    title: 'Modern Control Systems & PID Loops',
    category: 'cross_frontiers',
    level: 'Foundational',
    estimatedHours: 24,
    summary: 'The universal language of feedback control, dynamic stability, and step response across physical and digital systems.',
    description: 'Control theory is the cornerstone of modern engineering. From keeping a drone level to maintaining reactor temperature or auto-scaling cloud servers, closed-loop feedback governs how systems automatically correct errors.',
    prerequisites: ['Differential Equations', 'Basic Physics or Linear Algebra'],
    tags: ['Feedback Control', 'PID', 'Stability', 'Bode Plots', 'State Space'],
    branchMotivation: {
      mechanical: {
        importance: 'Essential for automotive cruise control, active suspension, CNC machining tolerances, and vibration dampers.',
        nativeAnalogy: 'Like adjusting steering counter-torque when driving through a gust of side wind.',
        difficultyRating: 2
      },
      computer_science: {
        importance: 'Crucial for rate limiters, network TCP congestion windows, auto-scaling clusters, and game physics.',
        nativeAnalogy: 'Like a dynamic queue retry-backoff algorithm that adjusts delay based on packet drop rate.',
        difficultyRating: 2
      },
      electrical_electronics: {
        importance: 'Directly powers switch-mode power supplies (SMPS), phase-locked loops (PLL), and motor drives.',
        nativeAnalogy: 'Like an op-amp negative feedback loop that maintains a virtual ground.',
        difficultyRating: 1
      },
      civil_structural: {
        importance: 'Powers active tuned mass dampers in skyscrapers (e.g. Taipei 101) to counteract hurricane and earthquake swaying.',
        nativeAnalogy: 'Like a hydraulic pendulum that pushes opposite to the building sway moment.',
        difficultyRating: 3
      },
      chemical_materials: {
        importance: 'Core requirement for maintaining temperature, pH, and pressure in Continuous Stirred-Tank Reactors (CSTR).',
        nativeAnalogy: 'Like throttling the cooling jacket valve based on the reaction exotherm rate.',
        difficultyRating: 2
      },
      aerospace: {
        importance: 'Vital for fly-by-wire flight control, attitude holding, thrust vectoring, and missile guidance.',
        nativeAnalogy: 'Like trimming elevator angles to hold a glide slope in turbulent air.',
        difficultyRating: 2
      },
      biomedical: {
        importance: 'Models biological homeostasis (insulin-glucose regulation, baroreceptor blood pressure reflexes) and mechanical ventilators.',
        nativeAnalogy: 'Like the endocrine system secreting counter-regulatory hormones to maintain blood glucose balance.',
        difficultyRating: 2
      },
      mechatronics: {
        importance: 'The very heartbeat of robotics: joint trajectory tracking, inverted pendulums, and quadcopter stability.',
        nativeAnalogy: 'Like adjusting brushless motor duty cycle to hold an inverted pendulum perfectly upright.',
        difficultyRating: 1
      }
    },
    modules: [
      {
        title: 'Open-Loop vs Closed-Loop Dynamics',
        duration: '4 hours',
        summary: 'Why open-loop systems fail under disturbances and how negative feedback guarantees precision despite environmental uncertainty.',
        keyFormulas: ['e(t) = r(t) - y(t)', 'G_{closed}(s) = \\frac{G(s)}{1 + G(s)H(s)}']
      },
      {
        title: 'The Anatomy of PID (Proportional, Integral, Derivative)',
        duration: '6 hours',
        summary: 'Deconstructing present error (Kp), past accumulated error (Ki), and anticipated future rate of change (Kd).',
        keyFormulas: ['u(t) = K_p e(t) + K_i \\int_0^t e(\\tau)d\\tau + K_d \\frac{de(t)}{dt}']
      },
      {
        title: 'Step Response & Stability Metrics',
        duration: '8 hours',
        summary: 'Analyzing rise time, percentage overshoot, settling time, and steady-state error using transfer functions.',
        keyFormulas: ['\\omega_n = \\sqrt{k/m}', '\\zeta = \\frac{c}{2\\sqrt{km}}', 'M_p = e^{-\\frac{\\pi \\zeta}{\\sqrt{1-\\zeta^2}}} \\times 100\\%']
      },
      {
        title: 'Ziegler-Nichols & Practical Tuning Heuristics',
        duration: '6 hours',
        summary: 'How to manually and algorithmically tune controllers on hardware without mathematical plant models.',
        practicalExercise: 'Tune our interactive PID simulator to stabilize an unstable dynamical plant with < 5% overshoot.'
      }
    ],
    keyFormulas: [
      {
        name: 'PID Control Law',
        formula: 'u(t) = K_p e(t) + K_i \\int_0^t e(\\tau)d\\tau + K_d \\frac{de(t)}{dt}',
        variables: 'u(t)=control effort, e(t)=setpoint error, Kp,Ki,Kd=gains',
        physicalMeaning: 'Combines present reaction (P), historic bias elimination (I), and predictive damping (D).'
      },
      {
        name: 'Damping Ratio & Overshoot',
        formula: '\\%OS = e^{-\\frac{\\pi \\zeta}{\\sqrt{1-\\zeta^2}}} \\times 100\\%',
        variables: 'ζ (zeta) = damping ratio, %OS = percentage overshoot',
        physicalMeaning: 'When ζ < 1 the system is underdamped and rings; at ζ = 1 it is critically damped with no overshoot.'
      }
    ],
    codeSnippet: {
      language: 'python',
      title: 'Real-Time Discrete PID Controller Class',
      code: `class PIDController:
    def __init__(self, kp: float, ki: float, kd: float, dt: float, out_limits=(-100.0, 100.0)):
        self.kp, self.ki, self.kd = kp, ki, kd
        self.dt = dt
        self.min_out, self.max_out = out_limits
        self.integral = 0.0
        self.prev_error = 0.0

    def compute(self, setpoint: float, measured: float) -> float:
        error = setpoint - measured
        self.integral += error * self.dt
        # Anti-windup clamping
        self.integral = max(-50.0, min(50.0, self.integral))
        derivative = (error - self.prev_error) / self.dt
        
        output = (self.kp * error) + (self.ki * self.integral) + (self.kd * derivative)
        self.prev_error = error
        return max(self.min_out, min(self.max_out, output))`
    },
    quiz: [
      {
        id: 'pid-1',
        question: 'Which PID term is responsible for completely eliminating steady-state error (offset)?',
        options: ['Proportional (Kp)', 'Integral (Ki)', 'Derivative (Kd)', 'Feedforward gain'],
        correctIndex: 1,
        explanation: 'The Integral term accumulates error over time, continuously increasing control effort until the error reaches exactly zero.'
      },
      {
        id: 'pid-2',
        question: 'What is the primary danger of setting the Derivative gain (Kd) too high in a noisy sensor environment?',
        options: ['It slows down the rise time unnecessarily', 'It amplifies high-frequency noise and causes actuator jitter', 'It forces steady-state error to infinity', 'It causes the integral term to reset to zero'],
        correctIndex: 1,
        explanation: 'Derivative is rate of change (de/dt). High-frequency electrical or mechanical noise has huge instantaneous slopes, causing violent actuator chatter.'
      }
    ]
  },
  {
    id: 'fourier-dsp-signals',
    title: 'Signals, Systems & Fast Fourier Transforms (FFT)',
    category: 'electrical_silicon',
    level: 'Foundational',
    estimatedHours: 20,
    summary: 'Transforming complex time-domain oscillations into crisp frequency spectra for diagnostics, audio, vibration, and seismic data.',
    description: 'The Fourier Transform is often called the most important algorithm in human history. It proves that any continuous signal can be represented as an infinite sum of simple sine and cosine waves.',
    prerequisites: ['Trigonometry', 'Calculus', 'Complex Numbers (e^{i theta})'],
    tags: ['Fourier Transform', 'FFT', 'DSP', 'Frequency Domain', 'Filtering'],
    branchMotivation: {
      mechanical: {
        importance: 'The #1 tool for predictive maintenance: detecting ball-bearing raceway damage and gearbox wear via vibration harmonics.',
        nativeAnalogy: 'Like listening to an engine and immediately knowing which piston or valve is tapping by its pitch.',
        difficultyRating: 2
      },
      computer_science: {
        importance: 'Powers image compression (JPEG DCT), MP3/AAC audio streaming, speech recognition, and polynomial multiplication in O(n log n).',
        nativeAnalogy: 'Like sorting unsorted chaotic arrays into a clean histogram of fundamental recurring frequencies.',
        difficultyRating: 2
      },
      electrical_electronics: {
        importance: 'Fundamental core: RF modulation, impedance analysis, wireless communication (OFDM in 5G/Wi-Fi), and filter design.',
        nativeAnalogy: 'Your native language: spectrum analyzers and Bode plots.',
        difficultyRating: 1
      },
      civil_structural: {
        importance: 'Used to measure natural resonant frequencies of bridges and buildings to prevent catastrophic resonance during earthquakes.',
        nativeAnalogy: 'Like identifying the wobble frequency of a suspension bridge to ensure wind vortex shedding will not match it.',
        difficultyRating: 2
      },
      chemical_materials: {
        importance: 'Powers FTIR (Fourier Transform Infrared Spectroscopy) to identify chemical bonds and molecular structures.',
        nativeAnalogy: 'Like separating a blended solvent into its pure chemical constituent fractions.',
        difficultyRating: 2
      },
      aerospace: {
        importance: 'Critical for aeroelastic flutter prevention, supersonic wind tunnel telemetry, and radar doppler processing.',
        nativeAnalogy: 'Detecting the flutter frequency of a flexible composite wing before destructive resonance tears it apart.',
        difficultyRating: 2
      },
      biomedical: {
        importance: 'Essential for ECG (heart rate variability), EEG brainwave rhythm decomposition (alpha, beta, theta), and MRI k-space image reconstruction.',
        nativeAnalogy: 'Dissecting a multi-lead EEG recording into distinct alpha (awake) vs delta (deep sleep) brainwave rhythms.',
        difficultyRating: 2
      },
      mechatronics: {
        importance: 'Filtering sensor noise from IMU accelerometers/gyros and identifying mechanical resonance frequencies in robotic joints.',
        nativeAnalogy: 'Stripping out high-frequency motor vibration noise from your IMU pitch angle readings.',
        difficultyRating: 1
      }
    },
    modules: [
      {
        title: 'The Time-to-Frequency Metaphor',
        duration: '4 hours',
        summary: 'Deconstructing a musical chord into its individual piano keys; understanding Euler formula e^{iωt} as circular rotation.',
        keyFormulas: ['e^{i\\theta} = \\cos\\theta + i\\sin\\theta']
      },
      {
        title: 'Continuous vs Discrete Fourier Transform (DFT)',
        duration: '5 hours',
        summary: 'How analog physics translates into discrete sampled digital arrays with sampling theorem (Nyquist limit).',
        keyFormulas: ['X[k] = \\sum_{n=0}^{N-1} x[n] e^{-i 2\\pi k n / N}', 'f_{Nyquist} = \\frac{f_s}{2}']
      },
      {
        title: 'The FFT Revolution (Cooley-Tukey O(N log N))',
        duration: '5 hours',
        summary: 'How divide-and-conquer turned an impossible O(N²) matrix operation into real-time digital signal processing.',
        keyFormulas: ['Complexity: O(N \\log_2 N)']
      },
      {
        title: 'Digital Filtering & Windowing (Hamming, Hanning)',
        duration: '6 hours',
        summary: 'Designing low-pass, high-pass, and band-pass digital filters (IIR and FIR) to isolate clean signals.',
        practicalExercise: 'Inspect noisy accelerometer readings and apply an FFT to locate the exact 60Hz mechanical vibration spike.'
      }
    ],
    keyFormulas: [
      {
        name: 'Discrete Fourier Transform (DFT)',
        formula: 'X[k] = \\sum_{n=0}^{N-1} x[n] e^{-i \\frac{2\\pi}{N} k n}',
        variables: 'x[n]=time sample, X[k]=frequency bin amplitude/phase, N=sample count',
        physicalMeaning: 'Measures how much the signal correlates with a rotating phasor at frequency k.'
      },
      {
        name: 'Nyquist-Shannon Sampling Theorem',
        formula: 'f_s > 2 f_{max}',
        variables: 'fs = sampling frequency, fmax = highest frequency in signal',
        physicalMeaning: 'You must sample at more than twice the maximum frequency to prevent aliasing distortion.'
      }
    ],
    codeSnippet: {
      language: 'python',
      title: 'Vibration Signal FFT & Peak Frequency Finder',
      code: `import numpy as np

def compute_spectrum(signal: np.ndarray, sampling_rate_hz: float):
    N = len(signal)
    # Apply Hanning window to prevent spectral leakage
    windowed = signal * np.hanning(N)
    # Compute FFT
    fft_vals = np.fft.rfft(windowed)
    fft_magnitude = (2.0 / N) * np.abs(fft_vals)
    freqs = np.fft.rfftfreq(N, d=1.0 / sampling_rate_hz)
    
    peak_idx = np.argmax(fft_magnitude[1:]) + 1
    dominant_frequency = freqs[peak_idx]
    return freqs, fft_magnitude, dominant_frequency`
    },
    quiz: [
      {
        id: 'fft-1',
        question: 'If you want to measure vibrations up to 500 Hz without aliasing, what is the minimum sampling frequency required?',
        options: ['250 Hz', '500 Hz', '1000 Hz', '2000 Hz'],
        correctIndex: 2,
        explanation: 'According to the Nyquist-Shannon theorem, the sampling rate must exceed 2 * f_max (2 * 500 Hz = 1000 Hz).'
      }
    ]
  },
  {
    id: 'deep-learning-first-principles',
    title: 'Machine Learning & Neural Networks for Physical Engineers',
    category: 'computer_science_ai',
    level: 'Intermediate',
    estimatedHours: 28,
    summary: 'Demystifying AI, backpropagation, and transformers through the lens of optimization, energy minimization, and matrix physics.',
    description: 'Neural networks are not mystical black boxes; they are parameterized non-linear function approximators optimized by gradient descent. For non-CS engineers, gradient descent is mathematically identical to finding the minimum potential energy configuration of a physical system.',
    prerequisites: ['Linear Algebra (Matrix Multiplication)', 'Multivariable Calculus (Gradients)'],
    tags: ['Machine Learning', 'Neural Networks', 'Gradient Descent', 'Backpropagation', 'Edge AI'],
    branchMotivation: {
      mechanical: {
        importance: 'Used for surrogate FEA modeling, acoustic fault detection, autonomous driving sensor fusion, and topology optimization.',
        nativeAnalogy: 'Gradient descent is like a marble rolling down a friction-filled potential energy bowl seeking the lowest gravitational point.',
        difficultyRating: 2
      },
      computer_science: {
        importance: 'Native core domain: foundation models, reinforcement learning, computer vision, and modern software architectures.',
        nativeAnalogy: 'Differentiable computational graphs with automatic backward derivative propagation.',
        difficultyRating: 1
      },
      electrical_electronics: {
        importance: 'Critical for edge AI hardware accelerators (NPUs, systolic arrays), analog computing, and RF signal classification.',
        nativeAnalogy: 'Weights act like programmable variable conductance resistors in a crossbar matrix.',
        difficultyRating: 2
      },
      civil_structural: {
        importance: 'Predictive structural health monitoring from strain gauges, satellite radar displacement tracking, and soil settlement forecasting.',
        nativeAnalogy: 'Like calculating the minimum compliance layout of a truss under multiple stochastic load cases.',
        difficultyRating: 3
      },
      chemical_materials: {
        importance: 'Accelerating molecular discovery (AlphaFold), predicting polymer glass transition temperatures, and optimizing refining catalysts.',
        nativeAnalogy: 'Energy minimization on a multidimensional Gibbs free energy surface.',
        difficultyRating: 2
      },
      aerospace: {
        importance: 'Real-time aerodynamic surrogate models, aircraft trajectory optimization, and autonomous drone swarm formation.',
        nativeAnalogy: 'Like calculating optimal angle-of-attack polar trim using non-linear multidimensional lookups.',
        difficultyRating: 2
      },
      biomedical: {
        importance: 'Medical imaging segmentation (CT/MRI tumor detection), EEG classification, and genomic sequence decoding.',
        nativeAnalogy: 'Like an automated diagnostic technician that detects micro-patterns across 10,000 patient vitals simultaneously.',
        difficultyRating: 2
      },
      mechatronics: {
        importance: 'End-to-end vision-language-action (VLA) robot manipulation, grasping policies, and dynamic visual SLAM.',
        nativeAnalogy: 'Closing the loop from camera pixels directly to motor joint torques without hand-engineered heuristic rules.',
        difficultyRating: 1
      }
    },
    modules: [
      {
        title: 'The Perceptron as a Linear Classifier & Non-linear Threshold',
        duration: '5 hours',
        summary: 'Weights as stiffness, biases as pre-strain, and activation functions (ReLU, GELU) as physical diode switches.',
        keyFormulas: ['y = \\sigma(\\mathbf{w}^T \\mathbf{x} + b)', '\\text{ReLU}(z) = \\max(0, z)']
      },
      {
        title: 'Loss Functions as Potential Energy Landscapes',
        duration: '6 hours',
        summary: 'Mean Squared Error and Cross-Entropy viewed as energetic penalties against desired state.',
        keyFormulas: ['\\mathcal{L}_{MSE} = \\frac{1}{N}\\sum_{i=1}^N (y_i - \\hat{y}_i)^2']
      },
      {
        title: 'Backpropagation: The Chain Rule as Force Equilibrium',
        duration: '8 hours',
        summary: 'Tracing errors backward through the network graph using multivariable chain rule.',
        keyFormulas: ['\\frac{\\partial \\mathcal{L}}{\\partial w_{ij}} = \\frac{\\partial \\mathcal{L}}{\\partial a_j} \\frac{\\partial a_j}{\\partial z_j} \\frac{\\partial z_j}{\\partial w_{ij}}']
      },
      {
        title: 'From CNNs to Transformers & Attention for Physical Data',
        duration: '9 hours',
        summary: 'Self-attention as dynamic pairwise correlation matrices between physical sensor streams.',
        practicalExercise: 'Train a 3-layer neural network from scratch in 50 lines of Python numpy to predict material yield strength.'
      }
    ],
    keyFormulas: [
      {
        name: 'Gradient Descent Weight Update',
        formula: '\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta \\nabla_{\\mathbf{w}} \\mathcal{L}',
        variables: 'w = weights, η (eta) = learning rate, ∇L = gradient vector of loss',
        physicalMeaning: 'Step in the steepest downhill direction on the loss manifold.'
      },
      {
        name: 'Scaled Dot-Product Attention',
        formula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V',
        variables: 'Q=Queries, K=Keys, V=Values, dk=dimension key scale',
        physicalMeaning: 'Computes a normalized affinity matrix between all tokens/sensors, weighting which signals inform which outputs.'
      }
    ],
    codeSnippet: {
      language: 'python',
      title: 'Minimal 2-Layer Neural Network in Pure NumPy',
      code: `import numpy as np

def sigmoid(x): return 1 / (1 + np.exp(-x))
def sigmoid_derivative(x): return x * (1 - x)

# Synthetic engineering dataset (2 inputs, 1 output)
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]]) # XOR problem

np.random.seed(42)
w0 = 2 * np.random.random((2, 4)) - 1
w1 = 2 * np.random.random((4, 1)) - 1

for epoch in range(10000):
    # Forward pass
    l0 = X
    l1 = sigmoid(np.dot(l0, w0))
    l2 = sigmoid(np.dot(l1, w1))
    
    # Backpropagation
    l2_error = y - l2
    l2_delta = l2_error * sigmoid_derivative(l2)
    l1_error = l2_delta.dot(w1.T)
    l1_delta = l1_error * sigmoid_derivative(l1)
    
    # Gradient descent update
    w1 += l1.T.dot(l2_delta) * 0.5
    w0 += l0.T.dot(l1_delta) * 0.5`
    },
    quiz: [
      {
        id: 'dl-1',
        question: 'In physical terms, why do we use non-linear activation functions (like ReLU) between linear matrix layers?',
        options: ['To speed up GPU arithmetic operations', 'Without non-linearity, stacking 100 matrix layers mathematically collapses into a single linear layer', 'To prevent weights from exceeding 1.0', 'To invert the matrix transpose'],
        correctIndex: 1,
        explanation: 'The product of two linear transformations W2 * W1 is just another linear transformation W3. Non-linearities allow the network to approximate arbitrary non-linear manifolds.'
      }
    ]
  },
  {
    id: 'thermodynamics-heat-transfer',
    title: 'Thermodynamics & Heat Transfer for Computing & Hardware',
    category: 'mechanical_thermal',
    level: 'Foundational',
    estimatedHours: 22,
    summary: 'Energy conservation, Carnot limits, conduction, convection, and thermal resistance in modern systems.',
    description: 'Heat is the universal bottleneck in every engineering system. Whether dealing with a 400W GPU thermal throttle, an electric vehicle battery pack, a hypersonic nose cone, or a chemical reactor, heat dissipation dictates performance.',
    prerequisites: ['General Physics', 'Introductory Calculus'],
    tags: ['Thermodynamics', 'Heat Transfer', 'Thermal Resistance', 'Convection', 'Cooling'],
    branchMotivation: {
      mechanical: {
        importance: 'Native core domain: refrigeration cycles, combustion engines, HVAC systems, and aerodynamic heating.',
        nativeAnalogy: 'Energy accounting where entropy always wins in the end.',
        difficultyRating: 1
      },
      computer_science: {
        importance: 'Modern datacenter architectures and high-performance computing are thermally limited (TDP throttling, power usage effectiveness).',
        nativeAnalogy: 'Like thermal throttling acting as hardware-enforced CPU rate-limiting when the heat sink queue overflows.',
        difficultyRating: 2
      },
      electrical_electronics: {
        importance: 'Crucial for semiconductor junction temperatures, power MOSFET thermal dissipation, and PCB copper pour thermal vias.',
        nativeAnalogy: 'Directly follows Ohm Law: Temperature difference = Heat flow × Thermal resistance (ΔT = Q̇ × R_th).',
        difficultyRating: 1
      },
      civil_structural: {
        importance: 'Expansion joints in bridges and rail tracks, building insulation (R-values), and solar radiation loads on concrete.',
        nativeAnalogy: 'Accounting for thermal expansion strain ε = α ΔT so that concrete bridges do not crack under summer heat.',
        difficultyRating: 2
      },
      chemical_materials: {
        importance: 'Native core: phase changes, enthalpy of reaction, distillation trays, and heat exchanger design.',
        nativeAnalogy: 'Enthalpy and entropy balances governing chemical equilibrium and spontaneity.',
        difficultyRating: 1
      },
      aerospace: {
        importance: 'Re-entry thermal protection tiles, turbine blade cooling passages, and cryogenic rocket fuel boiling prevention.',
        nativeAnalogy: 'Dissipating orbital kinetic energy as shockwave heat without melting the spacecraft hull.',
        difficultyRating: 2
      },
      biomedical: {
        importance: 'Hypothermia therapy, laser tissue ablation, and thermal management in implantable neural stimulators.',
        nativeAnalogy: 'Understanding the body thermoregulatory vasodilation and metabolic heat production.',
        difficultyRating: 2
      },
      mechatronics: {
        importance: 'Preventing robot motor burnout under continuous stall torque and sizing heat sinks for motor driver H-bridges.',
        nativeAnalogy: 'Ensuring your servo motor coil does not exceed its 130°C insulation rating under high holding torque.',
        difficultyRating: 2
      }
    },
    modules: [
      {
        title: 'The First & Second Laws: Energy & Irreversibility',
        duration: '5 hours',
        summary: 'Conservation of energy dE = δQ - δW, entropy increase dS ≥ δQ/T, and the Carnot theoretical efficiency ceiling.',
        keyFormulas: ['\\eta_{Carnot} = 1 - \\frac{T_C}{T_H}']
      },
      {
        title: 'The Ohm Law of Heat: Thermal Resistance Modeling',
        duration: '6 hours',
        summary: 'Modeling conduction, convection, and interface TIM (Thermal Interface Material) as simple resistor ladders.',
        keyFormulas: ['R_{cond} = \\frac{L}{k A}', 'R_{conv} = \\frac{1}{h A}', '\\Delta T = \\dot{Q} R_{total}']
      },
      {
        title: 'Phase Change & Heat Pipes',
        duration: '5 hours',
        summary: 'How latent heat of vaporization enables compact heat pipes and vapor chambers to conduct heat 100x faster than solid copper.',
        keyFormulas: ['\\dot{Q} = \\dot{m} h_{fg}']
      },
      {
        title: 'Thermal Management in Electronics & Batteries',
        duration: '6 hours',
        summary: 'Preventing lithium-ion thermal runaway and sizing CPU heatsinks with fan air CFM curves.',
        practicalExercise: 'Calculate junction temperature of a 150W processor given heatsink thermal resistance and ambient airflow.'
      }
    ],
    keyFormulas: [
      {
        name: 'Fourier Law of Thermal Conduction',
        formula: '\\dot{Q} = -k A \\frac{dT}{dx}',
        variables: 'Q̇=heat transfer rate (W), k=thermal conductivity (W/m·K), A=area, dT/dx=gradient',
        physicalMeaning: 'Heat flows down a temperature slope proportional to the material thermal conductivity.'
      },
      {
        name: 'Thermal Ohm Law',
        formula: 'T_j - T_a = P_{dissipated} \\times (R_{\\theta jc} + R_{\\theta cs} + R_{\\theta sa})',
        variables: 'Tj=junction temp, Ta=ambient, P=power (Watts), Rθ=thermal resistances',
        physicalMeaning: 'Total temperature rise equals total electrical power dissipated multiplied by sum of thermal resistances.'
      }
    ],
    codeSnippet: {
      language: 'python',
      title: 'Transistor Thermal Budget & Junction Temperature Checker',
      code: `def check_junction_temp(power_watts: float, ambient_c: float, r_jc: float, r_cs: float, r_sa: float):
    # Total thermal resistance (°C/Watt)
    r_total = r_jc + r_cs + r_sa
    delta_t = power_watts * r_total
    t_junction = ambient_c + delta_t
    
    max_safe_temp = 125.0 # Typical silicon max rating
    is_safe = t_junction < max_safe_temp
    margin = max_safe_temp - t_junction
    
    return {
        "junction_temp_c": round(t_junction, 1),
        "safe": is_safe,
        "margin_c": round(margin, 1)
    }`
    },
    quiz: [
      {
        id: 'thermo-1',
        question: 'In the thermal-electrical analogy, what is the thermal equivalent of electrical current (Amperes)?',
        options: ['Temperature (°C)', 'Heat Transfer Rate / Power (Watts)', 'Thermal Conductivity (W/m·K)', 'Specific Heat Capacity (J/kg·K)'],
        correctIndex: 1,
        explanation: 'Voltage is analogous to Temperature difference (potential), Current is analogous to Heat flow rate in Watts (flow of energy per second).'
      }
    ]
  },
  {
    id: 'structural-fea-mechanics',
    title: 'Structural Mechanics & Finite Element Analysis (FEA)',
    category: 'civil_materials',
    level: 'Intermediate',
    estimatedHours: 26,
    summary: 'Understanding stress, strain, elastic deformation, and numerical stiffness matrices for structural reliability.',
    description: 'Everything bends, stretches, and vibrates under load. Understanding how stress distributes through 3D geometry enables engineers to design lightweight, fail-safe products without over-engineering.',
    prerequisites: ['Statics (Equilibrium)', 'Matrix Algebra'],
    tags: ['Stress & Strain', 'FEA', 'Stiffness Matrix', 'Von Mises', 'Yield Strength'],
    branchMotivation: {
      mechanical: {
        importance: 'Native core: designing engine connecting rods, aircraft brackets, gear teeth, and chassis stiffness.',
        nativeAnalogy: 'Calculating whether a bracket will permanently deform under dynamic fatigue loads.',
        difficultyRating: 1
      },
      computer_science: {
        importance: 'Powers CAD physics engines, mesh generation algorithms, GPU parallel matrix solvers, and 3D computer graphics.',
        nativeAnalogy: 'Solving a sparse graph of 1,000,000 spring-node constraints using Cholesky decomposition or Conjugate Gradient.',
        difficultyRating: 2
      },
      electrical_electronics: {
        importance: 'Preventing solder joint cracking from thermal expansion mismatch (CTE) and designing drop-resistant phone enclosures.',
        nativeAnalogy: 'Like analyzing trace resistance, but replacing electrical conductivity with structural Young modulus.',
        difficultyRating: 2
      },
      civil_structural: {
        importance: 'Native core: designing high-rise frames, seismic retrofitting, retaining walls, and steel trusses.',
        nativeAnalogy: 'Ensuring dead and live load combinations satisfy structural safety codes with verified deflection limits.',
        difficultyRating: 1
      },
      chemical_materials: {
        importance: 'Selecting alloys and polymers based on Young modulus, fracture toughness, and creep under elevated temperatures.',
        nativeAnalogy: 'Relating atomic bonding energy (Lennard-Jones potential) to macroscopic stress-strain curves.',
        difficultyRating: 2
      },
      aerospace: {
        importance: 'Crucial for carbon fiber composite wing spar optimization, fuselage pressurization fatigue, and launch vehicle g-load survival.',
        nativeAnalogy: 'Shaving every possible gram of mass while maintaining a 1.5x structural factor of safety.',
        difficultyRating: 1
      },
      biomedical: {
        importance: 'Designing titanium hip replacement stems, bone plates, and arterial stents that expand without vascular rupture.',
        nativeAnalogy: 'Matching implant stiffness to natural cortical bone to prevent stress shielding and bone resorption.',
        difficultyRating: 2
      },
      mechatronics: {
        importance: 'Minimizing robotic link inertia while maintaining torsional stiffness for high-speed repeatability.',
        nativeAnalogy: 'Preventing robot arm deflection when carrying a 10kg payload at maximum arm extension.',
        difficultyRating: 1
      }
    },
    modules: [
      {
        title: 'Stress, Strain, & Hooke Law in 3D',
        duration: '5 hours',
        summary: 'Normal stress (σ), shear stress (τ), Young Modulus (E), and Poisson ratio (ν).',
        keyFormulas: ['\\sigma = E \\epsilon', '\\nu = -\\frac{\\epsilon_{transverse}}{\\epsilon_{axial}}']
      },
      {
        title: 'Failure Criteria: Von Mises & Tresca',
        duration: '6 hours',
        summary: 'How multi-axial stress states combine to cause plastic yielding; calculating Factor of Safety.',
        keyFormulas: ['\\sigma_{vm} = \\sqrt{\\frac{1}{2}\\left((\\sigma_1-\\sigma_2)^2 + (\\sigma_2-\\sigma_3)^2 + (\\sigma_3-\\sigma_1)^2\\right)}', 'FOS = \\frac{\\sigma_{yield}}{\\sigma_{vm}}']
      },
      {
        title: 'The Direct Stiffness Method: From Springs to Elements',
        duration: '8 hours',
        summary: 'Assembling local element stiffness matrices into global system matrix [K]{u} = {F}.',
        keyFormulas: ['[K] \\{u\\} = \\{F\\}']
      },
      {
        title: 'FEA Meshing Pitfalls & Singularities',
        duration: '7 hours',
        summary: 'Detecting artificial stress singularities at sharp internal re-entrant corners and running mesh convergence studies.',
        practicalExercise: 'Use our interactive beam deflection sandbox to compute maximum bending stress under 5000N center load.'
      }
    ],
    keyFormulas: [
      {
        name: 'Global Stiffness Equation',
        formula: '[K] \\{u\\} = \\{F\\}',
        variables: '[K]=global stiffness matrix, {u}=nodal displacement vector, {F}=applied force vector',
        physicalMeaning: 'Multi-dimensional generalization of Hooke Law F = k x across thousands of finite elements.'
      },
      {
        name: 'Euler-Bernoulli Beam Deflection (Cantilever Tip Load)',
        formula: '\\delta_{max} = \\frac{F L^3}{3 E I}',
        variables: 'F=tip force, L=beam length, E=Young modulus, I=area moment of inertia',
        physicalMeaning: 'Deflection scales cubically with length: doubling the length causes 8x more deflection!'
      }
    ],
    quiz: [
      {
        id: 'fea-1',
        question: 'If you double the length of a cantilever beam under a fixed tip load, by what factor does the tip deflection increase?',
        options: ['2x', '4x', '8x', '16x'],
        correctIndex: 2,
        explanation: 'According to beam deflection formula δ = (F * L³) / (3 * E * I), deflection scales with L³. 2³ = 8 times greater deflection!'
      }
    ]
  },
  {
    id: 'embedded-microcontrollers-firmware',
    title: 'Embedded Systems, Microcontrollers & Hardware Drivers',
    category: 'electrical_silicon',
    level: 'Foundational',
    estimatedHours: 24,
    summary: 'Interfacing software directly with physical silicon registers, GPIOs, interrupts, timers, and communication buses (I2C, SPI, UART).',
    description: 'Where code touches physical reality. Embedded firmware powers automotive engine controllers, smart implants, satellites, and smart gadgets. Learn bare-metal C/C++, memory-mapped registers, and deterministic timing.',
    prerequisites: ['Basic C or C++ Programming', 'Basic Circuit Fundamentals'],
    tags: ['Embedded Systems', 'Microcontrollers', 'C/C++', 'I2C/SPI', 'Interrupts'],
    branchMotivation: {
      mechanical: {
        importance: 'Bridges physical mechanisms to smart electronic control: driving stepper motors, reading optical encoders, and reading strain gauges.',
        nativeAnalogy: 'The digital nervous system that commands hydraulic valves and electric actuators.',
        difficultyRating: 2
      },
      computer_science: {
        importance: 'Removes the OS abstraction layer: writing real-time code without an operating system, dynamic allocations, or garbage collection.',
        nativeAnalogy: 'Writing directly to raw memory addresses where each bit physically toggles a transistor pin.',
        difficultyRating: 2
      },
      electrical_electronics: {
        importance: 'Native core: reading ADCs, generating PWM for inverters, managing microcontroller low-power sleep modes.',
        nativeAnalogy: 'Your standard playground: bringing custom PCBs to life with firmware.',
        difficultyRating: 1
      },
      civil_structural: {
        importance: 'Used in remote structural health monitoring systems (vibration nodes, solar-powered tilt sensors on bridges).',
        nativeAnalogy: 'A self-contained digital surveyor that sleeps for 23 hours and wakes up to transmit strain data over LoRa.',
        difficultyRating: 3
      },
      chemical_materials: {
        importance: 'Automating pilot plants: reading thermocouple sensors, controlling peristaltic dosing pumps, and logging pH.',
        nativeAnalogy: 'Like an automated lab assistant adjusting heating mantles based on real-time temperature probes.',
        difficultyRating: 2
      },
      aerospace: {
        importance: 'Powering flight computers, radiation-hardened satellite payloads, and CAN aerospace avionics.',
        nativeAnalogy: 'Zero-failure flight firmware executing deterministic 1000Hz loops without thread blocking.',
        difficultyRating: 2
      },
      biomedical: {
        importance: 'Crucial for battery-powered pacemakers, glucose meters, pulse oximeters, and neuro-prosthetics.',
        nativeAnalogy: 'Ultra-low-power microcontrollers running on micro-amps inside an implantable device.',
        difficultyRating: 2
      },
      mechatronics: {
        importance: 'The brain of every robot: running kinematics loops, decoding quadrature encoders, and commanding ESCs.',
        nativeAnalogy: 'The real-time spinal cord of your robot.',
        difficultyRating: 1
      }
    },
    modules: [
      {
        title: 'Memory-Mapped I/O & Bitwise Register Manipulation',
        duration: '6 hours',
        summary: 'How CPU registers control physical voltage pins; bit masks, bitwise AND/OR/XOR, and volatile keywords in C.',
        keyFormulas: ['PORTB |= (1 << PIN_LED)', 'PINB & (1 << PIN_BUTTON)']
      },
      {
        title: 'Interrupt Service Routines (ISRs) vs Polling',
        duration: '6 hours',
        summary: 'Event-driven hardware execution: handling emergency stop switches and encoder ticks with microsecond latency.',
        keyFormulas: ['Latency < 12 clock cycles']
      },
      {
        title: 'Communication Protocols: UART, I2C, SPI & CAN Bus',
        duration: '7 hours',
        summary: 'Synchronous vs asynchronous, master-slave addressing, differential signaling for automotive noise immunity.',
        keyFormulas: ['SPI: SCLK, MOSI, MISO, CS (up to 50MHz)', 'I2C: SDA, SCL (pull-up resistors)']
      },
      {
        title: 'PWM & Timer Peripherals for Motor Control',
        duration: '5 hours',
        summary: 'Generating hardware PWM without CPU overhead to smoothly control motor speed and LED brightness.',
        practicalExercise: 'Write a non-blocking debounce algorithm for an industrial push-button in embedded C.'
      }
    ],
    keyFormulas: [
      {
        name: 'Timer PWM Frequency',
        formula: 'f_{PWM} = \\frac{f_{CPU}}{\\text{Prescaler} \\times (1 + \\text{TOP})}',
        variables: 'fCPU=clock speed (e.g. 16MHz), Prescaler=clock divider, TOP=timer resolution count',
        physicalMeaning: 'Calculates the exact acoustic frequency and duty cycle generated by microcontroller timers.'
      }
    ],
    codeSnippet: {
      language: 'cpp',
      title: 'Bare-Metal Timer Interrupt & Register Toggle (AVR/ARM style)',
      code: `#include <stdint.h>

#define GPIO_BASE   0x40020000
#define GPIO_MODER  (*(volatile uint32_t*)(GPIO_BASE + 0x00))
#define GPIO_ODR    (*(volatile uint32_t*)(GPIO_BASE + 0x14))

void setup_pin() {
    // Configure Pin 5 as output (0b01)
    GPIO_MODER &= ~(0x3 << (5 * 2));
    GPIO_MODER |= (0x1 << (5 * 2));
}

void toggle_pin() {
    // Atomic bitwise XOR toggle
    GPIO_ODR ^= (1 << 5);
}`
    },
    quiz: [
      {
        id: 'emb-1',
        question: 'Why is the "volatile" keyword mandatory when declaring pointers to memory-mapped hardware registers in C?',
        options: ['It places the variable in high-speed cache memory', 'It prevents the compiler from optimizing away repeated reads/writes to that memory address', 'It converts 32-bit floats into integer registers', 'It enables multi-threading mutex locks'],
        correctIndex: 1,
        explanation: 'The compiler might assume a variable in memory does not change unless written to by your code. Hardware registers change externally (e.g. ADC readings or button presses), so volatile tells the compiler to re-read the physical address every time.'
      }
    ]
  },
  {
    id: 'electric-vehicles-battery-bms',
    title: 'Electric Vehicles & Battery Management Systems (BMS)',
    category: 'cross_frontiers',
    level: 'Advanced',
    estimatedHours: 26,
    summary: 'The interdisciplinary nexus of electrochemistry, thermal cooling, high-voltage power electronics, and embedded safety.',
    description: 'Modern EV powertrains bring together chemical engineering (Li-ion cells), mechanical engineering (pack crash structures and cooling plates), electrical engineering (inverters and high-voltage DC-DC converters), and software (cell balancing algorithms and State of Charge estimation).',
    prerequisites: ['Circuit Fundamentals', 'Heat Transfer Basics'],
    tags: ['Electric Vehicles', 'Lithium-Ion', 'BMS', 'Inverters', 'Thermal Runaway'],
    branchMotivation: {
      mechanical: {
        importance: 'Designing battery enclosure crashworthiness, thermal interface cooling jackets, and high-torque EV gearboxes.',
        nativeAnalogy: 'Balancing structural crash protection with minimum pack curb weight.',
        difficultyRating: 2
      },
      computer_science: {
        importance: 'State of Charge (SoC) and State of Health (SoH) algorithms (Extended Kalman Filters), CAN bus telemetry, and over-the-air updates.',
        nativeAnalogy: 'Estimating hidden system state from noisy voltage and current time-series data.',
        difficultyRating: 2
      },
      electrical_electronics: {
        importance: 'Designing 3-phase SiC/GaN motor inverters, regenerative braking control, active cell balancing circuits, and isolated CAN transceivers.',
        nativeAnalogy: 'Managing high-efficiency 800V DC switching into AC sine waves with minimal switching losses.',
        difficultyRating: 1
      },
      civil_structural: {
        importance: 'Designing EV charging infrastructure, grid load management, and heavy vehicle axle load structural impact on roads.',
        nativeAnalogy: 'Managing massive municipal electrical load demands without tripping regional substations.',
        difficultyRating: 3
      },
      chemical_materials: {
        importance: 'Cathode chemistry (NMC vs LFP vs Solid-State), electrolyte degradation, SEI layer growth, and dendrite prevention.',
        nativeAnalogy: 'Controlling phase transitions and redox reactions to prevent lithium plating during fast charging.',
        difficultyRating: 1
      },
      aerospace: {
        importance: 'Electric aircraft (eVTOL) propulsion, maximizing gravimetric energy density (Wh/kg), and ultra-redundant battery fail-safes.',
        nativeAnalogy: 'Every kilogram of battery counts directly against flight payload and range.',
        difficultyRating: 2
      },
      biomedical: {
        importance: 'Ultra-safe bio-compatible battery chemistries for implantable cardiac devices and neural stimulators.',
        nativeAnalogy: 'Designing cells that cannot leak or overheat next to delicate human tissue.',
        difficultyRating: 3
      },
      mechatronics: {
        importance: 'Integrating motor drive, field-oriented control (FOC), brake-by-wire, and throttle pedals in one unified loop.',
        nativeAnalogy: 'Real-time torque vectoring between multiple independent hub motors.',
        difficultyRating: 1
      }
    },
    modules: [
      {
        title: 'Lithium-Ion Electrochemistry & Equivalent Circuit Models (ECM)',
        duration: '6 hours',
        summary: 'Open Circuit Voltage (OCV), internal resistance (R0), and RC pairs modeling charge transfer and diffusion polarization.',
        keyFormulas: ['V_{terminal} = V_{OCV}(SoC) - I R_0 - V_{RC}']
      },
      {
        title: 'State of Charge (SoC) Estimation: Coulomb Counting vs Kalman Filters',
        duration: '7 hours',
        summary: 'Why simple integration drifts over time and how Kalman Filters fuse voltage and current measurements.',
        keyFormulas: ['SoC(t) = SoC(0) - \\frac{1}{Q_n}\\int_0^t \\eta I(\\tau)d\\tau']
      },
      {
        title: 'Cell Balancing (Passive vs Active) & Safety Limits',
        duration: '6 hours',
        summary: 'Why cells in series drift apart, bleed resistors vs inductive charge transfer, and preventing over-voltage and over-discharge.',
        keyFormulas: ['P_{bleed} = \\frac{V_{cell}^2}{R_{bleed}}']
      },
      {
        title: 'Thermal Management & Thermal Runaway Mitigation',
        duration: '7 hours',
        summary: 'Exothermic decomposition chain reactions, coolant jacket design, and fire propagation barriers.',
        practicalExercise: 'Simulate passive cell balancing in Python for a 16-cell series pack with 50mV voltage mismatch.'
      }
    ],
    keyFormulas: [
      {
        name: 'The Peukert Capacity Law',
        formula: 'C = I^k t',
        variables: 'C=capacity, I=discharge current, k=Peukert constant (typically 1.1 to 1.3), t=discharge time',
        physicalMeaning: 'High discharge rates temporarily reduce effective battery capacity due to internal ion diffusion limits.'
      }
    ],
    quiz: [
      {
        id: 'ev-1',
        question: 'Why does pure Coulomb Counting fail as a long-term standalone method for battery State-of-Charge (SoC) estimation?',
        options: ['It uses too much microcontroller CPU memory', 'Current sensor bias and measurement noise accumulate over time causing indefinite drift', 'It damages the lithium-ion cathode chemistry', 'It only works during charging, not discharging'],
        correctIndex: 1,
        explanation: 'Integrating current over time (∫ I dt) means even tiny offset errors (like a 5mA sensor bias) integrate into massive percentage errors over days or weeks without periodic OCV recalibration.'
      }
    ]
  }
];

export const CONCEPT_BRIDGES: ConceptBridge[] = [
  {
    id: 'neural-networks-for-all',
    targetConcept: 'Artificial Neural Networks & Gradient Descent',
    targetDomain: 'Computer Science & AI',
    summary: 'Understanding how weights, biases, activations, and backpropagation function using physical engineering concepts.',
    bridges: {
      mechanical: {
        coreIntuition: 'A neural network is analogous to a mechanical truss system where node displacements adjust member stiffnesses to minimize total strain energy under applied loads.',
        familiarAnalogy: 'Think of gradient descent as a marble rolling down a frictionless, viscous-damped gravitational potential surface. The height of the hill is the Loss; the coordinates are the Weights.',
        mappingTable: [
          { nativeTerm: 'Member Stiffness (k)', targetTerm: 'Network Weight (w)', sharedPhysicalRole: 'Determines how much influence an input has on the output' },
          { nativeTerm: 'Pre-strain / Initial Load (F0)', targetTerm: 'Neuron Bias (b)', sharedPhysicalRole: 'Baseline offset independent of external input' },
          { nativeTerm: 'Yield Point / Elastic Limit', targetTerm: 'Activation Function (ReLU)', sharedPhysicalRole: 'Non-linear threshold below which response is suppressed' },
          { nativeTerm: 'Total Potential Strain Energy', targetTerm: 'Loss Function (MSE)', sharedPhysicalRole: 'The scalar quantity the system seeks to minimize' },
          { nativeTerm: 'Virtual Work / Relaxation Method', targetTerm: 'Backpropagation', sharedPhysicalRole: 'Distributing global error backwards to individual nodes' }
        ],
        mathematicalEquivalence: {
          nativeEquation: '[K] \\{u\\} = \\{F\\} \\quad \\text{minimize} \\; \\Pi = \\frac{1}{2} u^T K u - u^T F',
          targetEquation: '\\hat{y} = \\sigma(W x + b) \\quad \\text{minimize} \\; \\mathcal{L} = \\frac{1}{2} (y - \\hat{y})^2',
          underlyingUniversalMath: 'Both find the stationary point of a quadratic potential by taking gradients with respect to coordinates.'
        },
        commonTrap: 'Assuming weights are fixed physical structures. In ML, weights are dynamic variables updated continuously by learning rate.',
        quickExperiment: 'Open Python and run a 10-line script adjusting a single weight w to fit y = 2x, watching error drop from 100 to 0.001.'
      },
      electrical_electronics: {
        coreIntuition: 'A neural network is a programmable resistive crossbar array where each weight is the conductance G of a memristor, converting input voltages into summation currents via Kirchhoff Current Law.',
        familiarAnalogy: 'Inputs are voltages, weights are conductances (1/R). The summation at a neuron node is literally Kirchhoff Current Law: I_total = Σ (V_i * G_i). The activation function is a diode or op-amp saturator!',
        mappingTable: [
          { nativeTerm: 'Conductance (G = 1/R)', targetTerm: 'Weight (w)', sharedPhysicalRole: 'Scales input signal into output contribution' },
          { nativeTerm: 'DC Bias Offset Voltage', targetTerm: 'Neuron Bias (b)', sharedPhysicalRole: 'Static voltage shift at the summing junction' },
          { nativeTerm: 'Diode / Op-Amp Saturation', targetTerm: 'Activation Function (Sigmoid / ReLU)', sharedPhysicalRole: 'Bounds signals within realistic non-linear supply rails' },
          { nativeTerm: 'Kirchhoff Current Law (Σ I = 0)', targetTerm: 'Dot Product (w · x)', sharedPhysicalRole: 'Summation of parallel inputs at a single node' },
          { nativeTerm: 'Negative Feedback Loop', targetTerm: 'Gradient Descent Step', sharedPhysicalRole: 'Adjusts parameters to drive error voltage to zero' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'I_{out} = \\sum_{i=1}^n V_i G_i \\quad \\text{(Ohm + KCL)}',
          targetEquation: 'z = \\sum_{i=1}^n x_i w_i + b = \\mathbf{w}^T \\mathbf{x} + b',
          underlyingUniversalMath: 'Linear inner product followed by non-linear saturation boundary.'
        },
        commonTrap: 'Thinking backpropagation requires physical reverse current flow. In digital AI, backprop is calculated in a separate algorithmic pass.',
        quickExperiment: 'Model a single neuron in LTSpice using 3 input voltage sources, 3 resistors into a virtual ground op-amp, and back-to-back zener diodes for activation.'
      },
      civil_structural: {
        coreIntuition: 'A neural network is like designing an indeterminate structural bridge. You test it with 10,000 different vehicle load combinations and iteratively adjust the thickness of every steel beam until deflections stay within safety limits everywhere.',
        familiarAnalogy: 'Overfitting in ML is exactly like designing a bridge tailored specifically for ONE specific oversized truck so precisely that when a normal sedan drives across in a crosswind, the bridge fails!',
        mappingTable: [
          { nativeTerm: 'Beam Section Modulus (Z)', targetTerm: 'Weight (w)', sharedPhysicalRole: 'Capacity of a specific component to carry signal/load' },
          { nativeTerm: 'Dead Load of Structure', targetTerm: 'Bias (b)', sharedPhysicalRole: 'Permanent baseline load regardless of traffic' },
          { nativeTerm: 'Crossy-Bred Truck Load Test', targetTerm: 'Training Dataset', sharedPhysicalRole: 'Stochastic sample used to tune the design' },
          { nativeTerm: 'Maximum Allowable Deflection', targetTerm: 'Loss Metric / Tolerance', sharedPhysicalRole: 'Target criterion evaluated across all load cases' },
          { nativeTerm: 'Moment Distribution (Hardy Cross)', targetTerm: 'Backpropagation', sharedPhysicalRole: 'Iteratively balancing nodal imbalances through adjacent members' }
        ],
        mathematicalEquivalence: {
          nativeEquation: '\\text{Hardy Cross: } DF_i = \\frac{K_i}{\\sum K} \\implies \\text{relax unbalanced moment}',
          targetEquation: '\\text{Gradient Descent: } \\Delta w = -\\eta \\frac{\\partial \\mathcal{L}}{\\partial w}',
          underlyingUniversalMath: 'Iterative relaxation algorithms for solving large coupled system equilibria.'
        },
        commonTrap: 'Assuming "training" requires days of concrete curing; in software, model parameters update in milliseconds across GPU cores.',
        quickExperiment: 'Look at a slump test dataset and train a single scikit-learn regressor to predict 28-day concrete strength from cement-water ratio.'
      },
      chemical_materials: {
        coreIntuition: 'A neural network is a multi-dimensional chemical equilibrium reactor where weights represent equilibrium constants and gradient descent is the drive toward minimum Gibbs free energy.',
        familiarAnalogy: 'Gradient descent finds the lowest energy state, identical to a chemical reaction seeking thermodynamic equilibrium where ΔG = 0.',
        mappingTable: [
          { nativeTerm: 'Rate Constant / Affinity (k)', targetTerm: 'Weight (w)', sharedPhysicalRole: 'Magnitude of interaction between reagents/nodes' },
          { nativeTerm: 'Gibbs Free Energy (G)', targetTerm: 'Loss Function (L)', sharedPhysicalRole: 'Potential that naturally seeks global minimum' },
          { nativeTerm: 'Activation Energy Barrier (Ea)', targetTerm: 'Loss Local Minima', sharedPhysicalRole: 'Obstacle preventing system from reaching global minimum' },
          { nativeTerm: 'Temperature / Thermal Jiggling', targetTerm: 'Learning Rate / Stochasticity', sharedPhysicalRole: 'Supplies kinetic energy to escape shallow traps' },
          { nativeTerm: 'Le Chatelier Principle', targetTerm: 'Negative Gradient Feedback', sharedPhysicalRole: 'System opposes perturbations to restore equilibrium' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'dG = V dP - S dT + \\sum \\mu_i dn_i \\quad (\\text{at equilibrium, } dG = 0)',
          targetEquation: '\\nabla \\mathcal{L}(\\mathbf{w}) = 0 \\quad (\\text{optimal weights at loss minimum})',
          underlyingUniversalMath: 'Convex optimization along multidimensional gradient surfaces.'
        },
        commonTrap: 'Thinking that weights must conserve mass. Network weights are dimensionless scaling coefficients, not physical matter.',
        quickExperiment: 'Compare simulated annealing for crystal nucleation with Adam optimizer decay rates.'
      },
      aerospace: {
        coreIntuition: 'A neural network is like an automated aerodynamic surface optimizer adjusting flap angles across 1,000 flight points to minimize total aircraft drag.',
        familiarAnalogy: 'Gradient descent is like an aircraft autopilot trimming elevator tab angles to minimize glide-slope error in turbulent crosswinds.',
        mappingTable: [
          { nativeTerm: 'Lift / Drag Coefficient (CL, CD)', targetTerm: 'Weight (w)', sharedPhysicalRole: 'Dimensionless scaling factor relating input flow to forces' },
          { nativeTerm: 'Trim Tab Offset', targetTerm: 'Bias (b)', sharedPhysicalRole: 'Zero-input baseline correction force' },
          { nativeTerm: 'Stall Angle of Attack', targetTerm: 'Activation Saturation', sharedPhysicalRole: 'Non-linear regime where output flatlines or drops sharply' },
          { nativeTerm: 'Total Drag Force', targetTerm: 'Loss Function', sharedPhysicalRole: 'Cost quantity that must be minimized' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'D = \\frac{1}{2} \\rho v^2 S C_D \\quad \\text{minimize drag polar}',
          targetEquation: '\\mathcal{L} = \\frac{1}{2N}\\sum (y - \\hat{y})^2 \\quad \\text{minimize prediction error}',
          underlyingUniversalMath: 'Multi-variable optimization under constraints.'
        },
        commonTrap: 'Expecting analytical closed-form aerodynamic solutions. Neural networks are purely empirical numerical models.',
        quickExperiment: 'Train a small neural net to replace a lookup table of NACA 0012 airfoil lift curves.'
      },
      biomedical: {
        coreIntuition: 'Artificial neural networks were literally inspired by biological cortical neurons, dendritic summation, synaptic weights, and action potential firing thresholds.',
        familiarAnalogy: 'Inputs are synaptic neurotransmitter releases from dendrites; weights are synaptic strengths (plasticity); the activation function is the all-or-nothing axon hillock action potential!',
        mappingTable: [
          { nativeTerm: 'Synaptic Conductance / Strength', targetTerm: 'Weight (w)', sharedPhysicalRole: 'Degree of excitation or inhibition passed to the soma' },
          { nativeTerm: 'Resting Membrane Potential (-70mV)', targetTerm: 'Bias (b)', sharedPhysicalRole: 'Baseline electrochemical polarity before stimulus' },
          { nativeTerm: 'Action Potential Threshold (-55mV)', targetTerm: 'Activation Function (ReLU / Heaviside)', sharedPhysicalRole: 'Threshold that fires an output pulse only when reached' },
          { nativeTerm: 'Long-Term Potentiation (Hebbian)', targetTerm: 'Weight Update / Training', sharedPhysicalRole: 'Neurons that fire together, wire together' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'V_m(t) = V_{rest} + \\sum_{i} g_i (E_i - V_m) \\quad \\text{(Hodgkin-Huxley soma summation)}',
          targetEquation: 'y = f\\left(\\sum_{i=1}^n w_i x_i + b\\right)',
          underlyingUniversalMath: 'Summation of weighted stimuli followed by threshold-triggered non-linear transmission.'
        },
        commonTrap: 'Confusing biological spike timing (spiking neural networks) with floating-point rate-based artificial neural networks.',
        quickExperiment: 'Map how an ECG QRS-complex detection algorithm can be replaced by a 1D Convolutional Neural Network.'
      },
      mechatronics: {
        coreIntuition: 'A neural network is an ultra-dense look-up table and interpolator that maps raw sensor signals (encoders, cameras, IMUs) directly to motor actuator torques without manual inverse kinematics derivations.',
        familiarAnalogy: 'Think of training as auto-tuning a multi-axis PID robot arm across 50,000 pick-and-place trajectories until tracking error is sub-millimeter.',
        mappingTable: [
          { nativeTerm: 'Gain Matrix [K]', targetTerm: 'Weight Matrix [W]', sharedPhysicalRole: 'Maps state vector to control action' },
          { nativeTerm: 'Gravity Compensation Vector G(q)', targetTerm: 'Bias Vector [b]', sharedPhysicalRole: 'Counteracts static baseline physical offsets' },
          { nativeTerm: 'Actuator Saturation / Limit Switch', targetTerm: 'Activation Function (tanh / clamp)', sharedPhysicalRole: 'Physically limits maximum output to prevent damage' },
          { nativeTerm: 'Trajectory Tracking Error', targetTerm: 'Loss Function', sharedPhysicalRole: 'Discrepancy between planned path and actual position' }
        ],
        mathematicalEquivalence: {
          nativeEquation: '\\tau = M(q)\\ddot{q} + C(q,\\dot{q})\\dot{q} + G(q)',
          targetEquation: '\\mathbf{u} = \\text{Net}(\\mathbf{x}; \\mathbf{W})',
          underlyingUniversalMath: 'High-dimensional non-linear mapping.'
        },
        commonTrap: 'Expecting millisecond deterministic timing guarantees from giant cloud LLMs on high-speed motor control loops without running on local Edge NPUs.',
        quickExperiment: 'Deploy a quantized TFLite neural net onto an ESP32 or STM32 microcontroller to classify gesture movements from an accelerometer in real time.'
      },
      computer_science: {
        coreIntuition: 'A directed acyclic computational graph composed of matrix multiplication tensor operators, element-wise non-linear activations, and reverse-mode automatic differentiation.',
        familiarAnalogy: 'Think of PyTorch as a domain-specific compiler that constructs an execution AST and emits backward derivative functions at runtime.',
        mappingTable: [
          { nativeTerm: 'Function Parameter', targetTerm: 'Weight', sharedPhysicalRole: 'Tunable variable inside the model' },
          { nativeTerm: 'Constant Offset', targetTerm: 'Bias', sharedPhysicalRole: 'Independent scalar shift' },
          { nativeTerm: 'Map / Transformation Lambda', targetTerm: 'Activation Function', sharedPhysicalRole: 'Element-wise transformation' },
          { nativeTerm: 'Objective / Unit Test Assertion Gap', targetTerm: 'Loss Function', sharedPhysicalRole: 'Score evaluating correctness' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'f(x) = W_2 \\cdot \\text{ReLU}(W_1 \\cdot x + b_1) + b_2',
          targetEquation: 'f(x) = W_2 \\cdot \\text{ReLU}(W_1 \\cdot x + b_1) + b_2',
          underlyingUniversalMath: 'Chained tensor contractions.'
        },
        commonTrap: 'Neglecting numerical underflow/overflow issues with floating point precision in large gradient accumulations.',
        quickExperiment: 'Implement reverse-mode autodiff with a simple Value scalar class in 50 lines of Python.'
      }
    }
  },
  {
    id: 'fourier-transform-bridge',
    targetConcept: 'Fourier Transform & Frequency Domain Analysis',
    targetDomain: 'Electrical & Signal Processing',
    summary: 'How breaking signals into constituent sine waves applies to vibrations, fluids, structural resonance, and optical spectra.',
    bridges: {
      mechanical: {
        coreIntuition: 'An FFT is an automated gearbox stethoscope. Instead of seeing a messy time-domain vibration waveform on an accelerometer, the FFT reveals individual sharp spikes that match the exact RPM of each rotating bearing, shaft, and gear tooth.',
        familiarAnalogy: 'If you strike a tuning fork, it sings at 440 Hz. If you strike a car chassis, it rings with 10 different notes simultaneously. The Fourier transform tells you the volume of each individual musical note in that chord.',
        mappingTable: [
          { nativeTerm: 'Shaft Rotation Speed (RPM)', targetTerm: 'Fundamental Frequency (Hz)', sharedPhysicalRole: 'Primary repeating cyclic period' },
          { nativeTerm: 'Gear Mesh Vibration Harmonics', targetTerm: 'Frequency Harmonics (2f, 3f)', sharedPhysicalRole: 'Integer multiples of base frequency caused by tooth impacts' },
          { nativeTerm: 'Resonance / Natural Frequency (ωn)', targetTerm: 'Bode Peak / Resonant Pole', sharedPhysicalRole: 'Frequency where physical system amplifies vibrations' },
          { nativeTerm: 'Damping (c)', targetTerm: 'Spectral Bandwidth / Q-Factor', sharedPhysicalRole: 'Spreads narrow sharp spikes into wide rounded hills' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'm \\ddot{x} + c \\dot{x} + k x = F_0 \\cos(\\omega t) \\implies X(\\omega) = \\frac{F_0}{\\sqrt{(k-m\\omega^2)^2 + (c\\omega)^2}}',
          targetEquation: 'X(\\omega) = \\int_{-\\infty}^{\\infty} x(t) e^{-i \\omega t} dt',
          underlyingUniversalMath: 'Harmonic oscillator response in the complex frequency domain.'
        },
        commonTrap: 'Forgetting that sampling too slowly causes high-frequency engine gear vibrations to appear as fake slow vibrations (aliasing).',
        quickExperiment: 'Record a car engine idling on your phone, run an FFT script, and compute the exact engine idle RPM from the fundamental frequency peak.'
      },
      civil_structural: {
        coreIntuition: 'The Fourier Transform is how civil engineers protect suspension bridges and skyscrapers from wind vortex shedding and earthquake devastation.',
        familiarAnalogy: 'Remember the Tacoma Narrows bridge disaster? Wind vortices shed at the exact natural frequency of the bridge deck, exciting resonance. The Fourier transform of earthquake ground motion shows which building heights will resonate most dangerously.',
        mappingTable: [
          { nativeTerm: 'Earthquake Ground Acceleration Record', targetTerm: 'Time-Domain Signal x(t)', sharedPhysicalRole: 'Raw temporal measurement of physical shaking' },
          { nativeTerm: 'Response Spectrum (Sa vs Period T)', targetTerm: 'Fourier Amplitude Spectrum |X(f)|', sharedPhysicalRole: 'Distribution of vibrational energy across frequencies' },
          { nativeTerm: 'Fundamental Building Period (T1 = 0.1 * stories)', targetTerm: 'Resonant Frequency (f0 = 1/T1)', sharedPhysicalRole: 'Frequency where structural inertia and elasticity resonate' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'T_n = 2\\pi \\sqrt{\\frac{m}{k}} \\implies f_n = \\frac{1}{T_n}',
          targetEquation: 'F(\\omega) = \\mathcal{F}\\{f(t)\\}',
          underlyingUniversalMath: 'Eigenvalue problem of elastic continua.'
        },
        commonTrap: 'Assuming earthquake excitation is a pure single-frequency sine wave; real seismic records contain a chaotic spectrum of frequencies.',
        quickExperiment: 'Take accelerometer data from a phone placed on a pedestrian footbridge, run an FFT, and identify the bridge natural bounce frequency.'
      },
      computer_science: {
        coreIntuition: 'The FFT is a lossless transformation that changes the basis of an array from time/spatial indices to orthogonal sinusoidal basis vectors, turning O(N²) convolutions into O(N) element-wise multiplications.',
        familiarAnalogy: 'Think of an image as a matrix of pixels. Low frequencies represent the smooth sky and walls; high frequencies represent sharp edges and noise. JPEG compression simply discards the unnoticeable high-frequency coefficients!',
        mappingTable: [
          { nativeTerm: 'Pixel Grid / Time Series Array', targetTerm: 'Spatial / Time Domain Signal', sharedPhysicalRole: 'Data indexed by physical space or time' },
          { nativeTerm: 'Discrete Cosine / Fourier Coefficients', targetTerm: 'Frequency Bins (k)', sharedPhysicalRole: 'Magnitude of basis patterns in the data' },
          { nativeTerm: 'Convolution Operator (Filter Kernel)', targetTerm: 'Frequency Multiplication', sharedPhysicalRole: 'Applying a blur or edge filter to an image' },
          { nativeTerm: 'Lossy Data Compression (JPEG/MP3)', targetTerm: 'High-Frequency Truncation', sharedPhysicalRole: 'Zeroing out negligible coefficients to save bandwidth' }
        ],
        mathematicalEquivalence: {
          nativeEquation: '(f * g)[n] = \\sum_{m} f[m] g[n-m] \\iff \\mathcal{F}\\{f * g\\} = F(\\omega) \\cdot G(\\omega)',
          targetEquation: 'O(N^2) \\; \\text{spatial convolution} \\to O(N \\log N) \\; \\text{via FFT}',
          underlyingUniversalMath: 'Convolution theorem across dual vector spaces.'
        },
        commonTrap: 'Thinking FFT is an approximation. It is an exact, mathematically reversible bijection.',
        quickExperiment: 'Multiply two 10,000-digit numbers in Python using FFT polynomial multiplication and verify it beats standard grade-school multiplication.'
      },
      chemical_materials: {
        coreIntuition: 'An FFT translates interferogram light patterns into infrared absorption spectra (FTIR) to reveal the exact molecular bonds (C=O, O-H, C-H) present in a mystery chemical.',
        familiarAnalogy: 'Different chemical bonds act like tiny mechanical springs with distinct resonance frequencies. Infrared light excites these springs, and Fourier transformation reveals which springs absorbed energy.',
        mappingTable: [
          { nativeTerm: 'Interferogram (Optical path difference)', targetTerm: 'Time Domain Signal', sharedPhysicalRole: 'Raw temporal/spatial interference signal' },
          { nativeTerm: 'Absorption Spectrum (Wavenumber cm⁻¹)', targetTerm: 'Frequency Domain Spectrum', sharedPhysicalRole: 'Identifies resonant frequencies of chemical bonds' },
          { nativeTerm: 'Bond Force Constant (Spring stiffness k)', targetTerm: 'Harmonic Frequency ω = √(k/μ)', sharedPhysicalRole: 'Stiffer triple bonds resonate at higher frequencies than single bonds' }
        ],
        mathematicalEquivalence: {
          nativeEquation: '\\bar{\\nu} = \\frac{1}{2\\pi c} \\sqrt{\\frac{k}{\\mu}} \\quad (\\mu = \\text{reduced mass})',
          targetEquation: 'S(\\bar{\\nu}) = \\int_{-\\infty}^{\\infty} I(x) \\cos(2\\pi \\bar{\\nu} x) dx',
          underlyingUniversalMath: 'Fourier cosine transform of optical interference patterns.'
        },
        commonTrap: 'Confusing spatial wavenumber (cm⁻¹) with temporal frequency (Hz). Both describe spatial/temporal periodicity.',
        quickExperiment: 'Download an open-access FTIR spectrum and locate the characteristic sharp carbonyl stretch around 1700 cm⁻¹.'
      },
      aerospace: {
        coreIntuition: 'The Fourier Transform prevents aircraft wings from breaking off in mid-air due to aeroelastic flutter.',
        familiarAnalogy: 'As an aircraft speeds up, unsteady aerodynamic vortex shedding couples with the wing natural bending and torsional vibration modes. FFT spectral tracking warns engineers before explosive flutter occurs.',
        mappingTable: [
          { nativeTerm: 'Wing Tip Accelerometer Log', targetTerm: 'Time Domain Signal', sharedPhysicalRole: 'Sensor stream measuring structural oscillation' },
          { nativeTerm: 'Flutter Resonant Frequency', targetTerm: 'Peak Dominant Pole', sharedPhysicalRole: 'Frequency where aerodynamic work pumps energy into structure' },
          { nativeTerm: 'Vortex Shedding Frequency (Strouhal)', targetTerm: 'Forcing Frequency f = St * v / L', sharedPhysicalRole: 'Fluid periodic excitation frequency' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'St = \\frac{f L}{v} \\quad \\text{(Strouhal vortex shedding)}',
          targetEquation: 'X(f) = \\int x(t) e^{-i 2\\pi f t} dt',
          underlyingUniversalMath: 'Fluid-structure resonance coupling.'
        },
        commonTrap: 'Assuming flutter frequency stays constant with speed; it shifts dynamically as dynamic pressure changes.',
        quickExperiment: 'Simulate a 2-DOF pitch-plunge wing section and plot the FFT of the pitch angle as speed increases.'
      },
      biomedical: {
        coreIntuition: 'The Fourier Transform decomposes complex electrical rhythms of the human heart (ECG) and brain (EEG) into clinical diagnostic bands.',
        familiarAnalogy: 'When you sleep, your brain waves slow down into deep Delta waves (0.5–4 Hz). When you are solving an engineering problem, fast Beta and Gamma waves dominate. FFT splits the raw scalp voltage into these exact cognitive bands.',
        mappingTable: [
          { nativeTerm: 'Raw Scalp EEG Voltage Record', targetTerm: 'Time Domain Signal', sharedPhysicalRole: 'Superposition of millions of cortical action potentials' },
          { nativeTerm: 'Brainwave Bands (Delta, Theta, Alpha, Beta)', targetTerm: 'Frequency Sub-bands (0.5 - 40 Hz)', sharedPhysicalRole: 'Distinct physiological neuro-states' },
          { nativeTerm: 'Heart Rate Variability (LF/HF ratio)', targetTerm: 'Spectral Power Ratio', sharedPhysicalRole: 'Balance between sympathetic and parasympathetic nervous systems' }
        ],
        mathematicalEquivalence: {
          nativeEquation: '\\text{Power Spectral Density (PSD)} = \\frac{1}{T} |X(f)|^2',
          targetEquation: 'P(f) = \\lim_{T \\to \\infty} \\frac{1}{T} \\left| \\int_0^T x(t) e^{-i 2\\pi f t} dt \\right|^2',
          underlyingUniversalMath: 'Periodogram estimation of stochastic physiological processes.'
        },
        commonTrap: 'Ignoring baseline drift caused by patient respiration (which shows up as a massive 0.2 Hz artifact in FFT).',
        quickExperiment: 'Take a sample 10-second ECG recording, apply a 0.5Hz high-pass filter, and compute the heart rate spectrum in Python.'
      },
      mechatronics: {
        coreIntuition: 'FFT is how you locate and notch out mechanical resonance in robot joints and CNC spindles so you can crank up your PID gains without violent humming.',
        familiarAnalogy: 'If you push your robot arm PID gains too high, the whole arm hums violently at 180 Hz. An FFT pinpoints that exact 180 Hz peak, allowing you to insert a narrow digital Notch Filter to cancel it out!',
        mappingTable: [
          { nativeTerm: 'Encoder Velocity Error Signal', targetTerm: 'Time Domain Signal', sharedPhysicalRole: 'Closed-loop tracking error' },
          { nativeTerm: 'Drive Train Mechanical Resonance', targetTerm: 'High-Q Resonant Frequency Spike', sharedPhysicalRole: 'Flexibility in harmonic drive or belt tension' },
          { nativeTerm: 'Digital Notch Filter', targetTerm: 'Band-Stop Filter centered at f0', sharedPhysicalRole: 'Zeroes out gain at the dangerous resonant frequency' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'H_{notch}(s) = \\frac{s^2 + \\omega_0^2}{s^2 + 2\\zeta \\omega_0 s + \\omega_0^2}',
          targetEquation: 'H(z) = \\frac{1 - 2\\cos(\\omega_0)z^{-1} + z^{-2}}{1 - 2 r \\cos(\\omega_0)z^{-1} + r^2 z^{-2}}',
          underlyingUniversalMath: 'Biquad filter transfer function placing zeros on the unit circle.'
        },
        commonTrap: 'Assuming a mechanical resonance frequency is static; as the robot arm stretches out, its moment of inertia changes and the resonant frequency drops!',
        quickExperiment: 'Plot the Bode plot of a notch filter in Python and observe how phase lag affects system stability margin.'
      },
      electrical_electronics: {
        coreIntuition: 'The cornerstone of modern telecommunications: modulating signals onto RF carrier waves and analyzing circuits with phasor transforms.',
        familiarAnalogy: 'Your native domain: viewing a time-domain oscilloscope trace side-by-side with a spectrum analyzer display.',
        mappingTable: [
          { nativeTerm: 'Time Domain Voltage v(t)', targetTerm: 'Signal x(t)', sharedPhysicalRole: 'Oscilloscope representation' },
          { nativeTerm: 'Spectrum Analyzer Display', targetTerm: 'Magnitude Spectrum |X(f)|', sharedPhysicalRole: 'Frequency distribution of RF energy' },
          { nativeTerm: 'Phasor V = |V| e^(j θ)', targetTerm: 'Fourier Complex Component', sharedPhysicalRole: 'Sinusoid represented as magnitude and phase angle' }
        ],
        mathematicalEquivalence: {
          nativeEquation: 'V(t) = \\text{Re}\\{V e^{j \\omega t}\\} \\implies V = |V| e^{j \\phi}',
          targetEquation: 'X(f) = \\int x(t) e^{-j 2\\pi f t} dt',
          underlyingUniversalMath: 'Complex exponential transformation.'
        },
        commonTrap: 'Neglecting negative frequencies in mathematical Fourier representations.',
        quickExperiment: 'Synthesize a square wave by summing 1st, 3rd, 5th, and 7th harmonics in NumPy and observe Gibbs phenomenon at the edges.'
      }
    }
  }
];

export const CAPSTONE_PROJECTS: CapstoneProject[] = [
  {
    id: 'autonomous-inspection-drone',
    title: 'Autonomous Industrial Inspection Quadcopter',
    tagline: 'Bridging Aerodynamics, Embedded Avionics, Computer Vision & Structural Carbon Fiber',
    branchesInvolved: ['aerospace', 'mechanical', 'electrical_electronics', 'computer_science'],
    complexity: 'Mastery',
    durationWeeks: 12,
    objective: 'Design, fabricate, and program an autonomous drone that navigates GPS-denied industrial spaces, inspects structural bridge trusses for cracks using on-board edge AI, and transmits real-time telemetry.',
    branchRoles: [
      {
        branchId: 'aerospace',
        role: 'Aerodynamic & Flight Dynamics Lead',
        responsibilities: [
          'Calculate thrust-to-weight ratio (TWR > 2.2:1) and propulsive efficiency (g/Watt) for motor-propeller combinations.',
          'Formulate 6-DOF non-linear flight dynamics equations and attitude state-space model.',
          'Optimize carbon fiber airframe geometry for minimum aerodynamic drag in lateral forward flight.'
        ]
      },
      {
        branchId: 'mechanical',
        role: 'Structural CAD & Vibration Isolation Engineer',
        responsibilities: [
          'Design parametric carbon fiber arm mounts and 3D printed TPU vibration isolation dampers for the IMU sensor suite.',
          'Perform FEA stress analysis on arm clamps under max motor torque and 10G crash impact load cases.',
          'Ensure heat dissipation ducting from high-current electronic speed controllers (ESCs).'
        ]
      },
      {
        branchId: 'electrical_electronics',
        role: 'Avionics Power & Embedded Hardware Lead',
        responsibilities: [
          'Design 4S/6S LiPo power distribution board (PDB) with dual buck regulators (5V 3A for MCU, 12V 2A for edge AI companion computer).',
          'Implement low-noise LC filtering to eliminate ESC switching spikes from the analog video and IMU lines.',
          'Wire high-speed DShot600 digital ESC protocol and configure failsafe hardware cutoffs.'
        ]
      },
      {
        branchId: 'computer_science',
        role: 'Autonomy, SLAM & Edge Vision Engineer',
        responsibilities: [
          'Deploy visual-inertial odometry (VIO) using an onboard stereo camera for centimeter-accurate GPS-denied position holding.',
          'Run a quantized YOLOv8 object detection model on an NVIDIA Jetson Orin Nano at 30 FPS to detect concrete crack anomalies.',
          'Implement ROS2 state machine managing mission trajectories, collision avoidance, and fail-safe return-to-home.'
        ]
      }
    ],
    systemArchitecture: [
      'Layer 1: Physical Carbon Fiber Airframe + 4x 2207 Brushless Motors + 5-inch Tri-blade Props',
      'Layer 2: Power System (6S 1500mAh 100C LiPo -> PDB with Current Shunt Sensor -> 4-in-1 45A ESC)',
      'Layer 3: Real-Time Flight Controller (STM32H7, ICM-42688P IMU running Betaflight / PX4 at 8kHz)',
      'Layer 4: Companion Edge Computer (Jetson Orin Nano running Ubuntu Linux + ROS2 Humble)',
      'Layer 5: Sensor Payloads (Stereo Depth Camera + 2D LiDAR Rangefinder + Micro-gimbal 4K camera)'
    ],
    billOfMaterials: [
      { item: 'STM32H743 Flight Controller', category: 'Electronics', approxCost: '$65', purpose: 'Hard real-time 8kHz attitude PID loop' },
      { item: '4-in-1 50A BLHeli_32 ESC', category: 'Electronics', approxCost: '$70', purpose: '3-phase motor commutations with active telemetry' },
      { item: '2207 1950KV Brushless Motors (x4)', category: 'Mechanical', approxCost: '$80', purpose: 'Provides 4.8kg total thrust at peak throttle' },
      { item: 'NVIDIA Jetson Orin Nano 8GB', category: 'Hardware', approxCost: '$299', purpose: 'Edge neural network inference and VIO SLAM' },
      { item: 'Intel RealSense D435i Depth Camera', category: 'Hardware', approxCost: '$349', purpose: 'Stereo visual odometry in indoor environments' },
      { item: 'Toray 3K Carbon Fiber Arm Plates (4mm)', category: 'Mechanical', approxCost: '$45', purpose: 'Rigid airframe with high bending stiffness' }
    ],
    starterCode: {
      language: 'cpp',
      filename: 'flight_pid_controller.cpp',
      snippet: `// Real-Time Attitude Rate PID Controller Loop (1000Hz)
#include <stdint.h>

struct Vector3 { float roll, pitch, yaw; };

Vector3 calculate_motor_mix(Vector3 rate_setpoint, Vector3 measured_gyro, float dt) {
    static Vector3 integral_error = {0, 0, 0};
    static Vector3 prev_error = {0, 0, 0};
    
    const float KP = 1.4f, KI = 0.8f, KD = 0.035f;
    Vector3 output;
    
    // Roll Axis PID
    float roll_error = rate_setpoint.roll - measured_gyro.roll;
    integral_error.roll += roll_error * dt;
    // Anti-windup
    if (integral_error.roll > 200.0f) integral_error.roll = 200.0f;
    if (integral_error.roll < -200.0f) integral_error.roll = -200.0f;
    
    float roll_deriv = (roll_error - prev_error.roll) / dt;
    output.roll = (KP * roll_error) + (KI * integral_error.roll) + (KD * roll_deriv);
    prev_error.roll = roll_error;
    
    return output;
}`
    },
    learningOutcomes: [
      'Master the hardware-software boundary between hard real-time microcontrollers and high-level Linux companion computers.',
      'Understand how structural vibration harmonics leak into gyroscopes and degrade flight stability.',
      'Gain hands-on multidisciplinary experience managing mass budgets, thermal dissipation, and electrical noise.'
    ]
  },
  {
    id: 'smart-seismic-bridge-monitor',
    title: 'Smart Seismic Bridge Health & Active Damper',
    tagline: 'Bridging Civil Structures, IoT Microcontrollers, Signal Processing & Web Dashboard',
    branchesInvolved: ['civil_structural', 'electrical_electronics', 'computer_science', 'mechanical'],
    complexity: 'Advanced',
    durationWeeks: 10,
    objective: 'Build a scale model cable-stayed bridge instrumented with multi-axis MEMS accelerometers, an active tuned mass damper (TMD), solar-powered wireless telemetry, and real-time modal analysis web interface.',
    branchRoles: [
      {
        branchId: 'civil_structural',
        role: 'Structural Modeling & Modal Dynamics Lead',
        responsibilities: [
          'Model the bridge deck stiffness and calculate first 3 natural vibration modes (torsional and flexural).',
          'Size the Tuned Mass Damper mass (m_d ≈ 2% to 5% of modal mass) and spring constant for optimal damping.',
          'Establish structural threshold limits for damage detection (deflection and strain limits).'
        ]
      },
      {
        branchId: 'mechanical',
        role: 'Tuned Mass Damper & Actuator Engineer',
        responsibilities: [
          'Design low-friction linear ball bearing track and magnetic eddy-current damper for the sliding mass.',
          'Size voice coil actuator / linear servo motor to actively counteract deck resonance.',
          'Fabricate high-fatigue resistant cable stay anchorage fittings.'
        ]
      },
      {
        branchId: 'electrical_electronics',
        role: 'Sensor Telemetry & Energy Harvesting Lead',
        responsibilities: [
          'Interface ultra-low-noise 24-bit seismic accelerometers and strain gauges via SPI/I2C.',
          'Design solar energy harvesting circuit with supercapacitor backup for 24/7 wireless operation.',
          'Transmit sensor packets over LoRaWAN (915MHz) across 5km line-of-sight.'
        ]
      },
      {
        branchId: 'computer_science',
        role: 'Cloud Pipeline & Real-Time FFT Analytics Lead',
        responsibilities: [
          'Build cloud ingestion pipeline (MQTT / WebSockets) streaming 100Hz vibration data.',
          'Execute real-time Automated Operational Modal Analysis (OMA) to track shifts in bridge natural frequencies.',
          'Build an interactive 3D digital twin dashboard displaying live beam deflection and alarm triggers.'
        ]
      }
    ],
    systemArchitecture: [
      'Structural Layer: 1:50 Scale Acrylic/Aluminum Cable-Stayed Bridge Deck (2.4m span)',
      'Actuation Layer: Voice-Coil Active Tuned Mass Damper on Center Span',
      'Sensing Layer: ADXL355 Ultra-Low Noise Accelerometers + Half-Bridge Strain Gauges',
      'Firmware Layer: ESP32-S3 Microcontroller running FreeRTOS with LoRaWAN Transceiver',
      'Cloud & UI Layer: Node.js / Express Time-Series Database + Three.js 3D Deflection Visualizer'
    ],
    billOfMaterials: [
      { item: 'ADXL355 Low-Noise Triaxial Accelerometer', category: 'Electronics', approxCost: '$45', purpose: 'Captures micro-g seismic deck vibrations' },
      { item: 'ESP32-S3 LoRa Development Board', category: 'Electronics', approxCost: '$25', purpose: 'Digitizes sensor signals and transmits packets' },
      { item: 'Linear Voice Coil Actuator (15N)', category: 'Mechanical', approxCost: '$120', purpose: 'Applies active counter-force to mass damper' },
      { item: 'Solar Panel 5W + MPPT Charger IC', category: 'Electronics', approxCost: '$30', purpose: 'Self-powered off-grid remote operation' },
      { item: 'Precision Linear Guide Rail (300mm)', category: 'Mechanical', approxCost: '$35', purpose: 'Low-friction path for the tuned mass damper' }
    ],
    learningOutcomes: [
      'Learn how physical structural resonance can be mitigated in real-time by cyber-physical controllers.',
      'Master low-power wireless sensor network design and energy harvesting.',
      'Bridge civil structural mechanics with modern cloud telemetry and streaming signal processing.'
    ]
  },
  {
    id: 'biomimetic-prosthetic-hand',
    title: 'Myoelectric Bionic Prosthetic Hand',
    tagline: 'Bridging Electrophysiology, 3D Printing, Micro-actuators & Real-Time Embedded C++',
    branchesInvolved: ['biomedical', 'mechatronics', 'mechanical', 'computer_science'],
    complexity: 'Advanced',
    durationWeeks: 10,
    objective: 'Create an affordable 5-finger prosthetic hand powered by surface electromyography (sEMG) muscle signals, linear micro-actuators with force feedback, and machine-learning gesture classification.',
    branchRoles: [
      {
        branchId: 'biomedical',
        role: 'Biosignal Acquisition & Ergonomics Lead',
        responsibilities: [
          'Design non-invasive sEMG electrode placement on forearm (flexor and extensor carpi radialis).',
          'Implement analog instrumentation amplifier (AD8232/INA128) with 60Hz notch filter and 20-450Hz bandpass.',
          'Perform user skin impedance matching and silicone socket ergonomic fitting.'
        ]
      },
      {
        branchId: 'mechanical',
        role: 'Biomimetic Mechanism & Compliant Joint Designer',
        responsibilities: [
          'Design under-actuated whippletree cable linkage mechanism allowing fingers to passively conform around irregular objects.',
          '3D print fingers in tough nylon/PETG with flexible TPU compliant flexure hinges.',
          'Integrate miniature force-sensitive resistors (FSRs) into fingertips for tactile grip feedback.'
        ]
      },
      {
        branchId: 'mechatronics',
        role: 'Actuation & Motor Control Engineer',
        responsibilities: [
          'Size 5x micro coreless DC gear motors with metal leadscrews providing up to 15N pinch force per finger.',
          'Implement current sensing on each motor to detect when an object has been gripped without crushing it.',
          'Program low-latency closed-loop position control on an STM32 ARM Cortex-M4.'
        ]
      },
      {
        branchId: 'computer_science',
        role: 'TinyML Gesture Classifier Lead',
        responsibilities: [
          'Extract time-domain features from sEMG (Mean Absolute Value, Zero Crossings, Waveform Length, Slope Sign Changes).',
          'Train a compact Random Forest or Multi-Layer Perceptron model to classify 6 distinct grips (Pinch, Fist, Point, Hook, Peace, Neutral).',
          'Quantize model to run on microcontroller with < 50ms classification latency.'
        ]
      }
    ],
    systemArchitecture: [
      'Layer 1: sEMG Forearm Sensor Electrodes (Ag/AgCl dry electrodes)',
      'Layer 2: Analog Front-End (Instrumentation Amplifier -> Bandpass Filter -> Rectifier)',
      'Layer 3: Processing Unit (STM32F401 running 1000Hz ADC sampling + TinyML inference)',
      'Layer 4: Motor Drive (Dual DRV8833 H-Bridge motor drivers)',
      'Layer 5: Mechanical Hand (3D-printed articulated fingers with tendon drive cables)'
    ],
    billOfMaterials: [
      { item: 'Dry Contact sEMG Sensor Muscle Module', category: 'Electronics', approxCost: '$35', purpose: 'Acquires electrical voltage pulses from muscle contraction' },
      { item: 'Micro Metal Gearmotors 100:1 (x5)', category: 'Mechanical', approxCost: '$60', purpose: 'Individual finger tendon spooling and articulation' },
      { item: 'STM32F411 BlackPill Board', category: 'Hardware', approxCost: '$8', purpose: 'Performs signal filtering and TinyML classification' },
      { item: 'Tough Nylon Carbon Filament (1kg)', category: 'Mechanical', approxCost: '$45', purpose: 'Lightweight, fatigue-resistant 3D printed finger links' },
      { item: 'FSR 402 Force Sensing Resistor (x5)', category: 'Electronics', approxCost: '$30', purpose: 'Measures fingertip grip pressure on delicate objects' }
    ],
    learningOutcomes: [
      'Understand how noisy microvolt biological signals can be filtered into clean digital commands.',
      'Design under-actuated mechanical linkages that adapt to organic shapes with minimal motor count.',
      'Deploy real-time TinyML models onto low-power microcontrollers.'
    ]
  },
  {
    id: 'ev-battery-thermal-management',
    title: 'EV Battery Pack & Thermal Loop Simulator',
    tagline: 'Bridging Electrochemistry, Fluid Heat Transfer, High-Voltage Safety & Firmware',
    branchesInvolved: ['chemical_materials', 'mechanical', 'electrical_electronics', 'mechatronics'],
    complexity: 'Mastery',
    durationWeeks: 12,
    objective: 'Design an end-to-end 48V modular lithium-ion battery pack with an active liquid cooling cold plate, dynamic CAN bus BMS telemetry, and hardware-in-the-loop thermal runaway containment.',
    branchRoles: [
      {
        branchId: 'chemical_materials',
        role: 'Cell Chemistry & Degradation Specialist',
        responsibilities: [
          'Analyze 21700 cell electrochemical impedance spectroscopy (EIS) data across temperatures (-10°C to +55°C).',
          'Establish safe charging C-rate envelopes to prevent lithium plating during fast charging.',
          'Model battery heat generation rate (Joule heating + entropic reversible heat Q = I²R - I T dU/dT).'
        ]
      },
      {
        branchId: 'mechanical',
        role: 'Cold Plate CFD & Pack Enclosure Engineer',
        responsibilities: [
          'Design serpentine liquid cooling channel cold plate in SolidWorks and run CFD flow simulations.',
          'Ensure temperature gradient across all cells remains under 3°C to prevent premature localized aging.',
          'Design IP67 sealed aluminum pack enclosure with pressure relief burst disc for gas venting.'
        ]
      },
      {
        branchId: 'electrical_electronics',
        role: 'BMS Circuit & High Voltage Safety Lead',
        responsibilities: [
          'Design 14S BMS front-end circuit (BQ76952) with passive cell balancing and redundant overvoltage protection.',
          'Implement isolated CAN bus transceiver (ISO1042) to communicate pack telemetry to vehicle controller.',
          'Design pre-charge circuit and solid-state contactor disconnect for safe inrush current handling.'
        ]
      },
      {
        branchId: 'mechatronics',
        role: 'Thermal Pump & Valve Control Loop Engineer',
        responsibilities: [
          'Implement closed-loop PID control of 12V brushless coolant pump and electronic proportional valve.',
          'Calibrate Extended Kalman Filter (EKF) for real-time State-of-Charge (SoC) estimation.',
          'Program hardware-in-the-loop test bench simulating high-speed highway driving and regenerative braking.'
        ]
      }
    ],
    systemArchitecture: [
      'Pack Architecture: 14S 4P Configuration (56x 21700 NMC Lithium-Ion Cells, 48V Nominal, 20Ah)',
      'Thermal Loop: Aluminum Extruded Cold Plate + 50/50 Water-Glycol Coolant + 12V DC Pump + Radiator',
      'Electronic BMS: Texas Instruments BQ76952 Analog Front-End + STM32G4 Microcontroller',
      'Safety Subsystem: Pyro-fuse + High-Voltage Interlock Loop (HVIL) + Gas Pressure Sensor'
    ],
    billOfMaterials: [
      { item: 'Samsung 21700 50E Li-ion Cells (x56)', category: 'Hardware', approxCost: '$280', purpose: 'High energy density energy storage core' },
      { item: 'TI BQ76952 BMS Evaluation Module', category: 'Electronics', approxCost: '$149', purpose: 'Monitors 14 cell voltages and 4 thermistors' },
      { item: 'Custom Aluminum Liquid Cooling Cold Plate', category: 'Mechanical', approxCost: '$120', purpose: 'Conducts heat away from cell bases via glycol' },
      { item: '12V 10W Brushless Coolant Pump', category: 'Mechanical', approxCost: '$35', purpose: 'Circulates fluid through cooling jacket' },
      { item: 'High-Voltage 500V 100A Contactors (x2)', category: 'Electronics', approxCost: '$75', purpose: 'Emergency galvanic isolation disconnect' }
    ],
    learningOutcomes: [
      'Deeply grasp the tight coupling between electrochemistry, temperature, and electrical safety.',
      'Design automotive-grade cooling channels with verified CFD pressure drops and heat transfer coefficients.',
      'Write robust BMS firmware that handles cell balancing, thermal throttling, and emergency faults.'
    ]
  }
];

export const ENGINEERING_CONSTANTS: EngineeringConstant[] = [
  { symbol: 'g', name: 'Standard Gravitational Acceleration', value: '9.80665', unit: 'm/s²', domain: 'Mechanics', significance: 'Earth surface free-fall acceleration for weight and hydrostatic calculations.' },
  { symbol: 'c', name: 'Speed of Light in Vacuum', value: '299,792,458', unit: 'm/s', domain: 'Electromagnetics & Optics', significance: 'Universal speed limit for electromagnetic wave propagation.' },
  { symbol: 'k_B', name: 'Boltzmann Constant', value: '1.380649 × 10⁻²³', unit: 'J/K', domain: 'Thermodynamics & Semiconductors', significance: 'Relates thermal kinetic energy to temperature; dictates diode thermal voltage Vt = kT/q.' },
  { symbol: 'q', name: 'Elementary Charge', value: '1.602176634 × 10⁻¹⁹', unit: 'Coulombs', domain: 'Electrical', significance: 'Magnitude of electric charge carried by a single proton or electron.' },
  { symbol: 'R', name: 'Universal Gas Constant', value: '8.314462', unit: 'J/(mol·K)', domain: 'Chemical & Thermofluids', significance: 'Appears in ideal gas law P V = n R T and Nernst electrochemical equation.' },
  { symbol: 'ε₀', name: 'Vacuum Permittivity', value: '8.8541878 × 10⁻¹²', unit: 'F/m', domain: 'Electromagnetics', significance: 'Ability of vacuum to permit electric field lines; sets capacitance C = ε A / d.' },
  { symbol: 'μ₀', name: 'Vacuum Permeability', value: '1.256637 × 10⁻⁶', unit: 'H/m (N/A²)', domain: 'Electromagnetics', significance: 'Magnetic induction capability of free space; relates to c via c = 1/√(ε₀ μ₀).' },
  { symbol: 'σ', name: 'Stefan-Boltzmann Constant', value: '5.670374 × 10⁻⁸', unit: 'W/(m²·K⁴)', domain: 'Thermal Radiation', significance: 'Blackbody radiation emission rate E = σ T⁴.' }
];
