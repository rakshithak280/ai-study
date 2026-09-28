import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI();
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with environment key:', err);
  }
}

// 1. AI Engineering Mentor API
app.post('/api/mentor', async (req, res) => {
  const { userBranch, targetSubject, message, conversationHistory } = req.body;

  const systemInstruction = `You are OmniEngineer Mentor, an elite polymath engineering educator specializing in cross-disciplinary translation.
Your mission is to help engineering students from ANY branch (Mechanical, Electrical, Computer Science, Civil, Chemical, Aerospace, Biomedical, etc.) master any subject, tool, or technology.
When answering:
1. Always ground explanations in intuitive mental models, first principles, and practical analogies relevant to the student's background (${userBranch || 'general engineering'}).
2. For mathematical equations, explain what each variable physically represents in real-world systems.
3. Provide practical, hands-on takeaways (e.g., runnable code snippets, real hardware components, or design heuristics).
4. Tone: Encouraging, precise, intellectually stimulating, rigorous yet approachable. Avoid patronizing fluff.
5. Format with clear Markdown headings, bullet points, and code/math blocks.`;

  if (!ai || !apiKey) {
    // Intelligent heuristic response
    return res.json({
      text: getCuratedMentorResponse(userBranch, targetSubject, message),
      source: 'curated'
    });
  }

  try {
    const prompt = `Student Background: ${userBranch || 'Undecided'}\nTarget Domain: ${targetSubject || 'Engineering Topic'}\n\nStudent Question:\n${message}`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction
      }
    });

    const reply = response.text || 'I could not generate a response. Please try rephrasing your question.';
    return res.json({ text: reply, source: 'ai' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.json({
      text: getCuratedMentorResponse(userBranch, targetSubject, message),
      source: 'fallback'
    });
  }
});

// 2. Cross-Branch Analogy Generator
app.post('/api/analogy-engine', async (req, res) => {
  const { nativeBranch, targetConcept } = req.body;

  if (!ai || !apiKey) {
    return res.json({
      concept: targetConcept,
      nativeBranch: nativeBranch,
      analogy: getCuratedAnalogy(nativeBranch, targetConcept)
    });
  }

  try {
    const prompt = `The student is an undergraduate in ${nativeBranch || 'Engineering'}.
They want to learn: "${targetConcept}".
Provide a brilliant, technically accurate cross-branch translation containing:
1. "The Core Intuition": Explain ${targetConcept} purely through the lens of ${nativeBranch} concepts and terminology.
2. "The Mapping Table": 3-4 direct physical/mathematical equivalents (e.g. In ${nativeBranch} vs In Target Topic).
3. "The Governing Equation": Compare the governing equation of ${targetConcept} to a familiar ${nativeBranch} equation.
4. "The Common Pitfall": What do ${nativeBranch} students usually get wrong when learning this?
5. "First Practical Step": A concrete 10-minute lab or code experiment.
Keep it concise, punchy, and crystal-clear.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.3
      }
    });

    return res.json({
      concept: targetConcept,
      nativeBranch: nativeBranch,
      analogy: response.text,
      source: 'ai'
    });
  } catch (err) {
    return res.json({
      concept: targetConcept,
      nativeBranch: nativeBranch,
      analogy: getCuratedAnalogy(nativeBranch, targetConcept),
      source: 'fallback'
    });
  }
});

// 3. Personalized Cross-Branch Roadmap Generator
app.post('/api/generate-roadmap', async (req, res) => {
  const { nativeBranch, targetGoal, weeksAvailable } = req.body;

  if (!ai || !apiKey) {
    return res.json({
      roadmap: getCuratedRoadmap(nativeBranch, targetGoal),
      source: 'curated'
    });
  }

  try {
    const prompt = `Create a structured ${weeksAvailable || 6}-week accelerated learning roadmap for a student majoring in "${nativeBranch}" who wants to achieve mastery in "${targetGoal}".
Structure each week with:
- Week Number & Theme
- Branch Bridge (how their existing skills transfer)
- Key Topics & Mental Models
- Hands-on Capstone Lab/Mini-project
- Deliverable / Self-test Metric
Keep formatting clean Markdown with checklists.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    return res.json({
      roadmap: response.text,
      source: 'ai'
    });
  } catch (err) {
    return res.json({
      roadmap: getCuratedRoadmap(nativeBranch, targetGoal),
      source: 'fallback'
    });
  }
});

// Curated fallback utilities
function getCuratedMentorResponse(branch: string, subject: string, query: string): string {
  return `### Engineering Insight: Connecting ${branch || 'Your Background'} to ${subject || 'This Concept'}

When approaching **${subject || 'this engineering domain'}** from **${branch || 'your branch'}**, the key is recognizing that all physical laws share identical mathematical structures.

#### 1. The Fundamental Bridge
In engineering, whether analyzing electrical circuits, fluid networks, structural trusses, or thermal systems:
- **Potential Difference / Effort**: Voltage ($V$), Pressure ($P$), Force ($F$), Temperature ($\Delta T$), Concentration gradient ($\Delta C$).
- **Flow / Rate of Change**: Electric Current ($I$), Volumetric Flow ($Q$), Velocity ($v$), Heat Flow ($\dot{Q}$).
- **Resistance / Dissipation**: Electrical Resistance ($R$), Hydraulic drag ($R_h$), Mechanical Damping ($c$), Thermal Resistance ($R_{th}$).
- **Energy Storage**: Capacitance/Inductance ($C, L$), Fluid accumulation, Spring elasticity ($k$), Thermal Mass ($m C_p$).

#### 2. Practical Takeaway for Your Question
"${query}"

To tackle this effectively:
1. **Identify the Invariants**: Determine what is conserved in this system (Mass, Momentum, Energy, Charge).
2. **Formulate the Governing Differential Equation**: Almost all systems resolve into 1st-order (exponential decay/charging) or 2nd-order (oscillation/resonance) dynamics.
3. **Run a Verification Model**: Build a 20-line numerical simulation script (Python/NumPy or differential solver) before moving to physical hardware or production code.

*You can test this right now in our interactive PID Simulator or RLC / Beam Sandboxes!*`;
}

function getCuratedAnalogy(branch: string, concept: string): string {
  return `### Translating ${concept} to ${branch || 'Everyday Engineering'}

#### 1. The Core Intuition
Think of **${concept}** as analogous to systems you already design every day in ${branch}:
- **The Effort & Flow Equivalence**: Just as potential causes flow across resistance, information or energy in this system balances across interconnected nodes.
- **Dynamic Equilibrium**: The system settles into minimum potential energy or maximum stability, exactly like a structural truss under load or fluid reaching hydrostatic equilibrium.

#### 2. Equivalence Mapping
| Concept in ${concept} | Equivalent in ${branch || 'Core Physics'} | Physical Interpretation |
| :--- | :--- | :--- |
| **State / Memory** | Capacitance / Elastic Strain | Ability to store work done over time |
| **Feedback Loop** | Damping / Centrifugal Governor | Stabilizing opposing force against perturbation |
| **Throughput / Bandwidth** | Pipe Flow Area / Resonance Q-Factor | Maximum information or flux capacity |
| **Noise / Loss** | Viscous Friction / Heat Dissipation | Entropy generated during transmission |

#### 3. Recommended First Experiment
Open the interactive simulation tab in OmniEngineer, set the damping parameter to 0.707 (critically damped Butterworth response), and observe how the step response reaches steady state without destructive overshoot.`;
}

function getCuratedRoadmap(branch: string, goal: string): string {
  return `### Accelerated 6-Week Cross-Branch Roadmap
**Starting Point:** ${branch || 'General Engineering'}  
**Target Mastery:** ${goal || 'Embedded Robotics & Control'}

- **Week 1: Fundamentals & Mental Models**
  - Translate foundational jargon into your native branch concepts.
  - Review governing linear algebra and differential equations.
  - Lab: Set up local toolchain and build a "Hello World" simulation.
- **Week 2: Component Architecture & Data Flow**
  - Master the primary hardware/software blocks and communication interfaces.
  - Understand sensor/actuator timing and bandwidth constraints.
  - Lab: Interface a virtual sensor and plot step responses.
- **Week 3: Closed-Loop Dynamics & Control**
  - Implement negative feedback loops and state estimation (Kalman filter / PID).
  - Analyze stability margins (Gain & Phase margins, Bode plots).
  - Lab: Tune a simulated dynamical plant to reject external disturbances.
- **Week 4: Real-World Interfacing & Edge Cases**
  - Handle noise, saturation, ADC quantization, and mechanical thermal limits.
  - Lab: Build an end-to-end telemetry pipeline streaming real-time status.
- **Week 5: System Integration & Optimization**
  - Optimize memory, computational latency, and power consumption.
  - Lab: Cross-compile code and deploy to microcontroller or hardware target.
- **Week 6: Multidisciplinary Capstone**
  - Complete a fully documented portfolio project with CAD schematics and firmware.
  - Publish documentation and interactive demonstration.`;
}

// Dev vs Production server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`OmniEngineer platform running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
