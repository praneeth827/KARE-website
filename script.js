// Simple authentication (hardcoded for demo)
const validUser = { username: "admin", password: "kare123" };

// Login logic
if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
  document.getElementById("loginForm").onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === validUser.username && password === validUser.password) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginError").innerText = "Invalid credentials!";
    }
  };
}

// Auth check for dashboard
if (window.location.pathname.endsWith("dashboard.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// Dynamic COs options based on sessional
function getCOsOptions(sessional) {
  if (sessional === "I") return ["CO1", "CO2"];
  if (sessional === "II") return ["CO3", "CO4"];
  return [];
}

// Patterns for auto-generation
const patterns = ["Remember", "Understand", "Apply", "Analyze"];

// Example question bank for auto-generation
const questionBank = {
  CO1: [
    "Define Gradient.",
    "State Gauss divergence theorem.",
    "Explain the concept of double integration.",
    "What is a vector field?",
    "State Green's theorem.",
    "Explain the application of triple integrals.",
    "Define solenoidal vector field.",
    "State and prove divergence theorem.",
    "What is the physical meaning of curl?",
    "Explain the concept of conservative field."
  ],
  CO2: [
    "State Cauchy-Riemann equations.",
    "Define analytic function.",
    "Explain harmonic functions.",
    "What is a bilinear transformation?",
    "State the fundamental theorem of algebra.",
    "Explain the concept of entire functions.",
    "Define singularity in complex analysis.",
    "What is a conformal mapping?",
    "Explain the concept of residue theorem.",
    "State and prove Liouville's theorem."
  ],
  CO3: [
    "Find the directional derivative of f(x, y, z) = xy³ + yz³ at the point (2, −1, 1) in the direction of i + 2j + 2k.",
    "Verify Stoke's Theorem for F = (x² − y²)i + 2xy j in the rectangular region in XOY plane bounded by x = 0, x = a, y = 0, y = b.",
    "Evaluate the surface integral of F over the given surface.",
    "Find the divergence of a given vector field.",
    "Apply Green's theorem to evaluate the line integral.",
    "Find the curl of a vector field.",
    "Evaluate the triple integral over the given region.",
    "Find the flux of F across the surface S.",
    "Use divergence theorem to compute the surface integral.",
    "Find the potential function for a conservative field."
  ],
  CO4: [
    "Test the Analyticity of the function f(z) = sinz using C.R. equations.",
    "Find the bilinear transformation that maps z = 1, i, −1 onto the point w = i, 0, −i.",
    "Check the analyticity of f(z) = z̄.",
    "Show that the function v(x, y) = tan⁻¹(y/x) is harmonic.",
    "Find the residue of f(z) at z = 0.",
    "Determine the nature of singularity at z = 1.",
    "Prove that f(z) is entire.",
    "Find the image of the circle |z| = 1 under the mapping w = z².",
    "Evaluate the integral using Cauchy's integral formula.",
    "Test the function for harmonicity."
  ]
};

// Course-specific question banks with levels
const courseQuestionBanks = {
  '211MAT1303': {
    normal: {
      CO1: [
        'Evaluate the integral: ∫₀¹ (3x² + 2x + 1) dx.',
        'Find the derivative of f(x) = x³ - 5x² + 4x - 7.',
        'If y = e^{2x} sin(x), find dy/dx.',
        'Find the area under the curve y = x² between x = 1 and x = 3.',
        'Solve: limₓ→0 (sin(3x)/x).'
      ],
      CO2: [
        'Solve the system of equations: 2x + 3y = 5, 4x - y = 11.',
        'Find the eigenvalues of the matrix [[2, 1], [1, 2]].',
        'If A = [[1, 2], [3, 4]], compute the determinant of A.',
        'Find the inverse of the matrix [[1, 2], [3, 4]].',
        'If v = (3, 4), find the magnitude of v.'
      ],
      CO3: [
        'Solve the differential equation: dy/dx + y = e^x.',
        'Find the general solution of d²y/dx² - 4y = 0.',
        'Solve: x dy/dx + y = x².',
        'Find the particular solution of dy/dx = 3y, y(0) = 2.',
        'If y = x²e^x, find dy/dx.'
      ],
      CO4: [
        'Evaluate the line integral ∫_C (2x dx + 3y dy), where C is the line from (0,0) to (1,1).',
        'Find the residue of f(z) = 1/(z² + 1) at z = i.',
        'If z = 3 - 4i, find |z| and arg(z).',
        'Find the probability of getting a sum of 7 when two dice are thrown.',
        'A coin is tossed 5 times. What is the probability of getting exactly 3 heads?'
      ]
    },
    medium: {
      CO1: ["Explain the application of triple integrals.", "Define solenoidal vector field.", "State and prove divergence theorem.", "What is the physical meaning of curl?", "Explain the concept of conservative field.",],
      CO2: ["Explain the concept of entire functions.", "Define singularity in complex analysis.", "What is a conformal mapping?", "Explain the concept of residue theorem.", "State and prove Liouville's theorem.",],
      CO3: ["Evaluate the surface integral of F over the given surface.", "Find the flux of F across the surface S.", "Use divergence theorem to compute the surface integral.", "Find the directional derivative of f(x, y, z) = xy³ + yz³ at (2, −1, 1) in the direction of i + 2j + 2k.", "Verify Stoke's Theorem for F = (x² − y²)i + 2xy j in the rectangular region in XOY plane.",],
      CO4: ["Test the Analyticity of f(z) = sinz using C.R. equations.", "Find the bilinear transformation that maps z = 1, i, −1 onto w = i, 0, −i.", "Determine the nature of singularity at z = 1.", "Prove that f(z) is entire.", "Evaluate the integral using Cauchy's integral formula.",]
    },
    high: {
      CO1: ["Prove and apply the divergence theorem in a non-trivial region.", "Solve a complex vector field problem involving curl and divergence.", "Derive the conditions for a field to be solenoidal and irrotational.", "Formulate and solve a real-world problem using triple integrals.", "Analyze the behavior of a vector field at infinity.",],
      CO2: ["Prove the general form of Cauchy-Riemann equations.", "Analyze the mapping properties of a complex function.", "Solve a challenging problem on bilinear transformation.", "Prove the maximum modulus principle.", "Classify all singularities of a given function.",],
      CO3: ["Solve a multi-step problem involving surface and volume integrals.", "Prove Stoke's theorem for a non-standard surface.", "Analyze the physical interpretation of divergence and curl in electromagnetics.", "Evaluate a complex triple integral in spherical coordinates.", "Formulate a proof for the uniqueness of potential functions.",],
      CO4: ["Prove analyticity for a piecewise-defined function.", "Construct a harmonic conjugate for a given function.", "Solve a difficult residue calculation.", "Analyze the mapping of a region under a complex transformation.", "Prove Liouville's theorem for bounded entire functions.",]
    }
  },
  '211PHY1201': {
    normal: {
      CO1: ["State Ohm's law.", "Define electric field.", "What is magnetic flux?", "Explain Faraday's law.", "State Lenz's law."],
      CO2: ["Define capacitance.", "Explain dielectric constant.", "What is a transformer?", "State Ampere's law.", "Explain electromagnetic induction."],
      CO3: ["Calculate the resistance of a wire.", "Find the force on a moving charge.", "Explain the working of a solenoid.", "Calculate the energy stored in a capacitor.", "Find the current in a circuit using Kirchhoff's law."],
      CO4: ["Explain the photoelectric effect.", "Describe the Compton effect.", "What is the de Broglie wavelength?", "Explain the concept of wave-particle duality.", "State Heisenberg's uncertainty principle."]
    },
    medium: {
      CO1: ["Derive the expression for drift velocity.", "Explain the Hall effect.", "Calculate the equivalent resistance in a complex circuit.", "Explain the working of a cyclotron.", "Describe the behavior of a dielectric in an electric field."],
      CO2: ["Calculate the capacitance of a parallel plate capacitor with a dielectric.", "Explain the working of a transformer with losses.", "Analyze the effect of frequency on inductive reactance.", "Describe the working of a moving coil galvanometer.", "Explain the concept of displacement current."],
      CO3: ["Calculate the force on a current-carrying conductor in a magnetic field.", "Analyze the energy stored in a magnetic field.", "Explain the working of a DC motor.", "Calculate the induced emf in a rotating coil.", "Describe the hysteresis loop in ferromagnetic materials."],
      CO4: ["Explain the dual nature of matter and radiation.", "Calculate the wavelength of an electron.", "Describe the Davisson-Germer experiment.", "Explain the working of a photo cell.", "Analyze the uncertainty in simultaneous measurement of position and momentum."]
    },
    high: {
      CO1: ["Solve a complex circuit using Thevenin's and Norton's theorems.", "Analyze the transient response of an RLC circuit.", "Derive Maxwell's equations from basic principles.", "Formulate the boundary conditions for electromagnetic fields.", "Analyze the propagation of electromagnetic waves in a medium."],
      CO2: ["Prove the uniqueness theorem for electrostatics.", "Analyze the effect of dielectric breakdown.", "Solve a challenging transformer design problem.", "Derive the expression for self and mutual inductance.", "Analyze the effect of eddy currents in transformers."],
      CO3: ["Solve a multi-loop circuit using matrix methods.", "Analyze the energy transfer in an AC circuit.", "Derive the expression for magnetic vector potential.", "Formulate the equations for electromagnetic induction in a moving conductor.", "Analyze the effect of magnetic materials on field distribution."],
      CO4: ["Prove the Compton effect using quantum theory.", "Analyze the results of the Stern-Gerlach experiment.", "Solve a complex problem on electron diffraction.", "Derive the uncertainty relation from wave packets.", "Analyze the quantum tunneling effect in semiconductors."]
    }
  },
  '211CHE1102': {
    normal: {
      CO1: ["Define molarity.", "What is Avogadro's number?", "State Boyle's law.", "What is a chemical bond?", "Define pH.",],
      CO2: ["State the law of conservation of mass.", "What is a catalyst?", "Define oxidation.", "What is a redox reaction?", "State Charles's law.",],
      CO3: ["Calculate the molar mass of NaCl.", "Find the empirical formula for a compound.", "Explain the process of titration.", "Calculate the pH of a solution.", "Determine the limiting reagent in a reaction.",],
      CO4: ["Explain the mechanism of SN1 reaction.", "Describe the structure of benzene.", "What is an isomer?", "Explain the process of polymerization.", "Describe the types of chemical bonds.",]
    },
    medium: {
      CO1: ["Explain the kinetic theory of gases.", "Describe the process of electrolysis.", "Calculate the normality of a solution.", "Explain the concept of buffer solutions.", "Describe the types of colloids.",],
      CO2: ["Explain the process of corrosion.", "Describe the preparation of ammonia.", "Explain the concept of equivalent weight.", "Describe the process of crystallization.", "Explain the process of distillation.",],
      CO3: ["Calculate the enthalpy change for a reaction.", "Explain the process of precipitation.", "Describe the process of chromatography.", "Calculate the solubility product.", "Explain the process of hydrolysis.",],
      CO4: ["Describe the mechanism of electrophilic substitution.", "Explain the process of saponification.", "Describe the process of fermentation.", "Explain the process of nitration.", "Describe the process of alkylation.",]
    },
    high: {
      CO1: ["Derive the van't Hoff equation.", "Analyze the phase diagram of water.", "Explain the quantum mechanical model of atom.", "Describe the Born-Haber cycle.", "Explain the process of fractional distillation.",],
      CO2: ["Prove Hess's law of constant heat summation.", "Analyze the effect of temperature on reaction rate.", "Explain the process of electroplating.", "Describe the process of zone refining.", "Explain the process of ion exchange.",],
      CO3: ["Solve a multi-step stoichiometry problem.", "Analyze the thermodynamics of a chemical reaction.", "Explain the process of solvent extraction.", "Describe the process of photochemical reaction.", "Explain the process of gas chromatography.",],
      CO4: ["Prove the mechanism of nucleophilic substitution.", "Analyze the stereochemistry of organic reactions.", "Explain the process of peptide synthesis.", "Describe the process of DNA replication.", "Explain the process of protein folding.",]
    }
  },
  '211CSE1401': {
    normal: {
      CO1: ["Define algorithm.", "What is a variable?", "State the use of printf in C.", "What is a data type?", "Define array.",],
      CO2: ["What is a function in C?", "Define pointer.", "What is a loop?", "State the use of scanf.", "What is a structure?",],
      CO3: ["Write a C program to add two numbers.", "Write a program to find the largest of three numbers.", "Write a program to reverse a string.", "Write a program to calculate factorial.", "Write a program to swap two numbers.",],
      CO4: ["Explain the use of recursion.", "Describe file handling in C.", "What is dynamic memory allocation?", "Explain command line arguments.", "Describe the use of pointers in arrays.",]
    },
    medium: {
      CO1: ["Explain the concept of recursion.", "Describe the use of functions.", "Explain the difference between call by value and call by reference.", "Describe the use of static variables.", "Explain the use of typedef.",],
      CO2: ["Explain the use of pointers in functions.", "Describe the use of unions.", "Explain the use of enums.", "Describe the use of bitwise operators.", "Explain the use of macros.",],
      CO3: ["Write a program to sort an array.", "Write a program to search an element in an array.", "Write a program to merge two arrays.", "Write a program to implement a stack.", "Write a program to implement a queue.",],
      CO4: ["Explain the use of linked lists.", "Describe the use of trees.", "Explain the use of graphs.", "Describe the use of hash tables.", "Explain the use of dynamic memory allocation in linked lists.",]
    },
    high: {
      CO1: ["Design an efficient sorting algorithm.", "Analyze the complexity of a recursive function.", "Explain the use of function pointers.", "Describe the use of memory management functions.", "Explain the use of multi-dimensional arrays.",],
      CO2: ["Implement a binary search tree.", "Design a hash table.", "Explain the use of AVL trees.", "Describe the use of graph traversal algorithms.", "Explain the use of dynamic programming.",],
      CO3: ["Write a program to implement quick sort.", "Write a program to implement merge sort.", "Write a program to implement depth first search.", "Write a program to implement breadth first search.", "Write a program to implement Dijkstra's algorithm.",],
      CO4: ["Explain the use of memory pools.", "Describe the use of garbage collection.", "Explain the use of smart pointers.", "Describe the use of memory leaks.", "Explain the use of memory fragmentation.",]
    }
  },
  '211EEE1502': {
    normal: {
      CO1: ["Define current.", "What is voltage?", "State Ohm's law.", "What is resistance?", "Define power.",],
      CO2: ["What is an inductor?", "Define capacitance.", "What is a transformer?", "State Faraday's law.", "What is a diode?",],
      CO3: ["Calculate the current in a circuit.", "Find the voltage across a resistor.", "Calculate the power in a circuit.", "Find the resistance of a wire.", "Calculate the energy stored in a capacitor.",],
      CO4: ["Explain the use of transistors.", "Describe the use of operational amplifiers.", "What is a rectifier?", "Explain the use of filters.", "Describe the use of oscillators.",]
    },
    medium: {
      CO1: ["Explain the concept of alternating current.", "Describe the use of transformers.", "Explain the use of capacitors in AC circuits.", "Describe the use of inductors in AC circuits.", "Explain the use of resonance in circuits.",],
      CO2: ["Explain the use of diodes in rectifiers.", "Describe the use of Zener diodes.", "Explain the use of transistors in amplifiers.", "Describe the use of operational amplifiers in filters.", "Explain the use of oscillators in circuits.",],
      CO3: ["Calculate the impedance of a circuit.", "Find the phase angle in an AC circuit.", "Calculate the power factor of a circuit.", "Find the bandwidth of a filter.", "Calculate the gain of an amplifier.",],
      CO4: ["Explain the use of feedback in amplifiers.", "Describe the use of negative feedback.", "Explain the use of positive feedback.", "Describe the use of oscillators in communication systems.", "Explain the use of filters in signal processing.",]
    },
    high: {
      CO1: ["Design a complex AC circuit.", "Analyze the transient response of an RLC circuit.", "Explain the use of Laplace transforms in circuit analysis.", "Describe the use of Fourier transforms in signal processing.", "Explain the use of state space analysis in circuits.",],
      CO2: ["Design a high-frequency amplifier.", "Analyze the stability of an amplifier.", "Explain the use of feedback in oscillators.", "Describe the use of phase-locked loops.", "Explain the use of voltage regulators.",],
      CO3: ["Design a band-pass filter.", "Analyze the frequency response of a circuit.", "Explain the use of Bode plots.", "Describe the use of Smith charts.", "Explain the use of S-parameters in circuit analysis.",],
      CO4: ["Design a communication system.", "Analyze the noise performance of a circuit.", "Explain the use of error correction codes.", "Describe the use of modulation techniques.", "Explain the use of demodulation techniques.",]
    }
  },
  '211ECE1603': {
    normal: {
      CO1: ["Define semiconductor.", "What is a diode?", "State the use of a transistor.", "What is an amplifier?", "Define modulation.",],
      CO2: ["What is a rectifier?", "Define oscillator.", "What is a filter?", "State the use of an op-amp.", "What is a multiplexer?",],
      CO3: ["Calculate the gain of an amplifier.", "Find the cutoff frequency of a filter.", "Calculate the output of an op-amp circuit.", "Find the frequency of an oscillator.", "Calculate the efficiency of a rectifier.",],
      CO4: ["Explain the use of logic gates.", "Describe the use of flip-flops.", "What is a counter?", "Explain the use of shift registers.", "Describe the use of memory devices.",]
    },
    medium: {
      CO1: ["Explain the working of a PN junction.", "Describe the use of Zener diodes.", "Explain the use of transistors in amplifiers.", "Describe the use of operational amplifiers in filters.", "Explain the use of oscillators in circuits.",],
      CO2: ["Explain the use of diodes in rectifiers.", "Describe the use of transistors in switches.", "Explain the use of op-amps in comparators.", "Describe the use of multiplexers in digital circuits.", "Explain the use of demultiplexers.",],
      CO3: ["Calculate the bandwidth of an amplifier.", "Find the slew rate of an op-amp.", "Calculate the gain-bandwidth product.", "Find the output voltage of a comparator.", "Calculate the duty cycle of a waveform.",],
      CO4: ["Explain the use of counters in digital circuits.", "Describe the use of shift registers in data storage.", "Explain the use of memory devices in computers.", "Describe the use of flip-flops in timing circuits.", "Explain the use of logic gates in arithmetic circuits.",]
    },
    high: {
      CO1: ["Design a high-frequency amplifier.", "Analyze the stability of an oscillator.", "Explain the use of feedback in amplifiers.", "Describe the use of phase-locked loops.", "Explain the use of voltage regulators.",],
      CO2: ["Design a digital-to-analog converter.", "Analyze the performance of an analog-to-digital converter.", "Explain the use of sample and hold circuits.", "Describe the use of analog multiplexers.", "Explain the use of digital signal processors.",],
      CO3: ["Design a high-speed comparator.", "Analyze the noise performance of an op-amp.", "Explain the use of instrumentation amplifiers.", "Describe the use of analog filters in communication systems.", "Explain the use of switched-capacitor filters.",],
      CO4: ["Design a memory system.", "Analyze the timing of a flip-flop.", "Explain the use of error correction codes in memory.", "Describe the use of cache memory.", "Explain the use of virtual memory.",]
    }
  },
  '211MEC1704': {
    normal: {
      CO1: ["Define force.", "What is mass?", "State Newton's first law.", "What is work?", "Define energy.",],
      CO2: ["What is power?", "Define pressure.", "What is a lever?", "State Pascal's law.", "What is a pulley?",],
      CO3: ["Calculate the work done by a force.", "Find the mechanical advantage of a lever.", "Calculate the efficiency of a machine.", "Find the velocity of a moving object.", "Calculate the acceleration of a body.",],
      CO4: ["Explain the use of gears.", "Describe the use of cams.", "What is a flywheel?", "Explain the use of bearings.", "Describe the use of springs.",]
    },
    medium: {
      CO1: ["Explain the concept of momentum.", "Describe the use of pulleys.", "Explain the use of inclined planes.", "Describe the use of wedges.", "Explain the use of screws.",],
      CO2: ["Explain the use of hydraulic systems.", "Describe the use of pneumatic systems.", "Explain the use of gears in machines.", "Describe the use of cams in engines.", "Explain the use of flywheels in machines.",],
      CO3: ["Calculate the power output of a machine.", "Find the torque produced by a force.", "Calculate the moment of inertia of a body.", "Find the center of gravity of a body.", "Calculate the angular velocity of a rotating object.",],
      CO4: ["Explain the use of bearings in machines.", "Describe the use of springs in suspension systems.", "Explain the use of dampers in machines.", "Describe the use of clutches in vehicles.", "Explain the use of brakes in machines.",]
    },
    high: {
      CO1: ["Design a complex machine.", "Analyze the motion of a multi-body system.", "Explain the use of finite element analysis in mechanics.", "Describe the use of computational methods in mechanics.", "Explain the use of optimization in machine design.",],
      CO2: ["Design a hydraulic system.", "Analyze the performance of a pneumatic system.", "Explain the use of advanced gear systems.", "Describe the use of cam profiles in engines.", "Explain the use of flywheel energy storage.",],
      CO3: ["Design a high-efficiency machine.", "Analyze the dynamics of a rotating system.", "Explain the use of gyroscopic effects in machines.", "Describe the use of vibration analysis in machines.", "Explain the use of modal analysis in structures.",],
      CO4: ["Design a suspension system.", "Analyze the performance of a damper.", "Explain the use of advanced clutch systems.", "Describe the use of regenerative braking.", "Explain the use of smart materials in machines.",]
    }
  },
  '211CIV1805': {
    normal: {
      CO1: ["Define load.", "What is stress?", "State Hooke's law.", "What is strain?", "Define modulus of elasticity.",],
      CO2: ["What is a beam?", "Define shear force.", "What is bending moment?", "State the use of columns.", "What is a truss?",],
      CO3: ["Calculate the stress in a bar.", "Find the strain in a rod.", "Calculate the deflection of a beam.", "Find the moment of inertia of a section.", "Calculate the load on a column.",],
      CO4: ["Explain the use of reinforced concrete.", "Describe the use of steel in construction.", "What is prestressed concrete?", "Explain the use of foundations.", "Describe the use of retaining walls.",]
    },
    medium: {
      CO1: ["Explain the concept of elasticity.", "Describe the use of beams in construction.", "Explain the use of columns in buildings.", "Describe the use of trusses in bridges.", "Explain the use of arches in structures.",],
      CO2: ["Explain the use of shear force diagrams.", "Describe the use of bending moment diagrams.", "Explain the use of columns in multi-storey buildings.", "Describe the use of trusses in roof structures.", "Explain the use of retaining walls in basements.",],
      CO3: ["Calculate the deflection of a cantilever beam.", "Find the moment of resistance of a section.", "Calculate the load carrying capacity of a column.", "Find the shear force at a section.", "Calculate the bending moment at a section.",],
      CO4: ["Explain the use of reinforced concrete in bridges.", "Describe the use of steel in high-rise buildings.", "Explain the use of prestressed concrete in bridges.", "Describe the use of foundations in soft soils.", "Explain the use of retaining walls in earth dams.",]
    },
    high: {
      CO1: ["Design a multi-storey building.", "Analyze the stability of a retaining wall.", "Explain the use of finite element analysis in structures.", "Describe the use of computational methods in civil engineering.", "Explain the use of optimization in structural design.",],
      CO2: ["Design a complex truss system.", "Analyze the performance of a beam under variable load.", "Explain the use of advanced column systems.", "Describe the use of smart materials in construction.", "Explain the use of earthquake-resistant design.",],
      CO3: ["Design a high-strength concrete mix.", "Analyze the dynamics of a bridge.", "Explain the use of vibration analysis in buildings.", "Describe the use of modal analysis in structures.", "Explain the use of smart sensors in civil engineering.",],
      CO4: ["Design a foundation for a high-rise building.", "Analyze the performance of a retaining wall in a dam.", "Explain the use of advanced concrete technologies.", "Describe the use of geosynthetics in construction.", "Explain the use of green building materials.",]
    }
  },
};

const courseNameToCode = {
  "Multiple Integration ODE and Complex Variables": "211MAT1303",
  "Physics": "211PHY1201",
  "Chemistry": "211CHE1102",
  "Programming in C": "211CSE1401",
  "Basic Electrical Engineering": "211EEE1502",
  "Electronic Devices": "211ECE1603",
  "Engineering Mechanics": "211MEC1704",
  "Engineering Graphics": "211CIV1805"
};
const courseCodeToName = Object.fromEntries(Object.entries(courseNameToCode).map(([k, v]) => [v, k]));

function getCurrentQuestionBank(courseCode, level) {
  if (courseQuestionBanks[courseCode] && courseQuestionBanks[courseCode][level]) {
    return courseQuestionBanks[courseCode][level];
  }
  // fallback to normal if not found
  if (courseQuestionBanks[courseCode] && courseQuestionBanks[courseCode]['normal']) {
    return courseQuestionBanks[courseCode]['normal'];
  }
  return questionBank;
}

function autoGenerateQuestions(sessional, partBPattern, courseCode, level) {
  let cos = getCOsOptions(sessional);
  let questions = [];
  const qBank = getCurrentQuestionBank(courseCode, level);
  // Part A: 5 questions, 2 marks each, alternate COs, random pattern
  for (let i = 0; i < 5; i++) {
    let co = cos[i % cos.length];
    let qbank = qBank[co] || questionBank[co];
    let qtext = qbank[i % qbank.length];
    let pattern = patterns[i % patterns.length];
    questions.push({ q: qtext, p: pattern, m: co, marks: "2" });
  }
  // Part B: based on pattern
  let partBQs = [];
  if (partBPattern === "5x8") {
    for (let i = 0; i < 5; i++) {
      let co = cos[i % cos.length];
      let qbank = qBank[co] || questionBank[co];
      let qtext = qbank[(i + 5) % qbank.length];
      let pattern = patterns[(i + 2) % patterns.length];
      partBQs.push({ q: qtext, p: pattern, m: co, marks: "8" });
    }
  } else if (partBPattern === "3x8+1x16") {
    for (let i = 0; i < 3; i++) {
      let co = cos[i % cos.length];
      let qbank = qBank[co] || questionBank[co];
      let qtext = qbank[(i + 5) % qbank.length];
      let pattern = patterns[(i + 2) % patterns.length];
      partBQs.push({ q: qtext, p: pattern, m: co, marks: "8" });
    }
    let co = cos[3 % cos.length];
    let qbank = qBank[co] || questionBank[co];
    let qtext = qbank[4 % qbank.length];
    let pattern = patterns[3 % patterns.length];
    partBQs.push({ q: qtext, p: pattern, m: co, marks: "16" });
  } else if (partBPattern === "2x16+1x8") {
    for (let i = 0; i < 2; i++) {
      let co = cos[i % cos.length];
      let qbank = qBank[co] || questionBank[co];
      let qtext = qbank[(i + 3) % qbank.length];
      let pattern = patterns[(i + 1) % patterns.length];
      partBQs.push({ q: qtext, p: pattern, m: co, marks: "16" });
    }
    let co = cos[2 % cos.length];
    let qbank = qBank[co] || questionBank[co];
    let qtext = qbank[2 % qbank.length];
    let pattern = patterns[2 % patterns.length];
    partBQs.push({ q: qtext, p: pattern, m: co, marks: "8" });
  }
  questions = questions.concat(partBQs);
  return questions;
}

function renderPreview() {
  // Set color class based on level
  const level = document.getElementById("level") ? document.getElementById("level").value : "normal";
  let colorClass = "paper-preview-normal";
  if (level === "medium") colorClass = "paper-preview-medium";
  if (level === "high") colorClass = "paper-preview-high";
  // Divide questions into Part A (2 marks) and Part B (8/16 marks)
  let partA = window.questions ? window.questions.filter(q => q.marks === "2").slice(0, 5) : [];
  let partB = window.questions ? window.questions.filter(q => q.marks === "8" || q.marks === "16") : [];
  let html = `
    <div class="${colorClass}" style="padding:20px; border-radius:8px;">
    <h2>Generated Question Paper</h2>
    <h3>PART – A (5 x 2 = 10 Marks)</h3>
    <table>
      <tr>
        <th>Q.No</th>
        <th>Question</th>
        <th>Pattern</th>
        <th>Mapping COs</th>
        <th>Marks</th>
      </tr>
  `;
  partA.forEach((q, i) => {
    html += `<tr>
      <td>${i + 1}</td>
      <td>${q.q}</td>
      <td>${q.p}</td>
      <td>${q.m}</td>
      <td>${q.marks}</td>
    </tr>`;
  });
  html += `</table><h3>PART – B</h3><table><tr><th>Q.No</th><th>Question</th><th>Pattern</th><th>Mapping COs</th><th>Marks</th></tr>`;
  partB.forEach((q, i) => {
    html += `<tr>
      <td>${i + 1}</td>
      <td>${q.q}</td>
      <td>${q.p}</td>
      <td>${q.m}</td>
      <td>${q.marks}</td>
    </tr>`;
  });
  html += "</table></div>";
  document.getElementById("questionPaperPreview").innerHTML = html;
}

function updateCOsDropdown() {
  // This function is for future extensibility if you want to show COs elsewhere
}

function updateQuestionsOnCourseChange() {
  const sessional = document.getElementById("sessional").value;
  const partBPattern = document.getElementById("partBPattern").value;
  const courseCode = document.getElementById("courseCode").value;
  const level = document.getElementById("level").value;
  if (sessional && partBPattern && courseCode && level) {
    window.questions = autoGenerateQuestions(sessional, partBPattern, courseCode, level);
    renderPreview();
  }
}

// Download functionality (add session time, start/end time)
function downloadPaper() {
  const preview = document.getElementById("questionPaperPreview").innerHTML;
  // Get form values for header
  const courseCode = document.getElementById("courseCode").value;
  const courseName = document.getElementById("courseName").value;
  const degree = document.getElementById("degree").value;
  const sessional = document.getElementById("sessional").value;
  const semester = document.getElementById("semester").value;
  const sessionTime = document.getElementById("sessionTime").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const duration = document.getElementById("duration").value;
  const maxMarks = document.getElementById("maxMarks").value;
  const dateSession = document.getElementById("dateSession").value;
  const level = document.getElementById("level").value;

  // Header and details table (new layout to match sample image)
  const header = `
    <div class='section' style='padding-bottom:0;'>
      <div style='display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #222;padding:8px 0 8px 0;margin-bottom:6px;'>
        <img src='https://kalasalingam.ac.in/wp-content/uploads/2021/06/Kalasalingam-logo.png' style='width:70px;margin-left:8px;'>
        <div style='flex:1;text-align:center;'>
          <div style='font-weight:bold;font-size:1.25em;letter-spacing:1px;'>KALASALINGAM ACADEMY OF RESEARCH AND EDUCATION</div>
          <div style='font-weight:bold;font-size:1em;'>(DEEMED TO BE UNIVERSITY)</div>
          <div style='font-size:0.95em;'>Under sec. 3 of UGC Act 1956. Accredited by NAAC with "A+, +" Grade</div>
          <div style='font-size:0.95em;'>Anand Nagar, Krishnankoil, Srivilliputtur (Via), Virudhunagar (Dt) - 626126, Tamil Nadu | info@kalasalingam.ac.in | www.kalasalingam.ac.in</div>
          <div style='font-weight:bold;font-size:1em;margin-top:2px;'>OFFICE OF DEAN – FRESHMAN ENGINEERING</div>
        </div>
        <img src='https://kalasalingam.ac.in/wp-content/uploads/2021/06/Founder.png' style='width:70px;margin-right:8px;border-radius:50%;object-fit:cover;'>
      </div>
      <div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;'>
        <div style='font-weight:bold;font-size:1.1em;text-align:center;flex:1;'>
          SESSIONAL EXAMINATION - ${sessional ? sessional.toUpperCase() : ''} - ${dateSession ? (new Date(dateSession).toLocaleString('default', { month: 'long', year: 'numeric' })) : ''}
        </div>
        <div style='display:flex;align-items:center;gap:8px;'>
          <span style='font-weight:bold;font-size:1.1em;'>SET - 01</span>
        </div>
      </div>
      <div style='display:flex;justify-content:flex-end;margin-bottom:2px;'>
        <div style='display:flex;gap:2px;'>
          ${(Array(10).fill(0).map((_,i)=>`<div style='width:22px;height:22px;border:1px solid #222;display:inline-block;text-align:center;vertical-align:middle;line-height:22px;font-size:1em;box-sizing:border-box;'></div>`).join(''))}
        </div>
      </div>
      <div style='width:95%;margin:auto;'>
        <table style='width:100%;border-collapse:collapse;margin:0 0 4px 0;font-size:0.95em;box-sizing:border-box;'>
          <tr>
            <td style='border:1px solid #222;padding:3px 6px;width:33%;'><b>Course Code</b> : ${courseCode}</td>
            <td style='border:1px solid #222;padding:3px 6px;width:33%;'><b>Duration</b> : ${duration}</td>
            <td style='border:1px solid #222;padding:3px 6px;width:33%;'><b>Max. Marks</b> : ${maxMarks}</td>
          </tr>
          <tr>
            <td style='border:1px solid #222;padding:3px 6px;'><b>Course Name</b> : ${courseName}</td>
            <td style='border:1px solid #222;padding:3px 6px;'><b>Sessional</b> : ${sessional}</td>
            <td style='border:1px solid #222;padding:3px 6px;'><b>Date & Session</b> : ${dateSession} & ${sessionTime}</td>
          </tr>
          <tr>
            <td style='border:1px solid #222;padding:3px 6px;'><b>Degree/Year/Sem.</b> : ${degree}</td>
            <td style='border:1px solid #222;padding:3px 6px;'><b>Semester</b> : ${semester}</td>
            <td style='border:1px solid #222;padding:3px 6px;'><b>Start-End</b> : ${startTime} - ${endTime}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  // Extract Part A and Part B data from preview tables
  let partA = [], partB = [];
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = preview;
  const tables = tempDiv.querySelectorAll('table');
  if (tables.length > 0) {
    // Part A rows: skip header row
    Array.from(tables[0].querySelectorAll('tr')).slice(1).forEach(tr => {
      const tds = tr.querySelectorAll('td');
      if (tds.length === 5) partA.push([tds[0].innerText, tds[1].innerText, tds[2].innerText, tds[3].innerText, tds[4].innerText]);
    });
  }
  if (tables.length > 1) {
    // Part B rows: skip header row
    Array.from(tables[1].querySelectorAll('tr')).slice(1).forEach(tr => {
      const tds = tr.querySelectorAll('td');
      // Handle both single-row and a/b row formats
      if (tds.length === 6) {
        // a/b format: [Q.No, Choice, Question, Pattern, CO, Marks]
        partB.push([
          tds[0].textContent.trim(),
          tds[1].textContent.trim(),
          tds[2].textContent.trim(),
          tds[3].textContent.trim(),
          tds[4].textContent.trim(),
          tds[5].textContent.trim()
        ]);
      } else if (tds.length === 5) {
        // fallback: [Q.No, Question, Pattern, CO, Marks]
        partB.push([
          tds[0].textContent.trim(),
          '',
          tds[1].textContent.trim(),
          tds[2].textContent.trim(),
          tds[3].textContent.trim(),
          tds[4].textContent.trim()
        ]);
      }
    });
  }

  // Ensure both tables are present
  if (partA.length === 0) partA.push(["", "", "", "", ""]);
  if (partB.length === 0) partB.push(["", "", "", "", "", ""]);

  // Determine color class for level
  let color = '#e6ffe6';
  if (level === 'medium') color = '#fff9cc';
  if (level === 'high') color = '#ffe6f2';

  // Compose the whole paper with color background and A4 size, using .section for each part
  let paperDiv = `
    <div class='section' style='padding:10px 0 0 0;max-width:754px;min-height:800px;box-sizing:border-box;margin:auto;'>
      <div style='font-weight:bold;margin-bottom:2px;text-align:center;'>PART – A</div>
      <div style='margin-bottom:2px;text-align:center;'>Answer All Questions</div>
      <table style='width:95%;margin:auto;border-collapse:collapse;font-size:0.95em;'>
        <tr><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Q.No</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Question</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Pattern</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Mapping COs</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Marks</th></tr>`;
  partA.forEach(row => {
    paperDiv += `<tr>${row.map(cell => `<td style='border:1px solid #222;padding:4px 6px;'>${cell}</td>`).join('')}</tr>`;
  });
  paperDiv += `</table>
      <div style='font-weight:bold;margin:8px 0 2px 0;text-align:center;'>PART – B (Answer All Questions)</div>
      <table style='width:95%;margin:auto;border-collapse:collapse;font-size:0.95em;margin-bottom:0;'>
        <tr><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Q.No</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Question</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Pattern</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Mapping COs</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Marks</th></tr>`;
  partB.forEach(row => {
    paperDiv += `<tr><td style='border:1px solid #222;padding:4px 6px;'>${row[0]}</td><td style='border:1px solid #222;padding:4px 6px;'>${row[2]}</td><td style='border:1px solid #222;padding:4px 6px;'>${row[3]}</td><td style='border:1px solid #222;padding:4px 6px;'>${row[4]}</td><td style='border:1px solid #222;padding:4px 6px;'>${row[5]}</td></tr>`;
  });
  paperDiv += `</table>`;

  // Assessment Pattern as per Bloom's Taxonomy (generate from current COs)
  // Show only CO1/CO2 for Sessional I, CO3/CO4 for Sessional II
  const patternTypes = ["Remember", "Understand", "Apply", "Analyze"];
  let coTypes = [];
  if (sessional === 'I') coTypes = ["CO1", "CO2"];
  else if (sessional === 'II') coTypes = ["CO3", "CO4"];
  let patternTable = {};
  coTypes.forEach(co => { patternTable[co] = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Total: 0 }; });

  // Parse all table rows for CO and pattern
  const allRows = tempDiv.querySelectorAll('table tr');
  allRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 5) {
      // Q.No, Question, Pattern, CO, Marks
      const pattern = cells[2].innerText.trim();
      const co = cells[3].innerText.trim();
      const marks = parseInt(cells[4].innerText.trim()) || 0;
      if (patternTable[co] && patternTable[co][pattern] !== undefined) {
        patternTable[co][pattern] += marks;
        patternTable[co].Total += marks;
      }
    } else if (cells.length >= 6) {
      // Q.No, Choice, Question, Pattern, CO, Marks
      const pattern = cells[3].innerText.trim();
      const co = cells[4].innerText.trim();
      const marks = parseInt(cells[5].innerText.trim()) || 0;
      if (patternTable[co] && patternTable[co][pattern] !== undefined) {
        patternTable[co][pattern] += marks;
        patternTable[co].Total += marks;
      }
    }
  });

  // Build the assessment pattern table
  let assessmentTable = `<div class='section' style='margin-top:0;'><b>Assessment Pattern as per Bloom's Taxonomy:</b></div>`;
  assessmentTable += `<table style='width:100%;border-collapse:collapse;margin-top:0;font-size:0.95em;'>`;
  assessmentTable += `<tr><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>COs</th>`;
  patternTypes.forEach(p => { assessmentTable += `<th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>${p}</th>`; });
  assessmentTable += `<th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Total</th></tr>`;
  coTypes.forEach(co => {
    assessmentTable += `<tr><td style='border:1px solid #222;padding:4px 6px;'>${co}</td>`;
    patternTypes.forEach(p => { assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${patternTable[co][p]}</td>`; });
    assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${patternTable[co].Total}</td></tr>`;
  });
  // Add total row
  assessmentTable += `<tr><td style='border:1px solid #222;padding:4px 6px;'><b>Total</b></td>`;
  let totalPattern = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Total: 0 };
  coTypes.forEach(co => {
    patternTypes.forEach(p => { totalPattern[p] += patternTable[co][p]; });
    totalPattern.Total += patternTable[co].Total;
  });
  patternTypes.forEach(p => { assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${totalPattern[p]}</td>`; });
  assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${totalPattern.Total}</td></tr>`;
  assessmentTable += `</table>`;

  // Compose the final HTML with strict A4 size, single border, and background color for the whole sheet
  const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Sessional Question Paper</title>
  <style>
    @page { size: A4; margin: 0; }
    body { background: #fff; margin: 0; }
    .a4-sheet { width: 210mm; height: 297mm; margin: auto; background: ${color}; border: 2.5mm solid #222; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; overflow: hidden; min-height: 297mm; }
    .section {
      margin-bottom: 10px;
    }
  </style>
  </head><body style='font-family:Times New Roman,Times,serif;'><div class='a4-sheet'>${header}${paperDiv}${assessmentTable}<div style='width:100%;text-align:center;font-weight:bold;font-size:1.15em;margin-top:12px;letter-spacing:2px;'>*** ALL THE BEST ***</div></div></body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sessional-question-paper.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate paper (for now, just show preview)
if (window.location.pathname.endsWith("dashboard.html")) {
  // Auto-generate mock questions
  // questions = [
  //   { q: "Define Gradient", p: "Remember", m: "CO3", marks: "2" },
  //   { q: "Find the value of 'λ', if F = (z + y²)i + (−λy)j + (x + z)k is solenoidal.", p: "Understand", m: "CO3", marks: "2" },
  //   { q: "State Gauss divergence theorem.", p: "Remember", m: "CO3", marks: "2" },
  //   { q: "Check the analyticity of f(z) = z̄.", p: "Understand", m: "CO4", marks: "2" },
  //   { q: "Show that the function v(x, y) = tan⁻¹(y/x) is harmonic.", p: "Understand", m: "CO4", marks: "2" },
  //   { q: "Find the directional derivative of f(x, y, z) = xy³ + yz³ at the point (2, −1, 1) in the direction of i + 2j + 2k.", p: "Understand", m: "CO3", marks: "8" },
  //   { q: "Verify Stoke's Theorem for F = (x² − y²)i + 2xy j in the rectangular region in XOY plane bounded by x = 0, x = a, y = 0, y = b.", p: "Apply", m: "CO3", marks: "16" },
  //   { q: "Test the Analyticity of the function f(z) = sinz using C.R. equations.", p: "Analyze", m: "CO4", marks: "8" },
  //   { q: "Find the bilinear transformation that maps z = 1, i, −1 onto the point w = i, 0, −i.", p: "Apply", m: "CO4", marks: "8" }
  // ];
  // renderPreview();

  // Sidebar navigation highlight and collapsible logic
  document.querySelectorAll('.sidebar li').forEach(li => {
    li.onclick = function(e) {
      // Collapsible logic for Generate Paper
      if (this.id === 'nav-generate' && this.classList.contains('collapsible')) {
        e.stopPropagation();
        const submenu = this.querySelector('.submenu');
        const arrow = this.querySelector('.arrow');
        const isOpen = this.classList.contains('open');
        // Close all other collapsibles
        document.querySelectorAll('.collapsible').forEach(c => {
          c.classList.remove('open');
          const sm = c.querySelector('.submenu');
          if (sm) sm.style.display = 'none';
          const ar = c.querySelector('.arrow');
          if (ar) ar.style.transform = '';
        });
        if (!isOpen) {
          this.classList.add('open');
          if (submenu) submenu.style.display = '';
          if (arrow) arrow.style.transform = 'rotate(-180deg)';
        } else {
          this.classList.remove('open');
          if (submenu) submenu.style.display = 'none';
          if (arrow) arrow.style.transform = '';
        }
        // Hide all forms and show only title and submenu
        document.getElementById('paperTypeSwitcher').style.display = 'none';
        document.getElementById('karePaperSystemTitle').style.display = 'flex';
        document.getElementById('sessionalFormSection').style.display = 'none';
        document.getElementById('semesterFormSection').style.display = 'none';
        return;
      }
      document.querySelectorAll('.sidebar li').forEach(x => x.classList.remove('active'));
      this.classList.add('active');
      // Show paper type switcher and reset container if Generate Paper is clicked
      if (this.id === 'nav-generate') {
        document.getElementById('paperTypeSwitcher').style.display = '';
        document.getElementById('karePaperSystemTitle').style.display = 'flex';
        document.getElementById('sessionalFormSection').style.display = 'none';
        document.getElementById('semesterFormSection').style.display = 'none';
      }
      // Hide everything for other sections
      if (this.id !== 'nav-generate') {
        document.getElementById('paperTypeSwitcher').style.display = 'none';
        document.getElementById('karePaperSystemTitle').style.display = 'none';
        document.getElementById('sessionalFormSection').style.display = 'none';
        document.getElementById('semesterFormSection').style.display = 'none';
      }
    };
  });

  // Remove top-of-container Sessional/Semester buttons
  document.getElementById('paperTypeSwitcher').style.display = 'none';

  // Sidebar submenu radio logic
  document.getElementById('sidebar-sessional').onchange = function() {
    if (this.checked) {
      document.getElementById('karePaperSystemTitle').style.display = 'none';
      document.getElementById('sessionalFormSection').style.display = '';
      document.getElementById('semesterFormSection').style.display = 'none';
    }
  };
  document.getElementById('sidebar-semester').onchange = function() {
    if (this.checked) {
      document.getElementById('karePaperSystemTitle').style.display = 'none';
      document.getElementById('sessionalFormSection').style.display = 'none';
      document.getElementById('semesterFormSection').style.display = '';
    }
  };

  // Synchronize course code and name
  document.getElementById("courseCode").onchange = function() {
    const code = this.value;
    if (courseCodeToName[code]) {
      document.getElementById("courseName").value = courseCodeToName[code];
    }
    updateQuestionsOnCourseChange();
  };
  document.getElementById("courseName").onchange = function() {
    const name = this.value;
    if (courseNameToCode[name]) {
      document.getElementById("courseCode").value = courseNameToCode[name];
    }
    updateQuestionsOnCourseChange();
  };
  document.getElementById("sessional").onchange = updateQuestionsOnCourseChange;
  document.getElementById("partBPattern").onchange = updateQuestionsOnCourseChange;
  document.getElementById("level").onchange = updateQuestionsOnCourseChange;

  document.getElementById("paperForm").onsubmit = function (e) {
    e.preventDefault();
    try {
      updateQuestionsOnCourseChange();
      document.getElementById('questionPaperPreview').style.display = 'block';
      alert("Question paper generated! (See preview below)");
      console.log("Sessional question paper generated and preview shown.");
    } catch (err) {
      alert("Error generating question paper: " + err.message);
      console.error("Error in sessional paper generation:", err);
    }
  };
  document.getElementById("downloadBtn").onclick = downloadPaper;
}

// --- SEMESTER FORM LOGIC ---
function generateSemesterPartA(courseCode, level, sessional) {
  // Use CO1/CO2 for Part A (5 each, alternate)
  const cos = ["CO1", "CO2"];
  const qBank = getCurrentQuestionBank(courseCode, level);
  let questions = [];
  for (let i = 0; i < 10; i++) {
    let co = cos[i % 2];
    let qbank = qBank[co] || questionBank[co];
    let qtext = qbank[i % qbank.length];
    let pattern = patterns[i % patterns.length];
    questions.push({ q: qtext, p: pattern, m: co, marks: "2" });
  }
  return questions;
}

function renderSemesterPartA(questions) {
  let html = `<table><tr><th>Q.No</th><th>Question</th><th>Pattern</th><th>Mapping COs</th><th>Marks</th></tr>`;
  questions.forEach((q, i) => {
    html += `<tr><td>${i + 1}</td><td>${q.q}</td><td>${q.p}</td><td>${q.m}</td><td>${q.marks}</td></tr>`;
  });
  html += `</table>`;
  document.getElementById("semesterPartA").innerHTML = html;
}

function renderSemesterPartB(partAcount) {
  // 5 questions, each with a/b choice, user selects marks/pattern
  let html = '';
  for (let i = 0; i < 5; i++) {
    html += `<div style='margin-bottom:10px;'>
      <b>Q${partAcount + i + 1}.</b> <span style='margin-right:10px;'>
      <b>a)</b> <span class='sem-b-a'></span> <b>or</b> <b>b)</b> <span class='sem-b-b'></span></span>
      <select class='sem-b-marks' data-q='${i}'><option value='16'>16</option><option value='8'>8</option><option value='4'>4</option></select>
      <select class='sem-b-pattern' data-q='${i}'>
        <option value='Remember'>Remember</option>
        <option value='Understand'>Understand</option>
        <option value='Apply'>Apply</option>
        <option value='Analyze'>Analyze</option>
      </select>
    </div>`;
  }
  document.getElementById("semesterPartB").innerHTML = html;
}

function generateSemesterPartBQuestions(courseCode, level) {
  // For each Q, generate a and b (CO3/CO4, alternate)
  const cos = ["CO3", "CO4"];
  const qBank = getCurrentQuestionBank(courseCode, level);
  let questions = [];
  for (let i = 0; i < 5; i++) {
    let a_co = cos[i % 2];
    let b_co = cos[(i + 1) % 2];
    let a_qbank = qBank[a_co] || questionBank[a_co];
    let b_qbank = qBank[b_co] || questionBank[b_co];
    let a_q = a_qbank[(i * 2) % a_qbank.length];
    let b_q = b_qbank[(i * 2 + 1) % b_qbank.length];
    questions.push({ a: { q: a_q, m: a_co }, b: { q: b_q, m: b_co } });
  }
  return questions;
}

function fillSemesterPartBQuestions(questions) {
  // Fill .sem-b-a and .sem-b-b spans
  document.querySelectorAll('.sem-b-a').forEach((el, i) => {
    el.textContent = questions[i].a.q + ' (' + questions[i].a.m + ')';
  });
  document.querySelectorAll('.sem-b-b').forEach((el, i) => {
    el.textContent = questions[i].b.q + ' (' + questions[i].b.m + ')';
  });
}

function renderSemesterPreview(partA, partB, bMarks, bPatterns) {
  let html = `<div class="paper-preview-normal" style="padding:20px; border-radius:8px;">
    <h2>Generated Question Paper</h2>
    <h3>PART – A (10 x 2 = 20 Marks)</h3>
    <table style='width:95%;margin:auto;border-collapse:collapse;font-size:0.95em;'>
      <tr><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Q.No</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Question</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Pattern</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Mapping COs</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Marks</th></tr>`;
  partA.forEach((q, i) => {
    html += `<tr><td style='border:1px solid #222;padding:4px 6px;'>${i + 1}</td><td style='border:1px solid #222;padding:4px 6px;'>${q.q}</td><td style='border:1px solid #222;padding:4px 6px;'>${q.p}</td><td style='border:1px solid #222;padding:4px 6px;'>${q.m}</td><td style='border:1px solid #222;padding:4px 6px;'>${q.marks}</td></tr>`;
  });
  html += `</table><h3>PART – B (Choice Questions)</h3>`;
  // Always render the Part B table structure with full styling
  html += `<table style='width:95%;margin:auto;border-collapse:collapse;font-size:0.95em;'>
    <tr><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Q.No</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Question</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Pattern</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Mapping COs</th><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Marks</th></tr>`;
  let qNum = 11;
  if (partB.length === 0) {
    html += `<tr><td style='border:1px solid #222;padding:4px 6px;'>11a</td><td style='border:1px solid #222;padding:4px 6px;'></td><td style='border:1px solid #222;padding:4px 6px;'></td><td style='border:1px solid #222;padding:4px 6px;'></td><td style='border:1px solid #222;padding:4px 6px;'></td></tr>`;
    html += `<tr><td colspan='5' style='border:1px solid #222;padding:4px 6px;text-align:center;font-weight:bold;'>[OR]</td></tr>`;
    html += `<tr><td style='border:1px solid #222;padding:4px 6px;'>11b</td><td style='border:1px solid #222;padding:4px 6px;'></td><td style='border:1px solid #222;padding:4px 6px;'></td><td style='border:1px solid #222;padding:4px 6px;'></td><td style='border:1px solid #222;padding:4px 6px;'></td></tr>`;
  } else {
    partB.forEach((q, i) => {
      const mark = bMarks[i];
      const pattern = bPatterns[i];
      let aMark = '-';
      let bMark = '-';
      if (mark === '8') { aMark = '8'; bMark = '8'; }
      else if (mark === '16') { aMark = '16'; bMark = '16'; }
      else if (mark === '4') { aMark = '4'; bMark = '4'; }
      html += `<tr><td style='border:1px solid #222;padding:4px 6px;'>${qNum}a</td><td style='border:1px solid #222;padding:4px 6px;'>${q.a.q}</td><td style='border:1px solid #222;padding:4px 6px;'>${pattern}</td><td style='border:1px solid #222;padding:4px 6px;'>${q.a.m}</td><td style='border:1px solid #222;padding:4px 6px;'>${aMark}</td></tr>`;
      html += `<tr><td colspan='5' style='border:1px solid #222;padding:4px 6px;text-align:center;font-weight:bold;'>[OR]</td></tr>`;
      html += `<tr><td style='border:1px solid #222;padding:4px 6px;'>${qNum}b</td><td style='border:1px solid #222;padding:4px 6px;'>${q.b.q}</td><td style='border:1px solid #222;padding:4px 6px;'>${pattern}</td><td style='border:1px solid #222;padding:4px 6px;'>${q.b.m}</td><td style='border:1px solid #222;padding:4px 6px;'>${bMark}</td></tr>`;
      qNum++;
    });
  }
  html += `</table>`;

  // Assessment Pattern as per Bloom's Taxonomy (always visible, styled)
  const patternTypes = ["Remember", "Understand", "Apply", "Analyze"];
  let coTypes = ["CO1", "CO2", "CO3", "CO4"];
  let patternTable = {};
  coTypes.forEach(co => { patternTable[co] = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Total: 0 }; });

  // FIX: Create a temporary div to parse the HTML
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const allRows = tempDiv.querySelectorAll('table tr');
  allRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 5) {
      const pattern = cells[2].innerText.trim();
      const co = cells[3].innerText.trim();
      const marks = parseInt(cells[4].innerText.trim()) || 0;
      if (patternTable[co] && patternTable[co][pattern] !== undefined) {
        patternTable[co][pattern] += marks;
        patternTable[co].Total += marks;
      }
    }
  });
  let assessmentTable = `<div class='section' style='margin-top:0;'><b>Assessment Pattern as per Bloom's Taxonomy:</b></div>`;
  assessmentTable += `<table style='width:100%;border-collapse:collapse;margin-top:0;font-size:0.95em;'>`;
  assessmentTable += `<tr><th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>COs</th>`;
  patternTypes.forEach(p => { assessmentTable += `<th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>${p}</th>`; });
  assessmentTable += `<th style='border:1px solid #222;padding:4px 6px;background:#e3e3e3;'>Total</th></tr>`;
  coTypes.forEach(co => {
    assessmentTable += `<tr><td style='border:1px solid #222;padding:4px 6px;'>${co}</td>`;
    patternTypes.forEach(p => { assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${patternTable[co][p]}</td>`; });
    assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${patternTable[co].Total}</td></tr>`;
  });
  assessmentTable += `<tr><td style='border:1px solid #222;padding:4px 6px;'><b>Total</b></td>`;
  let totalPattern = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Total: 0 };
  coTypes.forEach(co => {
    patternTypes.forEach(p => { totalPattern[p] += patternTable[co][p]; });
    totalPattern.Total += patternTable[co].Total;
  });
  patternTypes.forEach(p => { assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${totalPattern[p]}</td>`; });
  assessmentTable += `<td style='border:1px solid #222;padding:4px 6px;'>${totalPattern.Total}</td></tr>`;
  assessmentTable += `</table>`;

  html += assessmentTable;
  document.getElementById('semesterQuestionPaperPreview').innerHTML = html;
}

function semesterSyncCourseCodeName() {
  document.getElementById("semCourseCode").onchange = function() {
    const code = this.value;
    if (courseCodeToName[code]) {
      document.getElementById("semCourseName").value = courseCodeToName[code];
    }
    semesterAutoGenerate();
  };
  document.getElementById("semCourseName").onchange = function() {
    const name = this.value;
    if (courseNameToCode[name]) {
      document.getElementById("semCourseCode").value = courseNameToCode[name];
    }
    semesterAutoGenerate();
  };
}

function semesterAutoGenerate() {
  const courseCode = document.getElementById('semCourseCode').value;
  const level = document.getElementById('semLevel').value;
  if (!courseCode || !level) return;
  const partA = generateSemesterPartA(courseCode, level, document.getElementById('sidebar-sessional').checked ? 'I' : 'II');
  renderSemesterPartA(partA);
  const partB = generateSemesterPartBQuestions(courseCode, level);
  renderSemesterPartB(partA.length);
  fillSemesterPartBQuestions(partB);
  // Save for preview
  window.semesterPartA = partA;
  window.semesterPartB = partB;
}

// Ensure event handlers are attached after DOM is loaded
if (window.location.pathname.endsWith("dashboard.html")) {
  document.addEventListener('DOMContentLoaded', function() {
    // Semester form logic
    semesterSyncCourseCodeName();
    document.getElementById('semLevel').onchange = semesterAutoGenerate;
    document.getElementById('semCourseCode').onchange = semesterAutoGenerate;
    document.getElementById('semCourseName').onchange = semesterAutoGenerate;
    document.getElementById('semSemester').onchange = semesterAutoGenerate;
    document.getElementById('semSessionTime').onchange = semesterAutoGenerate;
    document.getElementById('semStartTime').onchange = semesterAutoGenerate;
    document.getElementById('semEndTime').onchange = semesterAutoGenerate;
    document.getElementById('semDateSession').onchange = semesterAutoGenerate;
    document.getElementById('semDegree').onchange = semesterAutoGenerate;
    document.getElementById('semLevel').onchange = semesterAutoGenerate;
    // Initial auto-generate if fields are prefilled
    semesterAutoGenerate();
    document.getElementById('semesterPaperForm').onsubmit = function(e) {
      e.preventDefault();
      try {
        // Get selected patterns and marks for Part B
        const bMarks = Array.from(document.querySelectorAll('.sem-b-marks')).map(sel => sel.value);
        const bPatterns = Array.from(document.querySelectorAll('.sem-b-pattern')).map(sel => sel.value);
        renderSemesterPreview(window.semesterPartA, window.semesterPartB, bMarks, bPatterns);
        document.getElementById('semesterQuestionPaperPreview').style.display = 'block';
        alert('Question paper generated! (See preview below)');
        console.log('Semester question paper generated and preview shown.');
      } catch (err) {
        alert('Error generating semester question paper: ' + err.message);
        console.error('Error in semester paper generation:', err);
      }
    };
    const semesterDownloadBtn = document.getElementById('semesterDownloadBtn');
    if (semesterDownloadBtn) {
      semesterDownloadBtn.onclick = downloadSemesterPaper;
    }
  });
}

// Add semester download functionality
function downloadSemesterPaper() {
  // Remove 'Generated Question Paper' heading from preview
  let preview = document.getElementById("semesterQuestionPaperPreview").innerHTML;
  preview = preview.replace(/<h2[^>]*>\s*Generated Question Paper\s*<\/h2>/i, '');

  // Extract Part A section
  let partASection = '';
  let partBSection = '';
  let assessmentSection = '';
  const partARegex = /(<h3[^>]*>\s*PART[\s–-]*A[^<]*<\/h3>\s*<table[\s\S]*?<\/table>)/i;
  const partBRegex = /(<h3[^>]*>\s*PART[\s–-]*B[^<]*<\/h3>[\s\S]*?<\/table>)/i;
  const assessmentRegex = /(<div[^>]*>\s*Assessment Pattern as per Bloom's Taxonomy:[\s\S]*)$/i;
  const partAMatch = preview.match(partARegex);
  const partBMatch = preview.match(partBRegex);
  const assessmentMatch = preview.match(assessmentRegex);
  if (partAMatch) partASection = partAMatch[1];
  if (partBMatch) partBSection = partBMatch[1];
  if (assessmentMatch) assessmentSection = assessmentMatch[1];

  // Remove Part A, Part B, and assessment from preview
  preview = preview.replace(partARegex, '');
  preview = preview.replace(partBRegex, '');
  preview = preview.replace(assessmentRegex, '');

  // Center Part A vertically between header and rest of content
  const partAHTML = `<div class='part-a-vertical-center'>${partASection}</div>`;

  // Center Part B heading and table
  let partBHTML = '';
  if (partBSection) {
    partBHTML = partBSection.replace(/<h3[^>]*>\s*PART[\s–-]*B[^<]*<\/h3>\s*<table[^>]*>/i, "<h3 style='text-align:center;'>PART – B (Choice Questions)</h3><table style='margin:auto;display:block;'>");
  }

  // Compose the header to span the full width and REMOVE the tables/charts line and number boxes
  const courseCode = document.getElementById("semCourseCode").value;
  const courseName = document.getElementById("semCourseName").value;
  const degree = document.getElementById("semDegree").value;
  const semester = document.getElementById("semSemester").value;
  const sessionTime = document.getElementById("semSessionTime").value;
  const startTime = document.getElementById("semStartTime").value;
  const endTime = document.getElementById("semEndTime").value;
  const dateSession = document.getElementById("semDateSession").value;
  const level = document.getElementById("semLevel").value;
  // Fixed values for semester exam
  const maxMarks = '100';
  const duration = '150 Minutes';
  const examTitle = 'END SEMESTER EXAMINATIONS, NOV/DEC 2024';

  const header = `
    <div style=\"border:2px solid #222;padding:8px 12px 18px 12px;margin-bottom:18px;width:100%;box-sizing:border-box;\">
      <div style=\"font-size:1.3em;font-weight:bold;text-align:center;width:100%;\">KALASALINGAM ACADEMY OF RESEARCH AND EDUCATION</div>
      <div style=\"text-align:center;font-size:1em;font-style:italic;margin-top:2px;\">(DEEMED TO BE UNIVERSITY)</div>
      <div style=\"text-align:center;font-size:1em;font-weight:bold;margin-bottom:2px;\">OFFICE OF DEAN – FRESHMAN ENGINEERING</div>
      <div style=\"text-align:center;font-size:1em;\">Anand Nagar, Krishnankoil - 626 126.</div>
      <div style=\"text-align:center;font-size:1.1em;font-weight:bold;margin:6px 0 2px 0;\">${examTitle}</div>
      <div style=\"text-align:center;font-size:1.1em;font-weight:bold;\">${courseCode ? courseCode + ' - ' : ''}${courseName}</div>
      <div style=\"display:flex;justify-content:space-between;font-size:1em;margin:4px 0;\">
        <div>Time: ${duration}</div>
        <div>Degree: ${degree}</div>
        <div>Maximum: ${maxMarks} Marks</div>
      </div>
      <div style=\"text-align:center;font-size:1em;font-weight:bold;\">(Answer ALL Questions of PART A and PART B)</div>
    </div>
  `;

  // Compose the final HTML for download with A4 sheet and border, allowing multi-page content and balanced padding
  const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Semester Question Paper</title>
  <style>
    @page { size: A4; margin: 0; }
    body { background: #fff; margin: 0; }
    .a4-sheet {
      width: 210mm;
      min-height: 297mm;
      margin: auto;
      background: #fff;
      border: 2.5mm solid #222;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: 18px 18px 24px 18px;
      /* Remove fixed height to allow content to expand */
    }
    .a4-sheet * {
      box-sizing: border-box;
    }
    .part-a-vertical-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 0;
    }
    table, .section {
      page-break-inside: avoid;
    }
    .a4-sheet {
      page-break-after: always;
    }
    .a4-sheet {
      overflow: visible;
    }
    h3, .section, table {
      margin-left: auto !important;
      margin-right: auto !important;
    }
  </style>
  </head><body><div class='a4-sheet'>${header}${partAHTML}${partBHTML}${assessmentSection}${preview}</div></body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Semester_Question_Paper.html';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

// --- UPLOAD OLD PAPERS LOGIC ---
document.addEventListener('DOMContentLoaded', function() {
  const uploadSection = document.getElementById('uploadOldPapersSection');
  const uploadNav = document.getElementById('nav-upload');
  const uploadBtns = Array.from({length: 10}, (_, i) => document.getElementById('uploadBtn' + (i+1)));
  const hiddenFileInput = document.getElementById('hiddenFileInput');
  const uploadedFilesList = document.getElementById('uploadedFilesList');
  const generateFromUploadsBtn = document.getElementById('generateFromUploadsBtn');
  let currentUploadIndex = null;
  let uploadedFiles = Array(10).fill(null);

  // Show upload section when nav is clicked
  if (uploadNav) {
    uploadNav.addEventListener('click', function() {
      document.getElementById('sessionalFormSection').style.display = 'none';
      document.getElementById('semesterFormSection').style.display = 'none';
      uploadSection.style.display = 'block';
      // Optionally hide other sections
    });
  }

  // Handle upload button clicks
  uploadBtns.forEach((btn, idx) => {
    btn.addEventListener('click', function() {
      currentUploadIndex = idx;
      hiddenFileInput.value = '';
      hiddenFileInput.click();
    });
  });

  // Handle file selection
  hiddenFileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      uploadedFiles[currentUploadIndex] = file;
      uploadBtns[currentUploadIndex].textContent = 'Uploaded: ' + file.name;
      updateUploadedFilesList();
      // Show generate button if at least one file is uploaded
      if (uploadedFiles.some(f => f)) {
        generateFromUploadsBtn.style.display = 'inline-block';
      }
    }
  });

  function updateUploadedFilesList() {
    uploadedFilesList.innerHTML = uploadedFiles
      .map((f, i) => f ? `<div>Paper ${i+1}: ${f.name}</div>` : '')
      .filter(Boolean)
      .join('');
  }

  // Add generate paper logic
  generateFromUploadsBtn.addEventListener('click', async function() {
    // For demo: just list the uploaded file names and generate a mock paper
    let uploaded = uploadedFiles.filter(f => f);
    if (uploaded.length === 0) return;
    let questions = [];
    // Try to extract text from uploaded files (if text/plain or .txt)
    for (let i = 0; i < uploaded.length; i++) {
      const file = uploaded[i];
      if (file && file.type === 'text/plain') {
        const text = await file.text();
        // For demo, split lines and use as questions
        const lines = text.split(/\r?\n/).filter(Boolean);
        questions.push(...lines.slice(0, 5));
      } else if (file) {
        questions.push(`(Uploaded: ${file.name})`);
      }
    }
    // Fallback if no text extracted
    if (questions.length === 0) {
      questions = [
        'What is AI?',
        'Explain the importance of old question papers.',
        'Describe a method to generate new questions.',
        'How does file upload work in web apps?',
        'What is the benefit of using previous papers for practice?'
      ];
    }
    // Generate a sessional-style preview
    let html = `<div class='paper-preview-normal' style='padding:20px; border-radius:8px;'>`;
    html += `<h2>Generated Question Paper (from Uploaded Papers)</h2>`;
    html += `<h3 style='text-align:center;'>PART – A (5 x 2 = 10 Marks)</h3>`;
    html += `<table style='width:95%;margin:auto;border-collapse:collapse;font-size:0.95em;'>`;
    html += `<tr><th>Q.No</th><th>Question</th><th>Marks</th></tr>`;
    for (let i = 0; i < 5; i++) {
      html += `<tr><td>${i+1}</td><td>${questions[i] || ''}</td><td>2</td></tr>`;
    }
    html += `</table>`;
    html += `<h3 style='text-align:center;'>PART – B (Choice Questions)</h3>`;
    html += `<table style='width:95%;margin:auto;border-collapse:collapse;font-size:0.95em;'>`;
    html += `<tr><th>Q.No</th><th>Question</th><th>Marks</th></tr>`;
    for (let i = 5; i < 10; i++) {
      html += `<tr><td>${i-4}</td><td>${questions[i] || '(AI-generated question)'}</td><td>8</td></tr>`;
    }
    html += `</table>`;
    html += `</div>`;
    // Add download button
    html += `<button id='downloadGeneratedFromUploadsBtn' style='margin-top:18px;'>Download Paper</button>`;
    document.getElementById('generatedFromUploadsPreview').innerHTML = html;
    // Download logic
    setTimeout(() => {
      const dlBtn = document.getElementById('downloadGeneratedFromUploadsBtn');
      if (dlBtn) {
        dlBtn.onclick = function() {
          const content = document.getElementById('generatedFromUploadsPreview').innerHTML;
          const blob = new Blob([content], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Generated_Question_Paper.html';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 0);
        };
      }
    }, 100);
  });
});